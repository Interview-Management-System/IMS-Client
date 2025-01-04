import userApiService from '../../../api/services/user-api.service'
import { UserPaginatedSearchRequest } from '../models/user.model'

class UserService {
    async getUserListPaging(userPaginatedSearchRequest: UserPaginatedSearchRequest) {
        const apiResponse = await userApiService.getUserListPaging(userPaginatedSearchRequest)
        console.log(apiResponse)
    }

    async getCandidateList() {
        console.log('getCandidateList')
    }
}

const userService = new UserService()
export default userService
