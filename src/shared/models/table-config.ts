import { PaginationResult } from './pagination'

type Primitive = string | number | boolean | symbol | null | undefined

type NestedKeys<T> = {
    [K in keyof T & (string | number)]: NonNullable<T[K]> extends Primitive
        ? `${K}`
        : `${K}` | `${K}.${NestedKeys<NonNullable<T[K]>>}`
}[keyof T & (string | number)]

export interface TableColumn<T> {
    header: string

    /** The property key or dot‑notation path used to extract the value from the row item */
    accessor?: NestedKeys<T>
    /** If true, the column is sortable */
    sortable?: boolean
}

// To be removed
export interface TableConfig<T> {
    columns: TableColumn<T>[]
}

export interface TablePaginationProps<T> {
    tableActions: {
        renderActions?: (item: T) => React.ReactNode
        onPageSizeChange: (pageSize: number) => void
        onPageIndexChange: (pageIndex: number) => void
        onSortChange: (sortName: string, isAscending: boolean) => void
    }
    tableConfig: {
        tableName: string
        columns: TableColumn<T>[]
        paginationResult?: PaginationResult<T>
    }
    tableSearchForm?: {}
}

export interface TableDataProps<T> {
    items: T[]
    columns: TableColumn<T>[]
    renderActions?: (item: T) => React.ReactNode
    onSortChange: (sortName: string, isAscending: boolean) => void
}
