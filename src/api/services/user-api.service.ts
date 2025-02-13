import {
    UserForCreateDTO,
    UserForDetailRetrieveDTO,
    UserForPaginationRetrieveDTO,
    UserForRetrieveDTO,
    UserPaginatedSearchRequest
} from '../../modules/user/models/user.model'
import { PaginationResult } from '../../shared/models/pagination'
import UserEndpoint from '../endpoints/user-endpoints'
import { ApiResponse } from './../../shared/models/api-response'
import { BaseApiService } from './base-api.service'

class UserApiService extends BaseApiService {
    getUserById(userId: string) {
        return this.get<ApiResponse<UserForDetailRetrieveDTO>>(`${UserEndpoint.DetailEndpoint}/${userId}`)
    }

    getUserListPaging(request?: UserPaginatedSearchRequest) {
        const url = UserEndpoint.UserPagingEndpoint
        return this.post<ApiResponse<PaginationResult<UserForPaginationRetrieveDTO>>>(url, request)
    }

    deleteUserById(userId: string) {
        return this.delete(`${UserEndpoint.DeleteEndpoint}/${userId}`)
    }

    activeUserById(userId: string) {
        return this.patch(`${UserEndpoint.ActivateEndpoint}/${userId}`)
    }

    deActiveUserById(userId: string) {
        return this.patch(`${UserEndpoint.DeActivateEndpoint}/${userId}`)
    }

    createUser(data: UserForCreateDTO) {
        return this.post(UserEndpoint.CreateUserEndpoint, data)
    }

    getListRecruiter() {
        return this.get<ApiResponse<UserForRetrieveDTO[]>>(UserEndpoint.ListRecruiterEndpoint)
    }
}

const userApiService = new UserApiService()
export default userApiService
