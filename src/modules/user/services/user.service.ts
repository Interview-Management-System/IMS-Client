import { NavigateFunction } from 'react-router-dom'
import userApiService from '../../../api/services/user-api.service'
import SignalRService from '../../../shared/services/signalR.service'
import { UserForCreateDTO } from '../models/user.model'
import userStore from '../stores/user.store'

class UserService {
    private readonly signalRService = new SignalRService('/user-hub')

    constructor() {
        this.setupSignalListerners()
    }

    async getUserById(id: string) {
        const response = await userApiService.getUserById(id)
        userStore.setUserDetail(response?.data)
    }

    async getUserListPaging() {
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

    async createUser(data: UserForCreateDTO, navigate?: NavigateFunction) {
        const createSuccessfull = await userApiService.createUser(data)

        if (createSuccessfull) {
            setTimeout(() => {
                navigate?.(-1)
            }, 500)
        }
    }

    async changeUserRole(userId: string, roleId: string) {}

    private setupSignalListerners() {
        const handlers: { [key: string]: () => void } = {
            UserDelete: () => this.getUserListPaging(),
            UserStatusChange: () => this.getUserListPaging()
        }

        this.signalRService.registerSignalHandlers(handlers)
    }
}

const userService = new UserService()
export default userService
