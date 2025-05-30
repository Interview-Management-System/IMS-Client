import {
    CandidateForDetailRetrieveDTO,
    CandidateForPaginationRetrieveDTO,
    CandidatePaginatedSearchRequest
} from '../../modules/user/models/candidate.model'
import { ApiResponse } from '../../shared/models/api-response'
import { PaginationResult } from '../../shared/models/pagination'
import { BaseApiService } from './base-api.service'

class CandidateApiService extends BaseApiService {
    getCandidateListPaging(request?: CandidatePaginatedSearchRequest) {
        return this.post<ApiResponse<PaginationResult<CandidateForPaginationRetrieveDTO>>>(
            'Candidate/pagination',
            request
        )
    }

    createCandidate(request?: FormData) {
        return this.post('Candidate/create', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    getCandidateById(id: string) {
        return this.get<ApiResponse<CandidateForDetailRetrieveDTO>>(`Candidate/detail/${id}`)
    }
}

const candidateApiService = new CandidateApiService()
export default candidateApiService
