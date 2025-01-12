import { jwtDecode } from 'jwt-decode'
import { Cookies } from 'react-cookie'
import { CookieSetOptions } from 'universal-cookie'

export default class CookieService {
    private static readonly cookies = new Cookies()
    private static readonly cookieOptions = {
        path: '/',
        expires: new Date()
    } as CookieSetOptions

    private static readonly roleDecoderURL = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    private static readonly userNameDecoderURL = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    private static readonly userIdDecoderURL =
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'

    /************************************************* JWT Token *************************************/
    static getTokenFromCookie() {
        return CookieService.cookies.get('token')
    }

    static setTokenToCookie(token?: string) {
        if (token) {
            const decodedToken = jwtDecode(token)

            CookieService.cookieOptions.expires = new Date(decodedToken.exp!)
            CookieService.cookies.set('token', token, CookieService.cookieOptions)
        }
    }

    static getCurrentUserIdFromCookie(): string {
        const token = CookieService.getTokenFromCookie()

        if (token) {
            const decodedToken: any = jwtDecode(token)
            return decodedToken[CookieService.userIdDecoderURL]
        }
        return ''
    }

    static getRoleFromCookie() {
        const token = CookieService.getTokenFromCookie()
        const decodedToken = jwtDecode(token) as any

        return decodedToken[CookieService.roleDecoderURL]
    }

    static getFullNameFromCookie() {
        const token = CookieService.getTokenFromCookie()
        const decodedToken = jwtDecode(token) as any

        return decodedToken[CookieService.userNameDecoderURL]
    }

    static checkTokenIsExpired() {
        const token = this.getTokenFromCookie()
        if (token) {
            const decoded = jwtDecode(token)

            const expirationDate = new Date(0)
            expirationDate.setUTCHours(decoded.exp ?? 0)

            return expirationDate === null ? true : expirationDate < new Date()
        }
        return false
    }

    static removeAllCookie() {
        const allCookies = CookieService.cookies.getAll()
        const cookieArray = Object.keys(allCookies)

        cookieArray.forEach(cookieName => {
            CookieService.cookies.remove(cookieName, { path: '/' })
        })
    }
}
