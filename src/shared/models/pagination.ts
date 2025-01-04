export interface PaginationRequest {
    pageSize: number
    pageIndex: number
}

export interface PaginatedSearchRequest {
    searchText?: string
    paginationRequest: PaginationRequest
}

export interface PaginationResult<T> {
    items?: T[]
    pageSize?: number
    pageIndex?: number
    totalRecords?: number
}
