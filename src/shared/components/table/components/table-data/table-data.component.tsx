import { faArrowDownAZ, faArrowUpAZ, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useEffect, useRef, useState } from 'react'
import { Table } from 'react-bootstrap'
import { TableColumn, TableDataProps } from '../../../../models/table-config'
import './table-data.scss'

function displayColumnValue<T>(obj: T, path: string): any {
    return path.split('.').reduce((acc: any, key) => acc?.[key], obj) ?? ''
}

function TableDataComponent<T>({
    paginationResult,
    onSortChange,
    columns,
    renderActions
}: TableDataProps<T>) {
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [isAscending, setIsAscending] = useState<boolean>(true)

    const pageSize = paginationResult?.pageSize
    const pageIndex = paginationResult?.pageIndex
    const tableItems = paginationResult?.items ?? []

    function handleSort(column: TableColumn<T>) {
        if (!column.sortable || !column.accessor) return

        const sortKey = String(column.accessor)
        let newIsAscending = true

        if (sortColumn === sortKey) {
            newIsAscending = !isAscending
        }

        setSortColumn(sortKey)
        setIsAscending(newIsAscending)

        onSortChange(sortKey, newIsAscending)
    }

    function getSortIcon(column: TableColumn<T>) {
        if (!column.sortable) return null
        if (column.accessor !== sortColumn) return <FontAwesomeIcon icon={faSort} size='1x' /> // Default sort icon
        return <FontAwesomeIcon icon={isAscending ? faArrowUpAZ : faArrowDownAZ} size='1x' />
    }

    // Select all logic
    const selectAllRef = useRef<HTMLInputElement>(null)
    const [selectedRows, setSelectedRows] = useState<number[]>([])

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate =
                selectedRows.length > 0 && selectedRows.length < tableItems.length
        }
    }, [selectedRows, tableItems.length])

    function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            console.log(selectedRows)

            setSelectedRows(tableItems.map((_, idx) => idx))
        } else {
            setSelectedRows([])
        }
    }

    function handleRowSelect(idx: number) {
        setSelectedRows(prev => (prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]))

        console.log(selectedRows)
    }

    return (
        <>
            <div style={{ maxHeight: 'calc(100vh - 376px)', overflowY: 'auto' }}>
                <Table hover responsive size='sm' bordered id='dataTable'>
                    <thead>
                        <tr>
                            <th className='table-data-header text-center text-gray-800'>
                                <input
                                    className='m-0 p-0'
                                    type='checkbox'
                                    ref={selectAllRef}
                                    checked={
                                        tableItems.length > 0 && selectedRows.length === tableItems.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            </th>

                            <th className='table-data-header text-center text-gray-800'>#</th>

                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className='table-data-header text-center text-gray-800 sorting'
                                    onClick={() => handleSort(column)}
                                    style={{
                                        cursor: column.sortable ? 'pointer' : 'default'
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {column.header}
                                        {column.sortable && (
                                            <span style={{ marginLeft: '4px' }}>{getSortIcon(column)}</span>
                                        )}
                                    </div>
                                </th>
                            ))}

                            {renderActions && (
                                <th className='table-data-header text-center text-gray-800'>Actions</th>
                            )}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {tableItems.length === 0 ? (
                            <tr>
                                <td
                                    className='text-center text-muted'
                                    colSpan={columns.length + (renderActions ? 1 : 0)}
                                >
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            tableItems.map((item, rowIndex) => (
                                <tr key={rowIndex}>
                                    {/* Checkbox */}
                                    <td className='text-gray-800 text-center align-middle'>
                                        <input
                                            type='checkbox'
                                            className='m-0 p-0'
                                            checked={selectedRows.includes(rowIndex)}
                                            onChange={() => handleRowSelect(rowIndex)}
                                        />
                                    </td>

                                    <td className='text-gray-800 text-center align-middle'>
                                        {paginationResult ? (pageIndex! - 1) * pageSize! + rowIndex + 1 : ''}
                                    </td>

                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className='text-gray-800 align-middle'>
                                            {column.accessor
                                                ? displayColumnValue(item, String(column.accessor))
                                                : ''}
                                        </td>
                                    ))}

                                    {renderActions && <td className='text-center'>{renderActions(item)}</td>}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default memo(TableDataComponent) as <T>(props: TableDataProps<T>) => JSX.Element
