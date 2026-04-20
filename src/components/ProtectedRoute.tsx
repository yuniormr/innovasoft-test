import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import type { ComponentType } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

interface ProtectedRouteProps extends RouteProps {
  component: ComponentType<Record<string, unknown>>;
}

export default function ProtectedRoute({ component: Component, ...rest }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
}
