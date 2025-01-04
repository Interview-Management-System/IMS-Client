import * as Yup from 'yup'

export function createNumberValidation(min?: number, max?: number) {
    let schema = Yup.number().required('This field is required.')

    if (min !== undefined) {
        schema = schema.min(min, `Value must be >= to ${min}.`)
    }

    if (max !== undefined) {
        schema = schema.max(max, `Value must be <= to ${max}.`)
    }

    return schema
}

export function createEnumValidation<T extends Record<string, number | string>>(enumType: T) {
    const numericEnumValues = Object.values(enumType).filter(e => typeof e === 'number')

    return Yup.mixed()
        .oneOf(numericEnumValues, 'Value must be one of the allowed values')
        .required('This field is required')
}
