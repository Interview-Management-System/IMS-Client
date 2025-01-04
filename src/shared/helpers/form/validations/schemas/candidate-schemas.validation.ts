import * as Yup from 'yup'
import { CreateCandidateRequest } from '../../../../../modules/user/models/candidate.model'
import { HighestLevelEnum, PositionEnum } from '../../../../enums/entity-enums/master-data.enum'
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
/*
export function createCandidateValidationSchema() {
    return createValidationSchema<CreateCandidateRequest>({
        email: undefined,
        username: undefined,
        dob: undefined,
        address: undefined,
        phoneNumber: undefined,
        gender: undefined,
        roleId: undefined,
        createdBy: undefined,
        isActive: undefined,
        attachment: undefined,
        status: undefined,
        note: undefined,
        recruiterId: undefined,
        yearsOfExperience: undefined,
        departmentId: undefined,
        positionId: undefined,
        skillId: undefined,
        highestLevelId: undefined
    })
}
*/
export function createCandidateValidationSchema() {
    return createValidationSchema<CreateCandidateRequest>({
        email: createEmailValidation(1, 50),
        username: createStringValidation(true),
        dob: createDateValidation(true),
        address: createStringValidation(true),
        phoneNumber: createPhoneValidation(),
        gender: createBooleanValidation(),
        roleId: undefined,
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
