import styled from 'styled-components';
import { shade } from 'polished';

import signInBG from '../../assets/sign-up-background.png';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    width: 100%;
    max-width: 700px;

    form {
        margin: 50px 0;
        width: 340px;
        text-align: center;

        h1 {
            font-size: 24px;
            line-height: 32px;
            text-align: center;
            margin-bottom: 24px;
        }
    }

    > a {
        display: flex;
        align-items: center;
        color: #F4EDE8;
        text-decoration: none;
        margin-top: 20px;
        transition: color 0.2s;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2, '#F4EDE8')};
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBG}) no-repeat center;
    background-size: cover;
`;