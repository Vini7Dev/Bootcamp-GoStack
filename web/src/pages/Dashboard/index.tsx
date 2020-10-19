import React, { useState, useCallback } from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
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

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleOnDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available) {
            setSelectedDate(day);
        }
    }, []);

    const { logout, user } = useAuth();

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
                            <strong>{ user.name }</strong>
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
                        <span>Hoje</span>
                        <span>Dia 6</span>
                        <span>Segunda-feira</span>
                    </p>

                    <NextAppointments>
                        <strong>Atendimento a seguir</strong>

                        <div>
                            <img
                                src="https://avatars0.githubusercontent.com/u/68403363?s=460&u=4291397fb3eb0cfd2f0ff0a1a45b4e8eff1d9960&v=4"
                                alt="Vinícius Gabriel"
                            />

                            <strong>Vinícius Gabriel</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointments>

                    <Section>
                        <strong>Manhã</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img
                                    src="https://avatars0.githubusercontent.com/u/68403363?s=460&u=4291397fb3eb0cfd2f0ff0a1a45b4e8eff1d9960&v=4"
                                    alt="Vinícius Gabriel"
                                />

                                <strong>Vinícius Gabriel</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img
                                    src="https://avatars0.githubusercontent.com/u/68403363?s=460&u=4291397fb3eb0cfd2f0ff0a1a45b4e8eff1d9960&v=4"
                                    alt="Vinícius Gabriel"
                                />

                                <strong>Vinícius Gabriel</strong>
                            </div>
                        </Appointment>
                    </Section>
                    
                    <Section>
                        <strong>Tarde</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img
                                    src="https://avatars0.githubusercontent.com/u/68403363?s=460&u=4291397fb3eb0cfd2f0ff0a1a45b4e8eff1d9960&v=4"
                                    alt="Vinícius Gabriel"
                                />

                                <strong>Vinícius Gabriel</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                
                <Calendar>
                    <DayPicker
                        fromMonth={new Date()}
                        disabledDays={[
                            { daysOfWeek: [0, 6] }
                        ]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] }
                        }}
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