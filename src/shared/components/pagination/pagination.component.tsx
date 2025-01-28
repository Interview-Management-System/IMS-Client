import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { PaginationResult } from '../../models/pagination'
import '../pagination/pagination.scss'

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
    const [finishIndex, setFinishIndex] = useState(1)
    const pageSize = paginationResult?.pageSize ?? 0
    const pageIndex = paginationResult?.pageIndex ?? 0
    const totalRecords = paginationResult?.totalRecords || 0
    const showNumber = (pageIndex - 1) * pageSize + 1
    const toNumber = Math.min(showNumber + pageSize - 1, totalRecords)

    useEffect(() => {
        const newFinishIndex = totalRecords ? Math.ceil(totalRecords / (pageSize || 1)) : 1
        setFinishIndex(newFinishIndex)
    }, [totalRecords, pageSize])

    function handlePageIndexChange(newPageIndex: number) {
        if (newPageIndex !== pageIndex) {
            onPageIndexChange(newPageIndex)
        }
    }

    function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newPageSize = parseInt(e.target.value, 10)
        onPageSizeChange(newPageSize)

        const newFinishIndex = totalRecords ? Math.ceil(totalRecords / newPageSize) : 1
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
                        className='custom-select-sm form-control form-control-sm'
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

            {/* Pagination */}
            <div className='col-sm-12 col-md-6'>
                <div className='dataTables_paginate paging_simple_numbers'>
                    {totalRecords > 0 && (
                        <ul className='pagination justify-content-end'>
                            {pageIndex !== 1 && (
                                <>
                                    <li className='page-item' onClick={() => handlePageIndexChange(1)}>
                                        <Button className='page-link no-radius' type='button'>
                                            First
                                        </Button>
                                    </li>

                                    <li
                                        className='page-item'
                                        onClick={() => handlePageIndexChange((pageIndex || 1) - 1)}
                                    >
                                        <Button className='page-link no-radius' type='button'>
                                            Previous
                                        </Button>
                                    </li>
                                </>
                            )}

                            {createRange(finishIndex).map(item => (
                                <li key={item} className={`page-item ${pageIndex === item ? 'active' : ''}`}>
                                    <Button
                                        type='button'
                                        className='page-link no-radius'
                                        onClick={() => handlePageIndexChange(item)}
                                    >
                                        {item}
                                        {pageIndex === item && <span className='sr-only'>(current)</span>}
                                    </Button>
                                </li>
                            ))}

                            {pageIndex !== finishIndex && (
                                <>
                                    <li
                                        className='page-item'
                                        onClick={() => handlePageIndexChange((pageIndex || 1) + 1)}
                                    >
                                        <Button className='page-link no-radius' type='button'>
                                            Next
                                        </Button>
                                    </li>

                                    <li
                                        className='page-item'
                                        onClick={() => handlePageIndexChange(finishIndex)}
                                    >
                                        <Button className='page-link no-radius' type='button'>
                                            End
                                        </Button>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PaginationComponent
