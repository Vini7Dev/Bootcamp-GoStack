import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0 30px 40px;
`;

export const BackButton = styled.TouchableOpacity`
    margin-top: 40px;
`;

export const Title = styled.Text`
    color: #F4EDE8;
    font-size: 20px;
    font-family: 'RobotoSlab-Medium';
    margin: 24px 0px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
    margin-top: 32px;
`;

export const UserAvatar = styled.Image`
    width: 186px;
    height: 186px;
    border-radius: 98px;
    align-self: center;
`;