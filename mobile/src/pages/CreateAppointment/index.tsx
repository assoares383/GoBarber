import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { 
    BackButton,
    Calendar,
    Container,
    Content,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
    Header, 
    HeaderTitle,
    Hour,
    HourText,
    OpenDatePickerButton,
    OpenDatePickerButtonText,
    ProviderAvatar,
    ProviderContainer,
    ProviderName,
    ProvidersList,
    ProvidersListContainer,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Title,
    UseAvatar 
}  from './styles';
interface RouteParams {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

export interface AvailabilityItem {
    hour: number;
    available: boolean;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { goBack, navigate } = useNavigation();

    const routeParams = route.params as RouteParams;

    const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(0);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    useEffect(() => {
        api.get(`providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            setAvailability(response.data);
        })
    }, [selectedDate, selectedProvider]);

    const navigateBack = useCallback(() => {
        goBack();
    }, [goBack]);

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId);
    }, []);

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker(state => !state);
    }, []);

    const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if (date) {
            setSelectedDate(date);
        }
    }, []);

    const handleSelectedHour = useCallback((hour: number) => {
        setSelectedHour(hour);
    }, [])

    const morningAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour < 12)
            .map(({ hour, available }) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), 'HH:00'),
                }
            })
    }, [availability]);

    const afternoonAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour >= 12)
            .map(({ hour, available }) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), 'HH:00'),
                }
            })
    }, [availability]);

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectedDate);

            date.setHours(selectedHour);
            date.setMinutes(0);

            await api.post('appointments', {
                provider_id: selectedProvider,
                date,
            });

            navigate('AppointmentCreated', { date: date.getTime() });
        } catch (err) {
            Alert.alert(
                'Erro ao criar agendamento',
                'Ocorreu um erro ao tentar criar o agendamento, tente novamente'
            )
        }
    }, [navigate, selectedDate, selectedHour, selectedProvider]);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UseAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <Content>
                <ProvidersListContainer>
                    <ProvidersList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={providers}
                        keyExtractor={provider => provider.id}
                        renderItem={({ item: provider }) => (
                            <ProviderContainer onPress={() => handleSelectProvider(provider.id)} selected={provider.id === selectedProvider}>
                                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                                <ProviderName selected={provider.id === selectedProvider}>{provider.name}</ProviderName>
                            </ProviderContainer>
                        )}
                    />
                </ProvidersListContainer>

                <Calendar>
                    <Title>Escolha a data</Title>

                    <OpenDatePickerButton onPress={handleToggleDatePicker}>
                        <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
                    </OpenDatePickerButton>

                    {showDatePicker && (
                        <DateTimePicker 
                            mode="date"
                            display="calendar"
                            onChange={handleDateChanged}
                            value={selectedDate}
                            />
                    )}
                </Calendar>

                <Schedule>
                    <Title>Escolha o horário</Title>

                    <Section>
                        <SectionTitle>Manhã</SectionTitle>

                        <SectionContent>
                            {morningAvailability.map(({ hourFormatted, hour, available }) => (
                                <Hour 
                                    enabled={available}
                                    selected={selectedHour === hour}
                                    available={available} 
                                    key={hourFormatted}
                                    onPress={() => handleSelectedHour(hour)}
                                >
                                    <HourText selected={selectedHour === hour}>
                                        {hourFormatted}
                                    </HourText>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>

                        <SectionContent>
                            {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
                                <Hour 
                                    enabled={available}
                                    selected={selectedHour === hour}
                                    available={available} 
                                    key={hourFormatted}
                                    onPress={() => handleSelectedHour(hour)}
                                >
                                    <HourText selected={selectedHour === hour}>
                                        {hourFormatted}
                                    </HourText>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>
                </Schedule>

                <CreateAppointmentButton onPress={handleCreateAppointment}>
                   <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    );
};

export default CreateAppointment;