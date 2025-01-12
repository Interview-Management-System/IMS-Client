import userApiService from '../../../api/services/user-api.service'
import { RoleEnum } from '../../../shared/enums/entity-enums/master-data.enum'
import { UserPaginatedSearchRequest } from '../models/user.model'
import userStore from '../stores/user.store'

class UserService {
    private readonly defaultSearchUserValue = {
        searchText: '',
        isLoadInActive: false,
        roleId: RoleEnum.Default,
        paginationRequest: { pageIndex: 1, pageSize: 5 }
    } as UserPaginatedSearchRequest

    async getUserListPaging(userPaginatedSearchRequest?: UserPaginatedSearchRequest) {
        const request = userPaginatedSearchRequest ?? this.defaultSearchUserValue

        const apiResponse = await userApiService.getUserListPaging(request)
        userStore.setUserPageResult(apiResponse?.data)
    }

    async deleteUserById(id: string) {
        // getUserListPaging({})
    }
}

const userService = new UserService()
export default userService
