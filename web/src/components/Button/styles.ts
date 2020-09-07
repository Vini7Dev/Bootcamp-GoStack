import styled from 'styled-components';
import { shade } from 'polished';

export const ButtonContainer = styled.button`
    width: 100%;
    height: 56px;
    border-radius: 10px;
    background: #FF9000;
    border: none;
    padding: 10px;
    margin-top: 16px;
    color: #312E38;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#FF9000')};
    }
`; 