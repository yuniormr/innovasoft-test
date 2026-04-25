import React, { createContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../api/authService';
import { storage } from '../utils/storage';
import type { AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: unknown;
}

export interface AuthContextValue extends AuthState {
  login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AuthUser; token: string } }
  | { type: 'LOGIN_ERROR'; payload: unknown }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken(),
  loading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState, user: null, token: null, isAuthenticated: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (username: string, password: string, rememberMe: boolean): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const data = await authService.login(username, password);
      const user = { id: data.userid, username: data.username };
      storage.setToken(data.token);
      storage.setUser(user);
      if (rememberMe) {
        storage.setRememberedUsername(username);
      } else {
        storage.removeRememberedUsername();
      }
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token: data.token },
      });
      return true;
    } catch (err) {
      dispatch({ type: 'LOGIN_ERROR', payload: err });
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Ignoramos el error de red — limpiamos la sesión local de todas formas
    }
    storage.clearSession();
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}
