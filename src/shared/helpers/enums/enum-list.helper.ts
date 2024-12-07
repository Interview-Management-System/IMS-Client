import { CandidateStatusEnum } from '../../enums/candidate.enum'
import { JobStatusEnum } from '../../enums/job.enum'
import {
    BenefitEnum,
    ContractTypeEnum,
    GenderEnum,
    HighestLevelEnum,
    LevelEnum,
    PositionEnum,
    RoleEnum,
    SkillEnum
} from '../../enums/master-data.enum'
import { OfferStatusEnum } from '../../enums/offer.enum'
import { EnumBuilder } from '../../utils/enums/enum-builder.utils'
import { InterviewResultEnum, InterviewStatusEnum } from './../../enums/interview.enum'

export class EnumList {
    static get candidateStatusList() {
        return EnumBuilder.generateEnumList(CandidateStatusEnum)
    }

    static get benefitList() {
        return EnumBuilder.generateEnumList(BenefitEnum)
    }

    static get contractTypeList() {
        return EnumBuilder.generateEnumList(ContractTypeEnum)
    }

    static get highestLevelList() {
        return EnumBuilder.generateEnumList(HighestLevelEnum)
    }

    static get LevelList() {
        return EnumBuilder.generateEnumList(LevelEnum)
    }

    static get positionList() {
        return EnumBuilder.generateEnumList(PositionEnum)
    }

    static get roleList() {
        return EnumBuilder.generateEnumList(RoleEnum)
    }

    static get skillList() {
        return EnumBuilder.generateEnumList(SkillEnum)
    }

    static get offerList() {
        return EnumBuilder.generateEnumList(OfferStatusEnum)
    }

    static get jobList() {
        return EnumBuilder.generateEnumList(JobStatusEnum)
    }

    static get InterviewResultList() {
        return EnumBuilder.generateEnumList(InterviewResultEnum)
    }

    static get InterviewStatusList() {
        return EnumBuilder.generateEnumList(InterviewStatusEnum)
    }

    static get genderList() {
        return EnumBuilder.generateEnumList(GenderEnum)
    }
}
