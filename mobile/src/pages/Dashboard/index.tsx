import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileButton,
    UserAvatar,
    ProviderList,
    ProvidersListTitle,
    ProviderContainerButton,
    ProviderAvatar,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText
} from './styles';

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigation = useNavigation();

    const [providers, setProviders] = useState<Provider[]>([]);

    const navigateToProfile = useCallback(() => {
        navigation.navigate('Profile');
    }, [navigation]);

    const navigateToCreateAppointment = useCallback((provider_id: string) => {
        navigation.navigate('CreateAppointment', { provider_id });
    }, [navigation]);

    useEffect(() => {
        api.get('/providers').then(
            response => setProviders(response.data)
        ).catch(
            error => console.log(error)
        );
    }, []);

    return(
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo(a), {'\n'}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    <UserAvatar source={{ uri: user.avatar_url }} />
                </ProfileButton>
            </Header>

            <ProviderList
                data={providers}
                keyExtractor={(provider) => provider.id}
                ListHeaderComponent={
                    <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
                }
                renderItem={({ item }) => (
                    <ProviderContainerButton onPress={() => navigateToCreateAppointment(item.id)} >
                        <ProviderAvatar source={{ uri: item.avatar_url }} />

                        <ProviderInfo>
                            <ProviderName>{ item.name }</ProviderName>

                            <ProviderMeta>
                                <Icons name="calendar" color="#FF9000" size={14} />
                                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                            </ProviderMeta>

                            <ProviderMeta>
                                <Icons name="clock" color="#FF9000" size={14} />
                                <ProviderMetaText>8h às 18h</ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainerButton>
                )}
            />
        </Container>
    );
}

export default Dashboard;