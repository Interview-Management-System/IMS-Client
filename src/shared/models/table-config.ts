export interface TableConfig<T> {
    headers: { headerName: string; propertyName?: string }[]
    columns: (keyof T)[]
}
