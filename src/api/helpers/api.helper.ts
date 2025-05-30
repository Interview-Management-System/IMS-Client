import { AxiosError, AxiosResponse } from 'axios'
import { ApiResponse, ExceptionResponse } from '../../shared/models/api-response'
import ToastUtility from '../../shared/utils/toast.util'

/**
 * A utility class for handling API responses and errors in a standardized way.
 *
 * Provides static methods to process successful and error responses from Axios requests,
 * displaying appropriate toast notifications to the user.
 *
 * @remarks
 * - Uses `ToastUtility` to show or hide loading indicators and display messages.
 * - Utilizes `ApiTypeChecker` to determine the structure of API responses.
 *
 * @example
 * ```typescript
 * ApiHelper.handleSuccessResponse(response);
 * ApiHelper.handleErrorResponse(error);
 * ```
 */
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

/**
 * Utility class for type-checking API response objects.
 *
 * @remarks
 * Provides static methods to determine if a given object matches the expected structure
 * of API responses or exception responses.
 */
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
