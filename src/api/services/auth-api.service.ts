import { UserLoginRequest, UserLoginResponse } from '../../modules/auth/models/authentication.model'
import { ApiResponse } from '../../shared/models/api-response'
import AuthEndpoint from '../endpoints/auth-endpoints'
import { BaseApiService } from './base-api.service'

class AuthApiService extends BaseApiService {
    login(userLoginRequest: UserLoginRequest) {
        return this.post<ApiResponse<UserLoginResponse>>(AuthEndpoint.LOGIN, userLoginRequest)
    }
}

const authApiService = new AuthApiService()
export default authApiService
