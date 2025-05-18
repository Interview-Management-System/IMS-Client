import { observer } from 'mobx-react-lite'
import { Table } from 'react-bootstrap'
import { useTableSelection, useTableSort } from '../../../../hooks/use-table'
import { TableDataProps } from '../../../../models/table-config'
import './table-data.scss'

function displayColumnValue<T>(obj: T, path?: any): any {
    return path?.split('.').reduce((acc: any, key: string) => acc?.[key], obj) ?? ''
}

function TableDataComponent<T extends { id: string | number }>({
    paginationResult,
    onSortChange,
    columns,
    renderActions
}: TableDataProps<T>) {
    const pageSize = paginationResult?.pageSize
    const pageIndex = paginationResult?.pageIndex
    const tableItems = paginationResult?.items ?? []

    const { handleSort, getSortIcon } = useTableSort<T>(onSortChange)
    const { selectAllRef, selectedRowKeys, handleSelectAll, handleRowSelect } = useTableSelection(tableItems)

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
                                        tableItems.length > 0 && selectedRowKeys.length === tableItems.length
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
                                            checked={selectedRowKeys.includes(item.id)}
                                            onChange={() => handleRowSelect(item)}
                                        />
                                    </td>

                                    {/* Index */}
                                    <td className='text-gray-800 text-center align-middle'>
                                        {paginationResult ? (pageIndex! - 1) * pageSize! + rowIndex + 1 : ''}
                                    </td>

                                    {/* Item data */}
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className='text-gray-800 align-middle'
                                            onClick={() => handleRowSelect(item)}
                                        >
                                            {displayColumnValue(item, column.accessor)}
                                        </td>
                                    ))}

                                    {/* Render custom column */}
                                    {renderActions && (
                                        <td className='text-center px-0 mx-0'>{renderActions(item)}</td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default observer(TableDataComponent) as <T>(props: TableDataProps<T>) => JSX.Element
