import { NavigateFunction } from 'react-router-dom'
import userApiService from '../../../api/services/user-api.service'
import { PaginationResult } from '../../../shared/models/pagination'
import SignalRService from '../../../shared/services/signalR.service'
import { SignalEvent } from '../../../shared/utils/signalR.util'
import { UserCreateDTO, UserPaginationRetrieveDTO } from '../models/user.model'
import userStore from '../stores/user.store'

class UserService extends SignalRService {
    constructor() {
        super('/user-hub')
    }

    async autoInvokeOnConnect(): Promise<void> {
        const responseData = await this.invoke<PaginationResult<UserPaginationRetrieveDTO>>('UserPagination')
        userStore.setUserPageResult(responseData)
    }

    async getUserById(id: string) {
        const response = await userApiService.getUserById(id)
        userStore.setUserDetail(response?.data)
    }

    @SignalEvent('UserChange')
    async getUserListPaging() {
        console.log('getUserListPaging')

        const searchValue = userStore.userPaginationSearchValue
        const responseData = await userApiService.getUserListPaging(searchValue)

        userStore.setUserPageResult(responseData?.data)
    }

    async deleteUser(id: string) {
        await userApiService.deleteUserById(id)
    }

    async activateUser(id: string) {
        await userApiService.activeUserById(id)
    }

    async deActivateUser(id: string) {
        await userApiService.deActiveUserById(id)
    }

    async createUser(data: UserCreateDTO, navigate?: NavigateFunction) {
        const createSuccessfull = await userApiService.createUser(data)

        if (createSuccessfull) {
            setTimeout(() => {
                navigate?.(-1)
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
