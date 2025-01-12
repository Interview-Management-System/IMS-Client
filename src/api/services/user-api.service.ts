import { UserForRetrieveDTO, UserPaginatedSearchRequest } from '../../modules/user/models/user.model'
import { ApiResponse } from '../../shared/models/api-response'
import { PaginationResult } from '../../shared/models/pagination'
import UserEndpoint from '../endpoints/user-endpoints'
import { BaseApiService } from './base-api.service'

class UserApiService extends BaseApiService {
    getUserListPaging(userPaginatedSearchRequest: UserPaginatedSearchRequest) {
        const url = UserEndpoint.USER_PAGING
        return this.post<ApiResponse<PaginationResult<UserForRetrieveDTO>>>(url, userPaginatedSearchRequest)
    }
}

const userApiService = new UserApiService()
export default userApiService
