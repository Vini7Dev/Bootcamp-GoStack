import { ValidationError } from 'yup';

interface ErrorInterf {
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): ErrorInterf {
    const validationErrors: ErrorInterf = {};

    err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
    });

    return validationErrors;
}