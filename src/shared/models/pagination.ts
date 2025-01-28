export interface PaginationRequest {
    pageSize?: number
    pageIndex?: number
}

export interface PaginatedSearchRequest {
    searchText?: string
    isLoadInActive?: boolean
    paginationRequest: PaginationRequest
    sortCriteria?: SortCriteria | null
}

export interface PaginationResult<T> {
    items?: T[]
    pageSize?: number
    pageIndex?: number
    totalRecords?: number
}

export interface SortCriteria {
    isAscending?: boolean
    sortProperty?: string
}
