export default class UserSchemaValidation {
    // static get candidateCreateSchemaValidation() {
    //     return createValidationSchema<CreateCandidateRequest>({
    //         email: createEmailValidation(),
    //         username: createStringValidation(true),
    //         dob: createDateValidation(true),
    //         address: createStringValidation(true),
    //         phoneNumber: createPhoneValidation(),
    //         gender: createBooleanValidation(),
    //         createdBy: undefined,
    //         isActive: undefined,
    //         attachment: createFileValidation(),
    //         status: undefined,
    //         note: createStringValidation(),
    //         recruiterId: createStringValidation(true),
    //         yearsOfExperience: createNumberValidation(1, 10),
    //         departmentId: undefined,
    //         positionId: createEnumValidation(PositionEnum),
    //         skillId: Yup.mixed().required(),
    //         highestLevelId: createEnumValidation(HighestLevelEnum),
    //         roleId: undefined
    //     })
    // }
    // static get userCreateSchemaValidation() {
    //     return createValidationSchema<UserForCreateDTO>({
    //         email: createEmailValidation(),
    //         username: createStringValidation(true),
    //         dob: createDateValidation(true),
    //         address: createStringValidation(true),
    //         phoneNumber: createPhoneValidation(),
    //         gender: createBooleanValidation(),
    //         roleId: createStringValidation(true),
    //         createdBy: undefined,
    //         isActive: createBooleanValidation(),
    //         note: createStringValidation(),
    //         departmentId: createEnumValidation(DepartmentEnum)
    //     })
    // }
}
