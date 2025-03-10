import { JobStatusEnum } from '../../../shared/enums/entity-enums/job.enum'

export interface BaseJobDTO {
    title?: string
    description?: string
    workingAddress?: string
    datePeriod?: DatePeriod
    salaryRange?: SalaryRange
}

export interface JobStatus {
    jobStatusId?: JobStatusEnum
    status?: string
}

export interface SalaryRange {
    from: number
    to: number
}

export interface DatePeriod {
    endDate?: Date
    startDate?: Date
}
