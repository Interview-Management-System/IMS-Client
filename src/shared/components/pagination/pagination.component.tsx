import { Link } from 'react-router-dom'
import { PaginationResult } from '../../models/pagination'

interface PaginationProps<T> {
    paginationResult?: PaginationResult<T>
    onPageChange: (pageIndex: number) => void
}

function createRange(finish: number) {
    return Array.from({ length: finish }, (_, i) => i + 1)
}

function PaginationComponent<T>({ paginationResult, onPageChange }: PaginationProps<T>) {
    const totalRecords = paginationResult?.totalRecords
    const showNumber = (paginationResult?.pageIndex! - 1) * paginationResult?.pageSize! + 1
    const toNumber = showNumber + paginationResult?.items?.length! - 1

    const startIndex = 1
    const finishIndex = totalRecords ? Math.ceil(totalRecords / (paginationResult?.pageSize || 1)) : 1

    return (
        <div className='row justify-content-between'>
            {/* Show entries */}
            <div className='col-sm-12 col-md-5'>
                <div className='dataTables_info' role='status' aria-live='polite'>
                    <span>
                        Showing {showNumber} to {toNumber} of {totalRecords} entries
                    </span>
                </div>
            </div>

            {/* Paging */}
            <div className='col-sm-12 col-md-7'>
                <div className='dataTables_paginate paging_simple_numbers'>
                    <ul className='pagination justify-content-end'>
                        {paginationResult?.pageIndex !== startIndex && (
                            <>
                                <li className='page-item pe-auto' onClick={() => onPageChange(1)}>
                                    <Link className='page-link' title='1' to=''>
                                        First
                                    </Link>
                                </li>

                                <li
                                    className='page-item pe-auto'
                                    onClick={() => onPageChange((paginationResult?.pageIndex || 1) - 1)}
                                >
                                    <Link className='page-link' to=''>
                                        Previous
                                    </Link>
                                </li>
                            </>
                        )}

                        {createRange(finishIndex).map((item, index) => (
                            <li
                                key={index}
                                className={`page-item ${
                                    paginationResult?.pageIndex === item ? 'active' : ''
                                }`}
                            >
                                <Link className='page-link' onClick={() => onPageChange(item)} to=''>
                                    {item}{' '}
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
                                    onClick={() => onPageChange((paginationResult?.pageIndex || 1) + 1)}
                                >
                                    <Link className='page-link' to=''>
                                        Next
                                    </Link>
                                </li>

                                <li className='page-item' onClick={() => onPageChange(finishIndex)}>
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
