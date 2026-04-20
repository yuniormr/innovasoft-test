import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import HomePage from '../features/home/pages/HomePage';
import ClientListPage from '../features/clients/pages/ClientListPage';
import ClientMaintenancePage from '../features/clients/pages/ClientMaintenancePage';
import ClientDetailPage from '../features/clients/pages/ClientDetailPage';
import NotFoundPage from '../features/error/pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={ROUTES.LOGIN} />} />
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      <Route exact path={ROUTES.REGISTER} component={RegisterPage} />
      <ProtectedRoute exact path={ROUTES.HOME} component={HomePage} />
      <ProtectedRoute exact path={ROUTES.CLIENTS} component={ClientListPage} />
      <ProtectedRoute exact path={ROUTES.CLIENT_NEW} component={ClientMaintenancePage} />
      <ProtectedRoute exact path={ROUTES.CLIENT_EDIT} component={ClientMaintenancePage} />
      <ProtectedRoute exact path={ROUTES.CLIENT_DETAIL} component={ClientDetailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
