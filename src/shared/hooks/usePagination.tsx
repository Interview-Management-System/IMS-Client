import { AxiosResponse } from 'axios'
import { useCallback, useMemo, useState } from 'react'
import { PaginationResult } from '../models/pagination'

export default function usePagination<T>(
    paginationResult: PaginationResult<T>,
    fetchData?: () => Promise<AxiosResponse<any, any>>
) {
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(paginationResult.pageSize ?? 5)

    const paginatedItems = useMemo(() => {
        const start = (pageIndex - 1) * pageSize
        const end = pageIndex * pageSize
        return paginationResult.items?.slice(start, end) || []
    }, [pageIndex, pageSize, paginationResult.items])

    const handlePageIndexChange = useCallback(
        (newPageIndex: number) => {
            setPageIndex(newPageIndex)
            fetchData?.()
        },
        [fetchData]
    )

    const handlePageSizeChange = useCallback(
        (newPageSize: number) => {
            setPageSize(newPageSize)
            setPageIndex(1)
            fetchData?.()
        },
        [fetchData]
    )

    return {
        pageIndex,
        items: paginatedItems,
        pageSize: paginationResult.pageSize,
        totalRecords: paginationResult.totalRecords,
        handlePageSizeChange,
        handlePageIndexChange
    }
}
