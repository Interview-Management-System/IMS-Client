import userApiService from 'api/services/user-api.service'
import type { PaginationResult } from 'shared/models/pagination'
import SignalRService from 'shared/services/signalR.service'
import tableActionStore from 'shared/stores/table-action.store'
import NavigationUtil from 'shared/utils/navigation.utils'
import { AutoInvoke, SignalEvent } from 'shared/utils/signalR.util'
import { UserCreateDTO, UserPaginationRetrieveDTO } from '../models/user.model'
import userStore from '../stores/user.store'

export class UserService extends SignalRService {
    constructor() {
        super('/user-hub')
    }

    @AutoInvoke('UserPagination')
    private handleUserPage(data: PaginationResult<UserPaginationRetrieveDTO>) {
        userStore.setUserPageResult(data)
    }

    async getUserById(id: string) {
        const response = await userApiService.getUserById(id)
        userStore.setUserDetail(response?.data)
    }

    @SignalEvent('UserChange')
    async getUserListPaging() {
        const searchValue = userStore.userPaginationSearchValue
        const responseData = await userApiService.getUserListPaging(searchValue)

        userStore.setUserPageResult(responseData?.data)
    }

    async deleteUser() {
        const userIds = tableActionStore.selectedRowKeys as string[]

        if (userIds.length > 0) {
            await userApiService.deleteUserById(userIds)
        }
    }

    async activateUser() {
        const userIds = tableActionStore.selectedRowKeys as string[]

        if (userIds.length > 0) {
            await userApiService.activeUserById(userIds)
        }
    }

    async deActivateUser() {
        const userIds = tableActionStore.selectedRowKeys as string[]

        if (userIds.length > 0) {
            await userApiService.deActiveUserById(userIds)
        }
    }

    async createUser(data: UserCreateDTO) {
        const createSuccessfull = await userApiService.createUser(data)

        if (createSuccessfull) {
            setTimeout(() => {
                NavigationUtil.goBack()
            }, 500)
        }
    }

    async changeUserRole(userId: string, roleId: string) {}

    async getListRecruiter() {
        const response = await userApiService.getListRecruiter()
        userStore.setListRecruiter(response?.data)
    }
}

const userService = new UserService()
export default userService
