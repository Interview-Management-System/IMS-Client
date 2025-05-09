import authApiService from '../../../api/services/auth-api.service'
import { BaseApiService } from '../../../api/services/base-api.service'
import { UserLoginRequest } from '../models/authentication.model'

class AuthService extends BaseApiService {
    async login(userLoginRequest: UserLoginRequest) {
        const response = await authApiService.login(userLoginRequest)
        // CookieService.setTokenToCookie(response?.data?.token)
    }
}

const authService = new AuthService()
export default authService
