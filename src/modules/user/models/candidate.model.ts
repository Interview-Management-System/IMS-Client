import { CandidateStatusEnum } from '../../../shared/enums/entity-enums/candidate.enum'
import {
    HighestLevelEnum,
    PositionEnum,
    SkillEnum
} from '../../../shared/enums/entity-enums/master-data.enum'
import { AuditInformation } from '../../../shared/models/base-dto'
import { PaginatedSearchRequest } from '../../../shared/models/pagination'
import { ProfessionalInformation } from './base-candidate.model'
import { BaseUserDTO, UserStatus } from './base-user.model'

export interface CandidateForCreateDTO extends BaseUserDTO {
    attachment?: File
    //public SkillsEnum[] SkillId { get; set; } = [];
    skillList?: SkillEnum[]
    professionalInformation?: ProfessionalInformation
}

export interface CandidateForRetrieveDTO extends BaseUserDTO {
    id: string
}

export interface CandidateForUpdateDTO {
    id: string
    dob?: Date
    note?: string
    email?: string
    address?: string
    gender?: boolean
    username?: string
    attachment?: File
    recruiterId?: string
    phoneNumber?: string
    skillId?: SkillEnum[]
    positionId?: PositionEnum
    yearsOfExperience?: number
    highestLevelId?: HighestLevelEnum
}

/////////////////

export interface CandidateForDetailRetrieveDTO extends CandidateForRetrieveDTO {
    gender?: string
    offers: string[]
    position?: string
    skills?: string[]
    attachment?: string[]
    highestLevel?: string
    candidateStatus?: string
    auditInformation?: AuditInformation
    professionalInformation?: ProfessionalInformation
}

export interface CandidateForPaginationRetrieveDTO {
    id: string
    email?: string
    isDeleted: boolean
    ownerHr?: string
    username?: string
    phoneNumber?: string
    currentPosition?: string
    candidateStatus?: string
    userStatus?: UserStatus
}

export interface CandidatePaginatedSearchRequest extends PaginatedSearchRequest {
    statusId?: CandidateStatusEnum
}
