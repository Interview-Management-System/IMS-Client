import axios, { AxiosError } from 'axios'
import CookieService from '../../shared/services/cookie.service'
import ToastUtility from '../../shared/utils/toast.util'
import ApiHelper from '../helpers/api.helper'

const axiosClient = axios.create({
    baseURL: 'https://localhost:7139/api',
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use(
    config => {
        ToastUtility.displayLoading()

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
    async (error: AxiosError) => {
        ApiHelper.handleErrorResponse(error)
        return await Promise.reject(error).catch(() => {})
    }
)

export default axiosClient
