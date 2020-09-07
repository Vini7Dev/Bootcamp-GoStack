import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocus: boolean;
    isFilled: boolean;
    isError: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    color: #666360;
    background: #232129;
    border: 2px solid #232129;
    border-radius: 10px;
    padding: 16px;
    width: 100%;

    ${props => props.isError && css`
        border-color: #C53030;
    `}

    ${props => props.isFocus && css`
        color: #FF9000;
        border-color: #FF9000;
    `}

    ${props => props.isFilled && css`
        color: #FF9000;
    `}

    input {
        flex: 1;
        color: #F4EDE8;
        background: transparent;
        border: none;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }

    & + div {
        margin-top: 8px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;

    svg {
        margin: 0;
    }

    span {
        background: #C53030;
        color: #F4EDE8;
    }

    span::before {
        border-color: #C53030 transparent;
    }
`;