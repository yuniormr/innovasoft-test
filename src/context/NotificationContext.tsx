import React, { createContext, useCallback, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Severity } from '../types';

interface NotificationState {
  open: boolean;
  message: string;
  severity: Severity;
}

export interface NotificationContextValue extends NotificationState {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  hideNotification: () => void;
}

type NotificationAction =
  | { type: 'SHOW'; payload: { message: string; severity: Severity } }
  | { type: 'HIDE' };

const initialState: NotificationState = {
  open: false,
  message: '',
  severity: 'success', // 'success' | 'error' | 'warning' | 'info'
};

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'SHOW':
      return { open: true, message: action.payload.message, severity: action.payload.severity };
    case 'HIDE':
      return { ...state, open: false };
    default:
      return state;
  }
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showSuccess = useCallback((message: string) => {
    dispatch({ type: 'SHOW', payload: { message, severity: 'success' } });
  }, []);

  const showError = useCallback((message: string) => {
    dispatch({ type: 'SHOW', payload: { message, severity: 'error' } });
  }, []);

  const hideNotification = useCallback(() => {
    dispatch({ type: 'HIDE' });
  }, []);

  return (
    <NotificationContext.Provider value={{ ...state, showSuccess, showError, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
