import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, containerStyle, name, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);
    const [isFocus, setIsFocus] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    const handleInputFocus = useCallback(() => {
        setIsFocus(true);
    }, []);

    const handelInputBlur = useCallback(() => {
        setIsFocus(false);

        setIsFilled(!! inputRef.current?.value);
    }, []);

    return (
        <Container
            style={containerStyle}
            isError={!!error}
            isFocus={isFocus}
            isFilled={isFilled}
        >
            { Icon && <Icon size={20} /> }
            <input
                onFocus={handleInputFocus}
                onBlur={handelInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
            
            {
            error &&
            <Error title={error}>
                <FiAlertCircle color="#C53030" size={20}/>
            </Error>
            }
        </Container>
    );
}

export default Input;