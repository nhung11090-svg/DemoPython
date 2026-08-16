/**
 * Helper for making authenticated requests to Teacher API endpoints
 * Supports both HTTP cookies and Authorization: Bearer <token>
 * Automatically enforces Cache-Control: no-cache and cache-busting timestamp
 */

export function getTeacherAuthToken(): string | null {
  try {
    return localStorage.getItem('pythonQuestTeacherToken');
  } catch {
    return null;
  }
}

export function setTeacherAuthToken(token: string): void {
  try {
    localStorage.setItem('pythonQuestTeacherToken', token);
  } catch {}
}

export function clearTeacherAuthToken(): void {
  try {
    localStorage.removeItem('pythonQuestTeacherToken');
  } catch {}
}

export async function teacherFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getTeacherAuthToken();
  const headers = new Headers(options.headers || {});

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Enforce zero cache
  headers.set('Cache-Control', 'no-cache, no-store, max-age=0');
  headers.set('Pragma', 'no-cache');

  let finalUrl = url;
  if (!options.method || options.method.toUpperCase() === 'GET') {
    const separator = url.includes('?') ? '&' : '?';
    finalUrl = `${url}${separator}_t=${Date.now()}`;
  }

  return fetch(finalUrl, {
    ...options,
    headers,
    credentials: 'include',
    cache: 'no-store',
  });
}
