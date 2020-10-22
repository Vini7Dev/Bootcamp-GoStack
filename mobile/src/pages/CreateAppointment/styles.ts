import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Provider } from './index';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #28262E;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity`

`;

export const HeaderTitle = styled.Text`
    color: #F5EDE8;
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
    margin-left: 16px;
`;

export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-left: auto;
`;

export const ProviderListContainer = styled.View`
    height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 32px 24px;
`;

export const ProviderContainer = styled.View`
    background: #3E3B47;
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
    margin-right: 16px;
    border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
`;

export const ProviderName = styled.Text`
    margin-left: 8px;
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: #F4EDE8;
`;

