import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { 
    BackButton,
    Calendar,
    Container,
    Header, 
    HeaderTitle,
    OpenDatePickerButton,
    OpenDatePickerButtonText,
    ProviderAvatar,
    ProviderContainer,
    ProviderName,
    ProvidersList,
    ProvidersListContainer,
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

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { goBack } = useNavigation();

    const routeParams = route.params as RouteParams;

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

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

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UseAvatar source={{ uri: user.avatar_url }} />
            </Header>

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
        </Container>
    );
};

export default CreateAppointment;