import { AxiosError, AxiosResponse } from 'axios'
import { ApiResponse, ExceptionResponse } from '../../shared/models/api-response'
import ToastUtility from '../../shared/utils/toast.util'

export default class ApiHelper {
    static handleSuccessResponse(response: AxiosResponse) {
        const responseData = response.data

        const message = ApiTypeChecker.isApiResponse<unknown>(responseData)
            ? responseData.message ?? ''
            : (responseData as string)

        ToastUtility.hideLoading()
        ToastUtility.displaySuccessMessage(message)
    }

    static handleErrorResponse(error: AxiosError) {
        console.error(error)

        const errorResponseData = error.response?.data
        const isExceptionResponse = ApiTypeChecker.isExceptionResponse(errorResponseData)

        let errorMessage = ''

        if (isExceptionResponse) {
            errorMessage = (errorResponseData as ExceptionResponse)?.detail ?? 'An error occurred'
        } else {
            switch (error.code) {
                case AxiosError.ERR_NETWORK:
                case AxiosError.ECONNABORTED:
                case AxiosError.ERR_INVALID_URL:
                    errorMessage = error.message
                    break
            }
        }

        ToastUtility.hideLoading()
        ToastUtility.displayErrorMessage(errorMessage)
    }
}

/** Use for checking type of response then handle appropriately */
class ApiTypeChecker {
    static isExceptionResponse(obj: any): obj is ExceptionResponse {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            (obj.title === undefined || typeof obj.title === 'string') &&
            (obj.detail === undefined || typeof obj.detail === 'string')
        )
    }

    static isApiResponse<T>(obj: any): obj is ApiResponse<T> {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            (obj.data === undefined || obj.data !== undefined) &&
            (obj.message === undefined || typeof obj.message === 'string')
        )
    }
}
