import styled from 'styled-components/native';

import { Platform } from 'react-native';

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 200 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatar = styled.Image`
    width: 146px;
    height: 146px;
    border-radius: 98px;
    margin-top: 64px;
    align-self: center;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;
