import { CandidateStatusEnum } from '../../../shared/enums/entity-enums/candidate.enum'
import { HighestLevelEnum, PositionEnum } from '../../../shared/enums/entity-enums/master-data.enum'
import { PersonalInformation } from './base-user.model'

export interface BaseCandidateDTO {
    note?: string
    personalInformation?: PersonalInformation
}

export interface ProfessionalInformation {
    recruiterId: string
    yearsOfExperience: number
    positionId: PositionEnum
    highestLevelId: HighestLevelEnum
    candidateStatusId: CandidateStatusEnum
}
