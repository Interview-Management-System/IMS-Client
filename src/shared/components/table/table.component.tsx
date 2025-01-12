import { memo } from 'react'

interface TableProps<T> {
    headers: string[]
    columns: (keyof T)[]
    items?: T[]
    renderActions?: (item: T) => React.ReactNode
}

function TableComponent<T>({ headers, columns, items, renderActions }: TableProps<T>) {
    return (
        <div className='row'>
            <table className='table table-bordered' id='dataTable' cellSpacing='0'>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className='text-center'>
                                {header}
                            </th>
                        ))}

                        {renderActions && <th className='text-center'>Actions</th>}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {items?.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{item[col] as any}</td>
                            ))}

                            {renderActions && (
                                <td className='text-center' style={{ width: '10%' }}>
                                    {renderActions(item)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default memo(TableComponent) as <T>(props: TableProps<T>) => JSX.Element
