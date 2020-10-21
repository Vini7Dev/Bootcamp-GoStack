import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CreateAppointmentd from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import Profile from '../pages/Profile';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <Auth.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#312E38' }
            }}
        >
            <Auth.Screen name="Dashboard" component={Dashboard} />
            <Auth.Screen name="CreateAppointmentd" component={CreateAppointmentd} />
            <Auth.Screen name="AppointmentCreated" component={AppointmentCreated} />
            
            <Auth.Screen name="Profile" component={Profile} />
        </Auth.Navigator>
    );
}

export default AppRoutes;