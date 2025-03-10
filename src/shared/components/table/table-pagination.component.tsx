import { faArrowDownAZ, faArrowUpAZ, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useState } from 'react'
import { TableColumn, TableProps } from '../../models/table-config'
import './table.scss'

function displayColumnValue<T>(obj: T, path: string): any {
    return path.split('.').reduce((acc: any, key) => acc?.[key], obj) ?? ''
}

function TablePaginationComponent<T>({
    items = [],
    tableConfig,
    onSortChange,
    renderActions
}: TableProps<T>) {
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [isAscending, setIsAscending] = useState<boolean>(true)

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

    return (
        <div className='table-responsive'>
            <table className='table table-bordered text-muted' id='dataTable' width='100%' cellSpacing='0'>
                {/* Header */}
                <thead>
                    <tr>
                        <th></th>

                        {tableConfig.columns.map((column, index) => (
                            <th
                                key={index}
                                className='text-center text-gray-800 sorting'
                                onClick={() => handleSort(column)}
                                style={{ cursor: column.sortable ? 'pointer' : 'default' }}
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
                        {renderActions && <th className='text-center text-gray-800'>Actions</th>}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td
                                colSpan={tableConfig.columns.length + (renderActions ? 1 : 0)}
                                className='text-center text-muted'
                            >
                                No records found
                            </td>
                        </tr>
                    ) : (
                        <>
                            {items.map((item, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className='text-gray-800'>{rowIndex + 1}</td>

                                    {tableConfig.columns.map((column, colIndex) => (
                                        <td key={colIndex} className='text-gray-800'>
                                            {column.accessor
                                                ? displayColumnValue(item, String(column.accessor))
                                                : ''}
                                        </td>
                                    ))}
                                    {renderActions && <td className='text-center'>{renderActions(item)}</td>}
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(TablePaginationComponent) as <T>(props: TableProps<T>) => JSX.Element
