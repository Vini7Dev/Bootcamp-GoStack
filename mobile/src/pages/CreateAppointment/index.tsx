import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import Icons from 'react-native-vector-icons/Feather';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProviderListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName
} from './styles';
import api from '../../services/api';

interface RouteParams {
    provider_id: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const CreateAppointment: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { provider_id } = route.params as RouteParams;
    const { user } = useAuth();

    const [providers, setProviders] = useState<Provider[]>([]);

    const navigateToBack = useCallback(() => {
        navigation.goBack();
    }, []);


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
                <BackButton onPress={navigateToBack} >
                    <Icons name="chevron-left" color="#999591" size={24} />
                </BackButton>

                <HeaderTitle>Cabeleireiro(a)</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <ProviderListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={provider => provider.id}
                    renderItem={({ item }) => (
                        <ProviderContainer>
                            <ProviderAvatar source={{ uri: item.avatar_url }} />

                            <ProviderName>{item.name}</ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProviderListContainer>
        </Container>
    );
}

export default CreateAppointment;