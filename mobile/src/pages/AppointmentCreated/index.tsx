import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import Icons from 'react-native-vector-icons/Feather';

import {
    Container,
    Title,
    Description,
    OkButton,
    OkButtonText
} from './styles';

interface RouteParams {
    date: number;
}

const AppointmentCreated: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as RouteParams;

    const handleOkPressed = useCallback(() => {
        navigation.reset({
            routes: [
                { name: 'Dashboard' }
            ],
            index: 0
        });
    }, []);
    
    const formatedDate = useMemo(() => {
        return format(
            routeParams.date,
            "EEEE ', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
            { locale: ptBr }
        );
    }, [routeParams.date]);

    return(
        <Container>
            <Icons name="check" color="#04D361" size={80} />

            <Title>Agendamento concluído</Title>
            <Description>{formatedDate}</Description>

            <OkButton onPress={handleOkPressed}>
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
}

export default AppointmentCreated;