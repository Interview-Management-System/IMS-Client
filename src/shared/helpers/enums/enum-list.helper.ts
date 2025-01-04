import { CandidateStatusEnum } from '../../enums/entity-enums/candidate.enum'
import { InterviewResultEnum, InterviewStatusEnum } from '../../enums/entity-enums/interview.enum'
import { JobStatusEnum } from '../../enums/entity-enums/job.enum'
import {
    BenefitEnum,
    ContractTypeEnum,
    GenderEnum,
    HighestLevelEnum,
    LevelEnum,
    PositionEnum,
    RoleEnum,
    SkillEnum
} from '../../enums/entity-enums/master-data.enum'
import { OfferStatusEnum } from '../../enums/entity-enums/offer.enum'
import { EnumBuilder } from '../../utils/enums/enum-builder.utils'

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
