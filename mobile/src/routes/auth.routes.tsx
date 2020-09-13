import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Auth.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#312E38' }
            }}
        >
            <Auth.Screen name="Login" component={Login} />
            <Auth.Screen name="Signup" component={Signup} />
        </Auth.Navigator>
    );
}

export default AuthRoutes;