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

export interface TableConfig<T> {
    columns: TableColumn<T>[]
}

export interface TableProps<T> {
    items?: T[]
    tableConfig: TableConfig<T>
    renderActions?: (item: T) => React.ReactNode
    onSortChange: (sortName: string, isAscending: boolean) => void
}
