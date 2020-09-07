import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    span {
        position: absolute;
        bottom: calc(100% + 12px);
        width: 200px;
        left: 50%;
        transform: translateX(-50%);
        background: #FF9000;
        color: #312E38;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.4s;

        &::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-style: solid;
            border-color: #FF9000 transparent;
            border-width: 6px 6px 0 6px;
            bottom: 20px;
        }
    }

    &:hover span {
        opacity: 1;
        visibility: visible;
    }
`;