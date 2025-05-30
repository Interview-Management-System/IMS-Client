import axios, { AxiosError } from 'axios'
import CookieService from 'shared/services/cookie.service'
import ToastUtility from 'shared/utils/toast.util'
import ApiHelper from './helpers/api.helper'

export const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use(
    config => {
        ToastUtility.displayLoading()

        // config.signal = new AbortController().signal
        config.headers.Authorization = `Bearer ${CookieService.getTokenFromCookie()}`
        return config
    },
    async (error: AxiosError) => {
        ToastUtility.displayErrorMessage((error.response?.data as any).detail)
        return await Promise.reject(error).catch(() => {})
    }
)

axiosClient.interceptors.response.use(
    response => {
        ApiHelper.handleSuccessResponse(response)
        return response.data
    },
    (error: AxiosError) => {
        ApiHelper.handleErrorResponse(error)
        return Promise.reject(error).catch(() => {})
    }
)

export default axiosClient
