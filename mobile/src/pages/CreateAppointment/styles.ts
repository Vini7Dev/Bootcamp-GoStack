import styled from 'styled-components/native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { css } from 'styled-components';

import { Provider } from './index';

interface ProviderContainerProps {
    selected: boolean;
}

interface ProviderNameProps {
    selected: boolean;
}

interface HourProps {
    available: boolean;
    selected: boolean;
}

interface HourTextProps {
    selected: boolean;
}

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

export const Content = styled.ScrollView``;

export const ProviderListContainer = styled.View`
    height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
    background: ${props => props.selected ? '#FF9000' : '#3E3B47'};
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

export const ProviderName = styled.Text<ProviderNameProps>`
    color: ${props => props.selected ? '#232129' : '#F4EDE8'};
    margin-left: 8px;
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
`;


export const CalendarContainer = styled.View`

`;

export const CalendarTitle = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    color: #F4EDE8;
    margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
    height: 46px;
    background: #FF9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
`

export const OpenDatePicketButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: #232129;
`


export const Schedule = styled.View`
    padding: 24px 0 16px; 
`;

export const ScheduleTitle = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    color: #F4EDE8;
    margin: 0 24px 24px;
`;

export const ScheduleSection = styled.View`
    margin-bottom: 24px;
`;

export const ScheduleSectionTitle = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    color: #999591;
    margin: 0 24px 12px;
`;

export const ScheduleSectionContent = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 24 },
    showsHorizontalScrollIndicator: false
})`

`;

export const Hour = styled(RectButton)<HourProps>`
    border-radius: 10px;
    margin-right: 8px;
    padding: 12px;
    background: ${props => props.selected ? '#FF9000' : '#3E3B47'};
    opacity: ${props => props.available ? 1 : 0.3};
`;

export const HourText = styled.Text<HourTextProps>`
    color: ${props => props.selected ? '#232129' : '#F4EDE8'};
    font-family: 'RobotoSlab-Regular';
    font-size: 16px;
`;


export const CreateAppointmentButton = styled(RectButton)`
    height: 50px;
    background: #FF9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px 24px;
`;
export const CreateAppointmentButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #232129;
`;