import * as Yup from 'yup'
import { ForgetPasswordRequest, UserLoginRequest } from '../../../../modules/auth/models/authentication.model'
import { CreateCandidateRequest } from '../../../models/candidate.model'
import {
    createDateValidation,
    createEmailValidation,
    createNumberValidation,
    createPasswordValidation,
    createPhoneValidation,
    createStringValidation
} from './field-validation.builder'

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

export function createCandidateValidationSchema() {
    return createValidationSchema<CreateCandidateRequest>({
        email: createEmailValidation(1, 50),
        username: createStringValidation(),
        dob: createDateValidation(true),
        address: createStringValidation(),
        phoneNumber: createPhoneValidation(),
        gender: Yup.mixed().required(),
        roleId: undefined,
        createdBy: undefined,
        isActive: undefined,
        attachment: undefined,
        status: undefined,
        note: Yup.mixed().optional(),
        recruiterId: Yup.string().required(),
        yearsOfExperience: createNumberValidation(),
        departmentId: undefined,
        positionId: undefined,
        skillId: undefined,
        highestLevelId: undefined
    })
}

/**
 * 
 * skillId: createEnumValidation(SkillEnum),
        positionId: createEnumValidation(PositionEnum),
        departmentId: createEnumValidation(DepartmentEnum),
        highestLevelId: createEnumValidation(HighestLevelEnum)
 * 
 */
