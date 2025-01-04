import {
    DepartmentEnum,
    HighestLevelEnum,
    PositionEnum,
    SkillEnum
} from '../../../shared/enums/entity-enums/master-data.enum'

interface BaseCandidate {
    username?: string
    email?: string
    dob?: Date | null
    address?: string
    phoneNumber?: string
}

export interface CreateCandidateRequest extends BaseCandidate {
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

export interface CandidateForRetrieveDTO extends BaseCandidate {
    id: string
    createAt?: Date
    updatedBy?: string
    gender?: string
    role?: string
    department?: string
    status?: string
    isDeleted?: boolean
    note?: string
    yearsOfExperience?: number
    recruiterName?: string
    position?: string
    highestLevel?: string
    candidateStatus?: string
    offers?: string[]
    skills?: string[]
}
