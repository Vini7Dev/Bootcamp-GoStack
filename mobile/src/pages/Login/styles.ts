import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 100 : 40}px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0px 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
    color: #F4EDE8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const CreateAccount = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #312E38;
    border-top-width: 1px;
    border-top-color: #232129;
    padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const CreateAccountText = styled.Text`
    color: #FF9000;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;