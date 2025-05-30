import {
    JobPaginatedSearchRequest,
    JobPaginationRetrieveDTO
} from '../../modules/job/models/job-retrieve.model'
import { ApiResponse } from '../../shared/models/api-response'
import { PaginationResult } from '../../shared/models/pagination'
import { BaseApiService } from './base-api.service'

class JobApiService extends BaseApiService {
    getJobListPaging(request?: JobPaginatedSearchRequest) {
        return this.post<ApiResponse<PaginationResult<JobPaginationRetrieveDTO>>>('Job/pagination', request)
    }
}

const jobApiService = new JobApiService()
export default jobApiService
