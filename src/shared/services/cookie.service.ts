import { Cookies } from 'react-cookie'
import { CookieSetOptions } from 'universal-cookie'

export default class CookieService {
    private static cookies = new Cookies()

    private static readonly cookieSetOptions: CookieSetOptions = {
        secure: true,
        sameSite: 'strict',
        domain: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }

    private static readonly decodedTokenToRoleURL =
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    private static readonly decodedTokenToIdURL =
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'

    /************************************************* JWT Token *************************************/
    static getTokenFromCookie() {
        return CookieService.cookies.get('token')
    }

    static setTokenToCookie(token: string) {
        CookieService.cookies.set('token', token, CookieService.cookieSetOptions)
    }

    static checkTokenIsExpired() {}

    /************************************************* User Id *************************************/
    static getCurrentUserIdFromCookie() {
        return CookieService.cookies.get('userId')
    }

    static setUserIdToCookie(userId: string) {
        CookieService.cookies.set('userId', userId, CookieService.cookieSetOptions)
    }

    /************************************************* Role *************************************/
    getRoleFromCookie() {}

    setRoleToCookie(role: string) {}

    /************************************************* Full name *************************************/
    getFullNameFromCookie() {}

    setFullNameToCookie(fullName: string) {}

    static removeAllCookie() {
        const allCookies = CookieService.cookies.getAll()

        for (const cookieName in allCookies) {
            CookieService.cookies.remove(cookieName, { path: '/' })
        }
    }
}
