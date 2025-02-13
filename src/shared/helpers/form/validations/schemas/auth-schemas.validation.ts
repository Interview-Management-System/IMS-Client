import {
    ForgetPasswordRequest,
    UserLoginRequest
} from '../../../../../modules/auth/models/authentication.model'
import {
    createEmailValidation,
    createPasswordValidation
} from '../validation-builder/string-validation.builder'
import { createValidationSchema } from './validation-schema.builder'

export default class AuthSchemaValidation {
    static get loginSchemaValidation() {
        return createValidationSchema<UserLoginRequest>({
            email: createEmailValidation(1, 50),
            password: createPasswordValidation()
        })
    }

    static get forgotPasswordSchemaValidation() {
        return createValidationSchema<ForgetPasswordRequest>({
            email: createEmailValidation(1, 50)
        })
    }
}
