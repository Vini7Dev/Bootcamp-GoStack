import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();

    return(
        <View>
            <Button title="Sair" onPress={logout} />
        </View>
    );
}

export default Dashboard;