/**
 * Helper for making authenticated requests to Teacher API endpoints
 * Supports both HTTP cookies and Authorization: Bearer <token>
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

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}
