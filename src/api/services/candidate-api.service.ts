import {
    CandidateForDetailRetrieveDTO,
    CandidateForPaginationRetrieveDTO,
    CandidatePaginatedSearchRequest
} from '../../modules/user/models/candidate.model'
import { ApiResponse } from '../../shared/models/api-response'
import { PaginationResult } from '../../shared/models/pagination'
import UserEndpoint from '../endpoints/user-endpoints'
import { BaseApiService } from './base-api.service'

class CandidateApiService extends BaseApiService {
    getCandidateListPaging(request?: CandidatePaginatedSearchRequest) {
        const url = UserEndpoint.CandidatePagingEndpoint
        return this.post<ApiResponse<PaginationResult<CandidateForPaginationRetrieveDTO>>>(url, request)
    }

    createCandidate(request?: FormData) {
        return this.post(UserEndpoint.CreateCandidateEndpoint, request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    getCandidateById(id: string) {
        return this.get<ApiResponse<CandidateForDetailRetrieveDTO>>(
            `${UserEndpoint.CandidateDetailEndpoint}/${id}`
        )
    }
}

const candidateApiService = new CandidateApiService()
export default candidateApiService
