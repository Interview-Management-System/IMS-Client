class TokenUtils {
    private expiration = 0
    private readonly domain = '/'

    private readonly decodedTokenToRoleURL = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    private readonly decodedTokenToIdURL =
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'

    /************************************************* JWT Token *************************************/
    getTokenFromCookie() {}

    setTokenToCookie(token: string) {}

    /************************************************* User Id *************************************/
    getCurrentUserIdFromCookie() {
        return ''
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

const tokenUtils = new TokenUtils()
export default tokenUtils
