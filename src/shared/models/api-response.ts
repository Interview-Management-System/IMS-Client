export interface ApiResponse<T> {
    data?: T
    message?: string
}

export interface ExceptionResponse {
    title?: string
    detail?: string
}
