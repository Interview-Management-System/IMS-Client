import { JobStatusEnum } from '../../../shared/enums/entity-enums/job.enum'
import { AuditInformation } from '../../../shared/models/base-dto'
import { PaginatedSearchRequest } from '../../../shared/models/pagination'
import { BaseJobDTO, JobStatus } from './base-job.model'

export interface JobRetrieveDTO extends BaseJobDTO {
    id: string
    isDeleted: boolean
    levels: string[]
    jobStatus?: JobStatus
    requiredSkills: string[]
}

export interface JobPaginationRetrieveDTO extends JobRetrieveDTO {}

export interface JobOpenRetrieveDTO {
    id: string
    title?: string
}

export interface JobDetailRetrieveDTO extends JobRetrieveDTO {
    benefits: string[]
    auditInformation?: AuditInformation
}

export interface JobPaginatedSearchRequest extends PaginatedSearchRequest {
    jobStatusId?: JobStatusEnum
}
