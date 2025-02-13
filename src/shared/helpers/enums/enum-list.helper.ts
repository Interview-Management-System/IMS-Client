import { CandidateStatusEnum } from '../../enums/entity-enums/candidate.enum'
import { InterviewResultEnum, InterviewStatusEnum } from '../../enums/entity-enums/interview.enum'
import { JobStatusEnum } from '../../enums/entity-enums/job.enum'
import {
    BenefitEnum,
    ContractTypeEnum,
    DepartmentEnum,
    GenderEnum,
    HighestLevelEnum,
    LevelEnum,
    PositionEnum,
    RoleEnum,
    RoleIdEnum,
    SkillEnum,
    UserStatusEnum
} from '../../enums/entity-enums/master-data.enum'
import { OfferStatusEnum } from '../../enums/entity-enums/offer.enum'
import { EnumBuilder } from '../../utils/enums/enum-builder.utils'

export class EnumList {
    static get candidateStatusList() {
        return EnumBuilder.generateEnumList(CandidateStatusEnum, Number)
    }

    static get benefitList() {
        return EnumBuilder.generateEnumList(BenefitEnum, Number)
    }

    static get contractTypeList() {
        return EnumBuilder.generateEnumList(ContractTypeEnum, Number)
    }

    static get highestLevelList() {
        return EnumBuilder.generateEnumList(HighestLevelEnum, Number)
    }

    static get LevelList() {
        return EnumBuilder.generateEnumList(LevelEnum, Number)
    }

    static get positionList() {
        return EnumBuilder.generateEnumList(PositionEnum, Number)
    }

    static get roleList() {
        return EnumBuilder.generateEnumList(RoleEnum, Number)
    }

    static get roleIdList() {
        return EnumBuilder.generateEnumList(RoleIdEnum, String)
    }

    static get skillList() {
        return EnumBuilder.generateEnumList(SkillEnum, Number)
    }

    static get offerList() {
        return EnumBuilder.generateEnumList(OfferStatusEnum, Number)
    }

    static get jobList() {
        return EnumBuilder.generateEnumList(JobStatusEnum, Number)
    }

    static get InterviewResultList() {
        return EnumBuilder.generateEnumList(InterviewResultEnum, Number)
    }

    static get InterviewStatusList() {
        return EnumBuilder.generateEnumList(InterviewStatusEnum, Number)
    }

    static get genderList() {
        return EnumBuilder.generateEnumList(GenderEnum, Boolean)
    }

    static get departmentList() {
        return EnumBuilder.generateEnumList(DepartmentEnum, Number)
    }

    static get statusList() {
        return EnumBuilder.generateEnumList(UserStatusEnum, Boolean)
    }
}
