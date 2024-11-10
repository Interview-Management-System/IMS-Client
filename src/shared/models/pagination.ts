export interface PaginationResult<T> {
    items?: T[]
    pageSize?: number
    pageIndex?: number
    totalRecords?: number
}
