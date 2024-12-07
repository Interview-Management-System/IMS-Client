import * as Yup from 'yup'

export function createEmailValidation(minLength: number, maxLength: number) {
    return Yup.string().min(minLength).max(maxLength).required()
}

export function createPasswordValidation() {
    return Yup.string().required()
}

export function createStringValidation() {
    return Yup.string().required()
}

export function createNumberValidation() {
    return Yup.number().required()
}

export function createDateValidation(isRequired: boolean) {
    return isRequired ? Yup.date().required() : Yup.date()
}

export function createPhoneValidation() {
    return Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10,12}$/, 'Phone number must be between 10 to 12 digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(12, 'Phone number must be at most 12 digits')
}

export function createBooleanValidation() {
    return Yup.boolean().required('Gender is required').oneOf([true, false], 'Gender must be Male or Female')
}

export function createEnumValidation<T extends Record<string, number | string>>(enumType: T) {
    const enumValues = Object.values(enumType)
    console.log(enumValues)

    return Yup.mixed().oneOf(enumValues, `Invalid value. Must be one of ${enumValues.join(', ')}`)
}
