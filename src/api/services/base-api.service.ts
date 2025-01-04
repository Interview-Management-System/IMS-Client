import { AxiosRequestConfig } from 'axios'
import { AbortSignalManager } from '../abort-signal-manager'
import axiosClient from '../axios/axios-config'

export class BaseApiService {
    protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.get(url, { ...config, signal: AbortSignalManager.signal })
    }

    protected post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.post(url, data, { ...config, signal: AbortSignalManager.signal })
    }

    protected put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.put(url, data, { ...config, signal: AbortSignalManager.signal })
    }

    protected patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.patch(url, data, { ...config, signal: AbortSignalManager.signal })
    }

    protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.delete(url, { ...config, signal: AbortSignalManager.signal })
    }
}
