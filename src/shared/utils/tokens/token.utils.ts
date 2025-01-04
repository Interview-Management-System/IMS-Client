import { Cookies } from 'react-cookie'

export default class TokenUtils {
    private expiration = 0
    private readonly domain = '/'

    private readonly decodedTokenToRoleURL = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    private readonly decodedTokenToIdURL =
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'

    private static cookies = new Cookies()

    /************************************************* JWT Token *************************************/
    static getTokenFromCookie() {
        return TokenUtils.cookies.get('token')
    }

    setTokenToCookie(token: string) {}

    /************************************************* User Id *************************************/
    static getCurrentUserIdFromCookie() {
        return 'testUserId'
    }

    setUserIdToCookie(userId: string) {}

    /************************************************* Role *************************************/
    getRoleFromCookie() {}

    setRoleToCookie(role: string) {}

    /************************************************* Full name *************************************/
    getFullNameFromCookie() {}

    setFullNameToCookie(fullName: string) {}

    removeAllCookie() {}

    checkTokenIsExpired() {}
}
