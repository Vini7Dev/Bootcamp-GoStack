import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;

    > header {
        height: 144px;
        background: #28262E;
        padding: 0px 100px;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        div {
            svg {
                color: #999791;
                width: 24px;
                height: 24px;
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    width: 100%;
    max-width: 700px;
    margin: -176px auto 0;

    form {
        display: flex;
        flex-direction: column;
        margin: 50px 0;
        width: 340px;
        text-align: center;

        h1 {
            font-size: 20px;
            text-align: left;
            margin-bottom: 24px;
        }
    }
`;

export const AvatarInput = styled.div`
    position: relative;
    align-self: center;
    margin-bottom: 32px;

    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    button {
        position: absolute;
        background: #FF9000;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        transition: background-color 0.2s;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: 20px;
            height: 20px;
        }

        &:hover {
            background: ${shade(0.2, '#FF9000')}
        }
    }
`;