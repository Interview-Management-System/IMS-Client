import {
    UserCreateDTO,
    UserDetailRetrieveDTO,
    UserPaginatedSearchRequest,
    UserPaginationRetrieveDTO,
    UserRetrieveDTO
} from '../../modules/user/models/user.model'
import { PaginationResult } from '../../shared/models/pagination'
import { ApiResponse } from './../../shared/models/api-response'
import { BaseApiService } from './base-api.service'

class UserApiService extends BaseApiService {
    getUserById(userId: string) {
        return this.get<ApiResponse<UserDetailRetrieveDTO>>(`User/detail/${userId}`)
    }

    getUserListPaging(request?: UserPaginatedSearchRequest) {
        return this.post<ApiResponse<PaginationResult<UserPaginationRetrieveDTO>>>('User/pagination', request)
    }

    deleteUserById(userIdList: string[]) {
        return this.patch(`User/delete`, userIdList)
    }

    activeUserById(userIdList: string[]) {
        return this.patch(`User/activate`, userIdList)
    }

    deActiveUserById(userIdList: string[]) {
        return this.patch(`User/de-activate`, userIdList)
    }

    createUser(data: UserCreateDTO) {
        return this.post('User/create', data)
    }

    getListRecruiter() {
        return this.get<ApiResponse<UserRetrieveDTO[]>>('User/recruiters')
    }
}

const userApiService = new UserApiService()
export default userApiService
