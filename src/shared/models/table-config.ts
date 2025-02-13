export interface TableConfig<T> {
    headers: { headerName: string; propertyName?: string }[]
    columns: (keyof T)[]
}

export interface TableProps<T> {
    items?: T[]
    tableConfig: TableConfig<T>
    renderActions?: (item: T) => React.ReactNode
    onSortChange: (sortName: string, isAscending: boolean) => void
}
