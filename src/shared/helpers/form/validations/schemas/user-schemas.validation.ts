import * as Yup from 'yup'
import { CreateCandidateRequest } from '../../../../../modules/user/models/candidate.model'
import { UserForCreateDTO } from '../../../../../modules/user/models/user.model'
import {
    DepartmentEnum,
    HighestLevelEnum,
    PositionEnum
} from '../../../../enums/entity-enums/master-data.enum'
import {
    createBooleanValidation,
    createDateValidation,
    createFileValidation
} from '../validation-builder/custom-validation.builder'
import { createEnumValidation, createNumberValidation } from '../validation-builder/number-validation.builder'
import {
    createEmailValidation,
    createPhoneValidation,
    createStringValidation
} from '../validation-builder/string-validation.builder'
import { createValidationSchema } from './validation-schema.builder'

export function createCandidateValidationSchema() {
    return createValidationSchema<CreateCandidateRequest>({
        email: createEmailValidation(),
        username: createStringValidation(true),
        dob: createDateValidation(true),
        address: createStringValidation(true),
        phoneNumber: createPhoneValidation(),
        gender: createBooleanValidation(),
        createdBy: undefined,
        isActive: undefined,
        attachment: createFileValidation(),
        status: undefined,
        note: createStringValidation(),
        recruiterId: createStringValidation(true),
        yearsOfExperience: createNumberValidation(1, 10),
        departmentId: undefined,
        positionId: createEnumValidation(PositionEnum),
        skillId: Yup.mixed().required(),
        highestLevelId: createEnumValidation(HighestLevelEnum)
    })
}

export function createUserCreateValidationSchema() {
    return createValidationSchema<UserForCreateDTO>({
        email: createEmailValidation(),
        username: createStringValidation(true),
        dob: createDateValidation(true),
        address: createStringValidation(true),
        phoneNumber: createPhoneValidation(),
        gender: createBooleanValidation(),
        roleId: createStringValidation(true),
        createdBy: undefined,
        isActive: createBooleanValidation(),
        note: createStringValidation(),
        departmentId: createEnumValidation(DepartmentEnum)
    })
}
