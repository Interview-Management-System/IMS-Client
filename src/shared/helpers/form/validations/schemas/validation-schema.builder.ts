import * as Yup from 'yup'

export function createValidationSchema<T>(fields: Record<keyof T, any>) {
    return Yup.object().shape(fields)
}

export const validationRules = {
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required')
}
