import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Description, OkButton, OkButtonText, Title } from './styles';

const AppointmentCreated: React.FC = () => {
    const { reset } = useNavigation();

    const handleOkPressed = useCallback(() => {
        reset({
            routes: [{ name: 'Dashboard' }],
            index: 0
        });
    }, []);

    return (
        <Container>
            <Icon name="check" size={80} color="#04d361" />

            <Title>Agendamento concluído</Title>
            <Description>Terça, dia 03 de agosto de 2021 às 16:00h</Description>

            <OkButton onPress={handleOkPressed}>
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
};

export default AppointmentCreated;