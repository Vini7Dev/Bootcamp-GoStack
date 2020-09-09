import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MyRoute from '../routes/MyRoute';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
    <Switch>
        <MyRoute path="/" exact component={Login} />
        <MyRoute path="/signup" component={Signup} />

        <MyRoute path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
);

export default Routes;