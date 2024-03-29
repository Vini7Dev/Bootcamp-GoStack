import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-day-picker/lib/style.css'
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    NextAppointments,
    Section,
    Appointment,
    Calendar }
from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';

interface IMonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface IAppointment {
    id: string;
    date: string;
    hour_formated: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const { logout, user } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [monthAvailability, setMonthAvailability] = useState<IMonthAvailabilityItem[]>([]);

    const [appointmentsInDay, setAppointmentsInDay] = useState<IAppointment[]>([]);

    const handleOnDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    const disabledDays = useMemo(() => {
        const days = monthAvailability
            .filter(monthDay =>  monthDay.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();

                return new Date(year, month, monthDay.day);
            });

        return days;
    }, [currentMonth, monthAvailability]);

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBR
        });
    }, [selectedDate]);

    const selectedWeekDayAsText = useMemo(() => {
        return format(selectedDate, "cccc", {
            locale: ptBR
        });
    }, [selectedDate]);

    const morningAppointments = useMemo(() => {
        return appointmentsInDay.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12;
        });
    }, [appointmentsInDay]);
    
    const afternoonAppointments = useMemo(() => {
        return appointmentsInDay.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12;
        });
    }, [appointmentsInDay]);

    const nextAppointment = useMemo(() => {
        return appointmentsInDay.find(appointment => {
            return isAfter(parseISO(appointment.date), new Date());
        });
    }, [appointmentsInDay]);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1
            }
        }).then(
            response => setMonthAvailability(response.data)
        ).catch(
            error => console.log(error)
        );
    }, [currentMonth, user]);

    useEffect(() => {
        api.get<IAppointment[]>('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(
            response => {
                const appointmentsFormatedHour = response.data.map(appointment => {
                    return {
                        ...appointment,
                        hour_formated: format(parseISO(appointment.date), "HH:mm")
                    }
                });

                setAppointmentsInDay(appointmentsFormatedHour);
            }
        ).catch(
            error => console.log(error)
        );
    }, [selectedDate]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img
                            src={ user.avatar_url }
                            alt={ user.name }
                        />

                        <div>
                            <span>Bem vindo,</span>
                            
                            <Link to='/profile'>
                                <strong>{ user.name }</strong>
                            </Link>
                        </div>
                    </Profile>

                    <button type="button" onClick={logout}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>

                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDayAsText}</span>
                    </p>

                    {
                        isToday(selectedDate) && nextAppointment && (
                            <NextAppointments key={nextAppointment.id}>
                                <strong>Agendamento a seguir</strong>

                                <div>
                                    <img
                                        src={nextAppointment.user.avatar_url}
                                        alt={nextAppointment.user.name}
                                    />

                                    <strong>{nextAppointment.user.name}</strong>
                                    <span>
                                        <FiClock />
                                        {nextAppointment.hour_formated}
                                    </span>
                                </div>
                            </NextAppointments>
                        )
                    }

                    <Section>
                        <strong>Manhã</strong>
                        
                        {
                            morningAppointments.length === 0 && (
                                <p>Nenhum agendamento neste período.</p>
                            )
                        }

                        {
                            morningAppointments.map(appointment => (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {appointment.hour_formated}
                                    </span>

                                    <div>
                                        <img
                                            src={appointment.user.avatar_url}
                                            alt={appointment.user.name}
                                        />

                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            ))
                        }
                    </Section>
                    
                    <Section>
                        <strong>Tarde</strong>

                        {
                            afternoonAppointments.length === 0 && (
                                <p>Nenhum agendamento neste período.</p>
                            )
                        }

                        {
                            afternoonAppointments.map(appointment => (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {appointment.hour_formated}
                                    </span>

                                    <div>
                                        <img
                                            src={appointment.user.avatar_url}
                                            alt={appointment.user.name}
                                        />

                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            ))
                        }
                    </Section>
                </Schedule>
                
                <Calendar>
                    <DayPicker
                        fromMonth={new Date()}
                        disabledDays={[
                            { daysOfWeek: [0, 6] }, ...disabledDays
                        ]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] }
                        }}
                        onMonthChange={handleMonthChange}
                        onDayClick={handleOnDateChange}
                        selectedDays={selectedDate}
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro'
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    )
}

export default Dashboard;