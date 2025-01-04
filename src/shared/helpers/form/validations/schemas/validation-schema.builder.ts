import * as Yup from 'yup'

export function createValidationSchema<T>(fields: Record<keyof T, any>) {
    return Yup.object().shape(fields)
}
