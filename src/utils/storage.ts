import type { AuthUser } from "../types";

const TOKEN_KEY = "innovasoft_token";
const USER_KEY = "innovasoft_user";
const REMEMBER_KEY = "innovasoft_remember";

export const storage = {
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  setUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  },
  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  setRememberedUsername(username: string): void {
    localStorage.setItem(REMEMBER_KEY, username);
  },
  getRememberedUsername(): string {
    return localStorage.getItem(REMEMBER_KEY) || "";
  },
  removeRememberedUsername(): void {
    localStorage.removeItem(REMEMBER_KEY);
  },

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
