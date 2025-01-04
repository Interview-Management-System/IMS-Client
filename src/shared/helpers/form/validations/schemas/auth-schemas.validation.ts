import {
    ForgetPasswordRequest,
    UserLoginRequest
} from '../../../../../modules/auth/models/authentication.model'
import {
    createEmailValidation,
    createPasswordValidation
} from '../validation-builder/string-validation.builder'
import { createValidationSchema } from './validation-schema.builder'

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
