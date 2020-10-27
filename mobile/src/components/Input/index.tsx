import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    containerStyle?: object;
}

interface InputValueRef {
    value: string;
}

interface InputRef {
    focus(): void
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, containerStyle = {}, ...rest }, ref) => {
    const { fieldName, error, registerField, defaultValue = '' } = useField(name);
    const inputValueRef = useRef<InputValueRef>({ value: '' });
    const inputElementRef = useRef<any>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        });
    }, [fieldName, registerField]);

    return (
        <Container isFocused={isFocused} isErrored={!!error} style={containerStyle}>
            <Icon name={icon} size={20} color={isFilled || isFocused ? '#FF9000' : '#666360'} />

            <TextInput
                keyboardAppearance="dark"
                placeholderTextColor="#666360" {...rest}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputElementRef}
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value
                }}
            />
        </Container>
    );
}

export default forwardRef(Input);