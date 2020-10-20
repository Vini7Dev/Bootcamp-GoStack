import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MyRoute from '../routes/MyRoute';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
    <Switch>
        <MyRoute path="/" exact component={Login} />
        <MyRoute path="/signup" component={Signup} />
        <MyRoute path="/forgot-password" component={ForgotPassword} />
        <MyRoute path="/reset-password" component={ResetPassword} />

        <MyRoute path="/dashboard" component={Dashboard} isPrivate />
        <MyRoute path="/profile" component={Profile} isPrivate />
    </Switch>
);

export default Routes;