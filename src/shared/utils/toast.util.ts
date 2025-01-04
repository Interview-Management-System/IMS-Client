import { toast, ToastOptions } from 'react-toastify'

export default class ToastUtility {
    private static requestCount = 0
    private static loadingToastId: string | number | null = null
    private static toastOption = { pauseOnHover: false } as ToastOptions

    static displaySuccessMessage(message: string) {
        if (message) {
            toast.success(message, ToastUtility.toastOption)
        }
    }

    static displayErrorMessage(message: string) {
        if (message) {
            toast.error(message, ToastUtility.toastOption)
        }
    }

    static displayLoading() {
        ToastUtility.requestCount++

        if (ToastUtility.requestCount > 0 && !ToastUtility.loadingToastId) {
            ToastUtility.loadingToastId = toast.loading('Loading...', {
                pauseOnHover: false,
                autoClose: false,
                closeOnClick: false,
                position: 'top-center'
            })
        }
    }

    static hideLoading() {
        ToastUtility.requestCount--

        if (ToastUtility.requestCount === 0 && ToastUtility.loadingToastId) {
            toast.dismiss(ToastUtility.loadingToastId)
            ToastUtility.loadingToastId = null
        }
    }
}
