import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform, Alert } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { format } from 'date-fns';
import Icons from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    Content,
    ProviderListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    CalendarContainer,
    CalendarTitle,
    OpenDatePickerButton,
    OpenDatePicketButtonText,
    Schedule,
    ScheduleTitle,
    ScheduleSection,
    ScheduleSectionTitle,
    ScheduleSectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText
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

interface DaysAvailability {
    available: boolean;
    hour: number;
}

const CreateAppointment: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as RouteParams;
    const { user } = useAuth();

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProviderId, setSelectedProviderId] = useState(routeParams.provider_id);
    const [daysAvailability, setDaysAvailability] = useState<DaysAvailability[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(0);

    const navigateToBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleSelectProvider = useCallback((provider_id: string) => {
        setSelectedProviderId(provider_id);
    }, []);

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker(state => !state);
    }, []);

    const handleChangeDatePicker = useCallback((event: any, date: Date | undefined) => {
        if(Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if(date) {
            setSelectedDate(date);
        }
    }, []);

    const handleSelectHour = useCallback((hour: number) => {
        setSelectedHour(hour);
    }, []);

    const handelCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectedDate);

            date.setHours(selectedHour + 3);
            date.setMinutes(0);
    
            await api.post('/appointments', {
                provider_id: selectedProviderId,
                date
            });

            date.setHours(selectedHour);

            navigation.navigate('AppointmentCreated', { date: date.getTime() });
        } catch(error) {
            Alert.alert(
                'Erro ao criar o agendamento',
                'Houve uma falha ao tentar criar o agendamento, tente novamente.'
            );

            console.log(error);
        }
    }, [navigation, selectedDate, selectedHour, selectedProviderId]);

    const morningDaysAvailability = useMemo(() => {
        return daysAvailability
            .filter(day => day.hour < 12)
            .map(({ hour, available }) => {
                return {
                    available,
                    hour,
                    hourFormated: format(new Date().setHours(hour), 'HH:00')
                }
            });
    } , [daysAvailability]);

    const afternoonDaysAvailability = useMemo(() => {
        return daysAvailability
            .filter(day => day.hour >= 12)
            .map(({ hour, available }) => {
                return {
                    available,
                    hour,
                    hourFormated: format(new Date().setHours(hour), 'HH:00')
                }
            });
    }, [daysAvailability]);

    useEffect(() => {
        api.get('/providers').then(
            response => setProviders(response.data)
        ).catch(
            error => console.log(error)
        );
    }, []);

    useEffect(() => {
        api.get(`/providers/${selectedProviderId}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(
            response => setDaysAvailability(response.data)
        ).catch(
            error => console.log(error)
        );

        setSelectedHour(0);
    }, [selectedDate, selectedProviderId]);

    return(
        <Container>
            <Header>
                <BackButton onPress={navigateToBack} >
                    <Icons name="chevron-left" color="#999591" size={24} />
                </BackButton>

                <HeaderTitle>Cabeleireiro(a)</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <Content>
                <ProviderListContainer>
                    <ProvidersList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={providers}
                        keyExtractor={provider => provider.id}
                        renderItem={({ item }) => (
                            <ProviderContainer
                                selected={selectedProviderId === item.id}
                                onPress={() => handleSelectProvider(item.id)}
                            >
                                <ProviderAvatar source={{ uri: item.avatar_url }} />

                                <ProviderName
                                    selected={selectedProviderId === item.id}
                                >
                                    {item.name}
                                </ProviderName>
                            </ProviderContainer>
                        )}
                    />
                </ProviderListContainer>

                <CalendarContainer>
                    <CalendarTitle>Escolha a data</CalendarTitle>

                    <OpenDatePickerButton onPress={handleToggleDatePicker} >
                        <OpenDatePicketButtonText>Selecionar outra data</OpenDatePicketButtonText>
                    </OpenDatePickerButton>

                    {showDatePicker && (
                        <DateTimePicker
                            mode="date"
                            display="calendar"
                            value={selectedDate}
                            onChange={handleChangeDatePicker}
                            is24Hour
                        />
                    )}
                </CalendarContainer>

                <Schedule>
                    <ScheduleTitle>Escolha um horário</ScheduleTitle>

                    <ScheduleSection>
                        <ScheduleSectionTitle>Manhã</ScheduleSectionTitle>

                        <ScheduleSectionContent horizontal>
                            {
                                morningDaysAvailability.map(({ hourFormated, hour, available }) => (
                                    <Hour
                                        key={hourFormated}
                                        enabled={available}
                                        available={available}
                                        selected={selectedHour === hour}
                                        onPress={() => handleSelectHour(hour)}
                                    >
                                        <HourText
                                            selected={selectedHour === hour}
                                        >{hourFormated}</HourText>
                                    </Hour>
                                ))
                            }
                        </ScheduleSectionContent>
                    </ScheduleSection>
                    
                    <ScheduleSection>
                        <ScheduleSectionTitle>Tarde</ScheduleSectionTitle>
                        
                        <ScheduleSectionContent horizontal>
                            {
                                afternoonDaysAvailability.map(({ hourFormated, hour, available }) => (
                                    <Hour
                                        key={hourFormated}
                                        enabled={available}
                                        available={available}
                                        selected={selectedHour === hour}
                                        onPress={() => handleSelectHour(hour)}
                                    >
                                        <HourText
                                            selected={selectedHour === hour}
                                        >{hourFormated}</HourText>
                                    </Hour>
                                ))
                            }
                        </ScheduleSectionContent>
                    </ScheduleSection>
                </Schedule>

                <CreateAppointmentButton onPress={() => handelCreateAppointment()}>
                    <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    );
}

export default CreateAppointment;