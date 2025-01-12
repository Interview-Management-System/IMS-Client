import { useCallback, useState } from 'react'
import { PaginationResult } from '../models/pagination'

export default function usePagination<T>(paginationResult: PaginationResult<T>) {
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(paginationResult.pageSize ?? 5)

    const handlePageIndexChange = useCallback((newPageIndex: number) => {
        setPageIndex(newPageIndex)
    }, [])

    const handlePageSizeChange = useCallback((newPageSize: number) => {
        setPageSize(newPageSize)
        setPageIndex(1)
    }, [])

    return {
        pageIndex,
        items: paginationResult.items,
        pageSize: pageSize,
        totalRecords: paginationResult.totalRecords,
        handlePageSizeChange,
        handlePageIndexChange
    }
}
