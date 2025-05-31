export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("session_id");
};

export const getSessionId = (): string | null => {
  return localStorage.getItem("session_id");
};

export const logout = () => {
  localStorage.removeItem("session_id");
  window.location.reload();
};
