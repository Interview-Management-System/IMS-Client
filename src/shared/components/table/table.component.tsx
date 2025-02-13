import { faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useState } from 'react'
import { TableProps } from '../../models/table-config'

function displayColumnValue<T>(obj: T, path: string): any {
    const value = path.split('.').reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            return (acc as Record<string, unknown>)[key]
        }
        return undefined
    }, obj)

    // Return a fallback value if the value is undefined or null
    return value && typeof value !== 'object' ? value : ''
}

function TableComponent<T>({ items = [], tableConfig, onSortChange, renderActions }: TableProps<T>) {
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
    const [isAscending, setIsAscending] = useState(true)

    function handleSort(propertyName?: string, column?: keyof T) {
        if (propertyName) {
            if (sortColumn === column) {
                setIsAscending(!isAscending)
            } else {
                setSortColumn(column!)
                setIsAscending(true)
            }

            onSortChange(propertyName, isAscending)
        }
    }

    return (
        <div className='row'>
            <table className='table table-bordered' id='dataTable' cellSpacing='0'>
                <thead>
                    <tr>
                        {tableConfig.headers.map((header, index) => {
                            const propertyName = header.propertyName

                            return (
                                <th
                                    key={index}
                                    className='text-center'
                                    onClick={() => handleSort(propertyName, tableConfig.columns[index])}
                                    style={{ cursor: propertyName ? 'pointer' : 'default' }}
                                >
                                    <div
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {header.headerName}

                                        {propertyName && (
                                            <div
                                                className='sortable-header'
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    lineHeight: '1',
                                                    marginLeft: '4px'
                                                }}
                                            >
                                                <span>
                                                    <FontAwesomeIcon icon={faSort} size='1x' />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            )
                        })}

                        {renderActions && <th className='text-center'>Actions</th>}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td
                                colSpan={tableConfig.headers.length + (renderActions ? 1 : 0)}
                                className='text-center'
                            >
                                No records found
                            </td>
                        </tr>
                    ) : (
                        items.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {tableConfig.columns.map((col, colIndex) => (
                                    <td key={colIndex}>{displayColumnValue(item, String(col))}</td>
                                ))}

                                {renderActions && (
                                    <td className='text-center' style={{ width: '10%' }}>
                                        {renderActions(item)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(TableComponent) as <T>(props: TableProps<T>) => JSX.Element
