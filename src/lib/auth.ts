export const SESSION_KEY = "ticketapp_session";
export function setSession(s: any) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
export function isAuthenticated() {
  const s = getSession();
  return !!s && new Date(s.expiresAt) > new Date();
}
