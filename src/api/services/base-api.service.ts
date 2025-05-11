import { AxiosRequestConfig } from 'axios'
import axiosClient from '../axios/axios-config'

export class BaseApiService {
    protected get<T>(url: string, config?: AxiosRequestConfig) {
        return axiosClient.get<any, T>(url, { ...config })
    }

    protected post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
        return axiosClient.post<any, T>(url, data, { ...config })
    }

    protected put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
        return axiosClient.put<any, T>(url, data, { ...config })
    }

    protected patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
        return axiosClient.patch<any, T>(url, data, { ...config })
    }

    protected delete<T>(url: string, config?: AxiosRequestConfig) {
        return axiosClient.delete<any, T>(url, { ...config })
    }
}
