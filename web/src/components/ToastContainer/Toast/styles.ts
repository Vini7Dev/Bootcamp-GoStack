import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
    type?: 'info' | 'success' | 'error';
    hasDescription: boolean;
}

const toastTypes = {
    info: css`
        background: #EBF8FF;
        color: #3172B7;
    `,
    success: css`
        background: #E6FFFA;
        color: #2E656A;
    `,
    error: css`
        background: #FDDEDE;
        color: #C53030;
    `
}

export const Container = styled(animated.div)<ContainerProps>`
    position: relative;
    display: flex;
    width: 360px;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

    & + div {
        margin-top: 5px;
    }

    ${ props => toastTypes[props.type || 'info'] }

    > svg {
        margin: 4px 12px 0 0;
    }

    div {
        flex: 1;

        p {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        right: 16px;
        top: 19px;
        opacity: 0.8;
        border: 0;
        background: transparent;
        color: inherit;
    }

    ${props => !props.hasDescription && css`
        align-items: center;

        svg {
            margin-top: 0;
        }
    `}
`;