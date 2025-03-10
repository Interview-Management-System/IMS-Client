import {
    JobPaginatedSearchRequest,
    JobPaginationRetrieveDTO
} from '../../modules/job/models/job-retrieve.model'
import { ApiResponse } from '../../shared/models/api-response'
import { PaginationResult } from '../../shared/models/pagination'
import JobEndpoint from '../endpoints/job-endpoint'
import { BaseApiService } from './base-api.service'

class JobApiService extends BaseApiService {
    getJobListPaging(request?: JobPaginatedSearchRequest) {
        const url = JobEndpoint.JobPagingEndpoint
        return this.post<ApiResponse<PaginationResult<JobPaginationRetrieveDTO>>>(url, request)
    }
}

const jobApiService = new JobApiService()
export default jobApiService
