import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
`;

export const Description = styled.Text`
    font-family: 'RobotSlab-Regular';
    font-size: 16px;
    color: #999591;
    margin-top: 16px;
    text-align: center;
`;

export const OkButton = styled(RectButton)`
    background: #ff9000;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 24px;
    padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
    font-family: 'RobotSlab-Medium';
    font-size: 18px;
    color: #312e38;
`;

export const Title = styled.Text`
    font-size: 32px;
    color: #f4ede8;
    font-family: 'RobotSlab-Medium';
    margin-top: 48px;
    text-align: center;
`;