import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { Container, Description, OkButton, OkButtonText, Title } from './styles';
import { useMemo } from 'react';

interface RouteParams {
    date: number;
}

const AppointmentCreated: React.FC = () => {
    const { reset } = useNavigation();
    const { params } = useRoute();

    const routeParams = params as RouteParams;

    const handleOkPressed = useCallback(() => {
        reset({
            routes: [{ name: 'Dashboard' }],
            index: 0
        });
    }, []);

    const formattedDate = useMemo(() => {
        return format(
            routeParams.date, 
            "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", 
            { locale: ptBr })
    }, [routeParams.date]);

    return (
        <Container>
            <Icon name="check" size={80} color="#04d361" />

            <Title>Agendamento concluído</Title>
            <Description>{formattedDate}</Description>

            <OkButton onPress={handleOkPressed}>
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
};

export default AppointmentCreated;