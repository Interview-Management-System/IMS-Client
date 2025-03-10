import { makeAutoObservable } from 'mobx'
import { PaginationResult } from '../../../shared/models/pagination'
import { JobPaginatedSearchRequest, JobPaginationRetrieveDTO } from '../../job/models/job-retrieve.model'

class JobStore {
    jobPageResult = { items: [{ id: 'adsf' }] } as PaginationResult<JobPaginationRetrieveDTO>
    jobPaginationSearchValue: JobPaginatedSearchRequest | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    setJobPaginationSearchValue(searchValue: JobPaginatedSearchRequest) {
        this.jobPaginationSearchValue = searchValue
    }

    resetJobPaginationSearchValue() {
        this.jobPaginationSearchValue = undefined
    }

    setJobPageResult(jobPageResult?: PaginationResult<JobPaginationRetrieveDTO>) {
        this.jobPageResult = jobPageResult ?? {}
    }
}

const jobStore = new JobStore()
export default jobStore
