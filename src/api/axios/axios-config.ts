import axios, { AxiosError } from 'axios'
import ToastUtility from '../../shared/utils/toast.util'
import TokenUtils from '../../shared/utils/tokens/token.utils'
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

        config.headers.Authorization = `Bearer ${TokenUtils.getTokenFromCookie()}`
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
