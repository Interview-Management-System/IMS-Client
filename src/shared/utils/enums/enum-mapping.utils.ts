import { RoleEnum } from '../../enums/entity-enums/master-data.enum'

export class EnumMapping {
    private static roleDisplayMapping: Record<RoleEnum, string> = {
        [RoleEnum.Default]: '',
        [RoleEnum.Admin]: 'Administrator',
        [RoleEnum.Manager]: 'Manager',
        [RoleEnum.Candidate]: 'Candidate',
        [RoleEnum.Recruiter]: 'Recruiter',
        [RoleEnum.Interviewer]: 'Interviewer'
    }

    static getRoleNameById(roleId: RoleEnum) {
        return EnumMapping.roleDisplayMapping[roleId]
    }
}
