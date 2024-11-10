import * as Yup from 'yup'
import { ForgetPasswordRequest, UserLoginRequest } from '../../../../modules/auth/models/authentication.model'
import { createEmailValidation, createPasswordValidation } from './field-validation.builder'

function createValidationSchema<T>(fields: Record<keyof T, any>) {
    return Yup.object().shape(fields)
}

export function loginValidationSchema() {
    return createValidationSchema<UserLoginRequest>({
        email: createEmailValidation(1, 50),
        password: createPasswordValidation()
    })
}

export function forgotPasswordValidationSchema() {
    return createValidationSchema<ForgetPasswordRequest>({
        email: createEmailValidation(1, 50)
    })
}
