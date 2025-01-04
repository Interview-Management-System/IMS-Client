import * as Yup from 'yup'

export function createEmailValidation(minLength: number, maxLength: number) {
    return Yup.string()
        .email('Invalid email format')
        .min(minLength)
        .max(maxLength)
        .required('Email is required')
}

export function createPasswordValidation(minLength: number = 6, maxLength: number = 20) {
    return Yup.string().min(minLength).max(maxLength).required('Password is required')
}

export function createPhoneValidation() {
    return Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10,12}$/, 'Phone number must be between 10 to 12 digits')
}

export function createStringValidation(isRequired: boolean = false) {
    return isRequired ? Yup.string().required() : Yup.string().optional()
}
