import { UserLoginRequest, UserLoginResponse } from '../../modules/auth/models/authentication.model'
import { ApiResponse } from '../../shared/models/api-response'
import { BaseApiService } from './base-api.service'

class AuthApiService extends BaseApiService {
    login(userLoginRequest: UserLoginRequest) {
        return this.post<ApiResponse<UserLoginResponse>>('Authentication/login', userLoginRequest)
    }
}

const authApiService = new AuthApiService()
export default authApiService
