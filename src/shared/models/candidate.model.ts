import { DepartmentEnum, HighestLevelEnum, PositionEnum, SkillEnum } from '../enums/master-data.enum'

export interface CreateCandidateRequest {
    username?: string
    email?: string
    dob?: Date
    address?: string
    phoneNumber?: string
    gender?: boolean
    roleId?: string
    createdBy?: string
    departmentId?: DepartmentEnum
    isActive?: boolean
    note?: string
    attachment?: File
    status?: number
    recruiterId?: string
    positionId?: PositionEnum
    skillId?: SkillEnum[]
    yearsOfExperience?: number
    highestLevelId?: HighestLevelEnum
}
