import { StudentSession, AnswerLog, SyncEvent, SyncStatus } from '../types';
import { generateUUID } from './scoring';

export const SESSION_STORAGE_KEY = 'pythonQuestActiveSession';
export const PENDING_SYNC_KEY = 'pythonQuestPendingSync';

// 1. Local active session management
export function saveActiveSessionLocal(session: StudentSession): void {
  try {
    const updated = {
      ...session,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Không thể lưu session vào localStorage:', e);
  }
}

export function loadActiveSessionLocal(): StudentSession | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as StudentSession;
    if (session && session.sessionId && session.studentName) {
      return session;
    }
    return null;
  } catch (e) {
    console.warn('Lỗi đọc session từ localStorage:', e);
    return null;
  }
}

export function clearActiveSessionLocal(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.warn('Lỗi xóa active session:', e);
  }
}

// 2. Pending sync queue management (Offline resilience)
export function getPendingSyncEvents(): SyncEvent[] {
  try {
    const raw = localStorage.getItem(PENDING_SYNC_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SyncEvent[];
  } catch {
    return [];
  }
}

export function queueSyncEvent(event: SyncEvent): void {
  try {
    const events = getPendingSyncEvents();
    // Check if eventId already exists in queue
    if (!events.some((e) => e.eventId === event.eventId)) {
      events.push(event);
      localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(events));
    }
  } catch (e) {
    console.warn('Không thể thêm event vào hàng đợi đồng bộ:', e);
  }
}

export function removePendingSyncEvents(eventIds: string[]): void {
  try {
    const events = getPendingSyncEvents();
    const filtered = events.filter((e) => !eventIds.includes(e.eventId));
    localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn('Không thể dọn dẹp hàng đợi đồng bộ:', e);
  }
}

// 3. Server communication with deduplication & batching
export async function sendPayloadToServer(
  action: 'saveGame' | 'finalizeSession' | 'sync_pyquest_data',
  eventId: string,
  session: StudentSession,
  answers: AnswerLog[] = []
): Promise<boolean> {
  try {
    const response = await fetch('/api/sync-game-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        eventId,
        sessionId: session.sessionId,
        session,
        answers,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!data.success;
  } catch (err) {
    return false;
  }
}

// 4. Flush all pending offline sync events
export async function flushPendingSyncQueue(): Promise<{ synced: number; remaining: number }> {
  const pending = getPendingSyncEvents();
  if (pending.length === 0) return { synced: 0, remaining: 0 };

  const successIds: string[] = [];

  for (const item of pending) {
    const ok = await sendPayloadToServer(
      item.action,
      item.eventId,
      item.session,
      item.answers || []
    );

    if (ok) {
      successIds.push(item.eventId);
    } else {
      // Increment retry count
      item.retryCount = (item.retryCount || 0) + 1;
    }
  }

  if (successIds.length > 0) {
    removePendingSyncEvents(successIds);
  }

  const remaining = getPendingSyncEvents().length;
  return { synced: successIds.length, remaining };
}

// 5. High-level sync triggers
export async function syncGameBatch(
  session: StudentSession,
  gameAnswers: AnswerLog[]
): Promise<boolean> {
  const eventId = generateUUID();
  const event: SyncEvent = {
    eventId,
    action: 'saveGame',
    sessionId: session.sessionId,
    session,
    answers: gameAnswers,
    timestamp: Date.now(),
    retryCount: 0,
  };

  // Always queue first for maximum reliability
  queueSyncEvent(event);

  // Attempt immediate send
  const ok = await sendPayloadToServer('saveGame', eventId, session, gameAnswers);
  if (ok) {
    removePendingSyncEvents([eventId]);
    // Also try flushing any earlier backlog
    flushPendingSyncQueue().catch(() => {});
    return true;
  }

  return false;
}

export async function syncFinalizeSession(session: StudentSession): Promise<boolean> {
  const eventId = generateUUID();
  const event: SyncEvent = {
    eventId,
    action: 'finalizeSession',
    sessionId: session.sessionId,
    session,
    answers: session.answers,
    timestamp: Date.now(),
    retryCount: 0,
  };

  queueSyncEvent(event);

  const ok = await sendPayloadToServer('finalizeSession', eventId, session, session.answers);
  if (ok) {
    removePendingSyncEvents([eventId]);
    flushPendingSyncQueue().catch(() => {});
    return true;
  }

  return false;
}
