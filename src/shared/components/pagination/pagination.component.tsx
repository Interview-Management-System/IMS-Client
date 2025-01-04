import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePagination from '../../hooks/usePagination'
import { PaginationResult } from '../../models/pagination'

interface PaginationProps<T> {
    paginationResult?: PaginationResult<T>
    onPageIndexChange: (pageIndex: number) => void
    onPageSizeChange: (pageSize: number) => void
}

function createRange(finish: number) {
    return Array.from({ length: finish }, (_, i) => i + 1)
}

function PaginationComponent<T>({
    paginationResult,
    onPageIndexChange,
    onPageSizeChange
}: PaginationProps<T>) {
    const pageResult = usePagination(paginationResult!)

    const startIndex = 1
    const pageSize = pageResult?.pageSize ?? 0
    const totalRecords = pageResult?.totalRecords || 0
    const showNumber = (pageResult?.pageIndex! - 1) * pageSize + 1
    const toNumber = Math.min(showNumber + (pageResult?.items?.length || 0) - 1, totalRecords)

    const [finishIndex, setFinishIndex] = useState<number>(
        totalRecords ? Math.max(1, Math.ceil(totalRecords / (pageSize || 1))) : 1
    )

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPageSize = parseInt(e.target.value, 10)

        onPageSizeChange(newPageSize)
        onPageIndexChange(1)

        const newFinishIndex = totalRecords ? Math.max(1, Math.ceil(totalRecords / newPageSize)) : 1
        setFinishIndex(newFinishIndex)
    }

    return (
        <div className='row justify-content-between'>
            {/* Show entries */}
            <div className='col-sm-12 col-md-6 d-flex'>
                <div className='dataTables_length' id='dataTable_length'>
                    <select
                        name='dataTable_length'
                        aria-controls='dataTable'
                        onChange={handlePageSizeChange}
                        className='custom-select custom-select-sm form-control form-control-sm'
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                <div className='dataTables_info ms-2' role='status' aria-live='polite'>
                    <span>
                        Showing {showNumber} to {toNumber} of {totalRecords} entries
                    </span>
                </div>
            </div>

            {/* Paging */}
            <div className='col-sm-12 col-md-6'>
                <div className='dataTables_paginate paging_simple_numbers'>
                    <ul className='pagination justify-content-end'>
                        {paginationResult?.pageIndex !== startIndex && (
                            <>
                                <li className='page-item' onClick={() => onPageIndexChange(1)}>
                                    <Link className='page-link' to=''>
                                        First
                                    </Link>
                                </li>

                                <li
                                    className='page-item'
                                    onClick={() => onPageIndexChange((paginationResult?.pageIndex || 1) - 1)}
                                >
                                    <Link className='page-link' to=''>
                                        Previous
                                    </Link>
                                </li>
                            </>
                        )}

                        {createRange(finishIndex).map(item => (
                            <li
                                key={item}
                                className={`page-item ${
                                    paginationResult?.pageIndex === item ? 'active' : ''
                                }`}
                            >
                                <Link className='page-link' onClick={() => onPageIndexChange(item)} to=''>
                                    {item}
                                    {paginationResult?.pageIndex === item && (
                                        <span className='sr-only'>(current)</span>
                                    )}
                                </Link>
                            </li>
                        ))}

                        {paginationResult?.pageIndex !== finishIndex && (
                            <>
                                <li
                                    className='page-item'
                                    onClick={() => onPageIndexChange((paginationResult?.pageIndex || 1) + 1)}
                                >
                                    <Link className='page-link' to=''>
                                        Next
                                    </Link>
                                </li>

                                <li className='page-item' onClick={() => onPageIndexChange(finishIndex)}>
                                    <Link className='page-link' to=''>
                                        End
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PaginationComponent
