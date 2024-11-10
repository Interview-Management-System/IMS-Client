import * as Yup from 'yup'

export function createEmailValidation(minLength: number, maxLength: number) {
    return Yup.string().min(minLength).max(maxLength).required()
}

export function createPasswordValidation() {
    return Yup.string().required()
}
