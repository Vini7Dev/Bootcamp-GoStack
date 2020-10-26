import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
`;


export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 32px;
    text-align: center;
    margin-top: 48px;
    color: #F4EDE8;
`;

export const Description = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    margin-top: 16px;
    color: #999591;
`;

export const OkButton = styled(RectButton)`
    background: #FF9000;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-top: 24px;
    padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #312E38;
`;
