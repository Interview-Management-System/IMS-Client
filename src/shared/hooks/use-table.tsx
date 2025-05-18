import { faArrowDownAZ, faArrowUpAZ, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { TableColumn } from '../models/table-config'
import tableActionStore, { ButtonInfo } from '../stores/table-action.store'

/**
 * A custom React hook that manages table action buttons by interacting with a store.
 *
 * @param buttonInfos - An array of `ButtonInfo` objects that define the configuration
 * of the table action buttons.
 *
 * @remarks
 * - This hook uses the `useEffect` hook to set the button information in the `tableActionStore`
 * when the component mounts or when `buttonInfos` changes.
 * - When the component unmounts, it clears the button information from the store.
 *
 * @example
 * ```tsx
 * const buttonInfos = [
 *   { label: 'Edit', onClick: handleEdit },
 *   { label: 'Delete', onClick: handleDelete },
 * ];
 *
 * useTableAction(buttonInfos);
 * ```
 */
export function useTableAction(buttonInfos: ButtonInfo[]) {
    useEffect(() => {
        tableActionStore.setButtonInfos(buttonInfos)

        return () => {
            tableActionStore.clearButtons()
        }
    })
}

/**
 * Custom hook to manage table sorting functionality.
 *
 * @template T - The type of the data being sorted.
 * @param {function} onSortChange - Callback function triggered when the sort column or order changes.
 *                                  It receives the column key and the sort order (ascending or descending).
 * @returns - An object containing:
 *   - `handleSort`: A function to handle sorting logic when a column header is clicked.
 *   - `getSortIcon`: A function to retrieve the appropriate sort icon for a column.
 *
 * @example
 * const { handleSort, getSortIcon } = useTableSort((col, asc) => {
 *   console.log(`Sorting by ${col} in ${asc ? 'ascending' : 'descending'} order`);
 * });
 *
 * @property {boolean} sortable - Indicates if the column is sortable.
 * @property {string | null} accessor - The key used to access the column's data.
 */
export function useTableSort<T>(onSortChange: (col: string, asc: boolean) => void) {
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
        if (column.accessor !== sortColumn) return <FontAwesomeIcon icon={faSort} size='1x' />
        return <FontAwesomeIcon icon={isAscending ? faArrowUpAZ : faArrowDownAZ} size='1x' />
    }

    return { handleSort, getSortIcon }
}

/**
 * A custom hook to manage table row selection functionality.
 *
 * This hook provides utilities for handling the selection of all rows,
 * individual row selection, and maintaining the state of selected rows.
 * It also manages the `indeterminate` state of a "Select All" checkbox
 * based on the current selection.
 *
 * @template T - The type of the table items. Each item must have an `id` property of type `string` or `number`.
 *
 * @param {T[]} tableItems - The list of table items to manage selection for.
 *
 * @returns An object containing:
 * - `selectAllRef` - A React ref for the "Select All" checkbox input element.
 * - `selectedRowKeys` - An array of currently selected row keys.
 * - `handleSelectAll` - A function to handle the "Select All" checkbox change event.
 * - `handleRowSelect` - A function to handle the selection of an individual row.
 */
export function useTableSelection<T extends { id: string | number }>(tableItems: T[]) {
    const selectAllRef = useRef<HTMLInputElement>(null)
    const selectedRowKeys = tableActionStore.selectedRowKeys

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate =
                selectedRowKeys.length > 0 && selectedRowKeys.length < tableItems.length
        }
    }, [selectedRowKeys, tableItems.length])

    // Clear selected row keys when the component unmounts
    // to prevent stale state when the component is re-mounted
    useEffect(() => {
        return () => tableActionStore.removeSelectedRowKeys()
    }, [])

    function handleSelectAll(e: ChangeEvent<HTMLInputElement>) {
        const currentPageKeys = tableItems.map(item => item.id)
        if (e.target.checked) {
            tableActionStore.addSelectedRowKeys(currentPageKeys)
        } else {
            tableActionStore.removeSelectedRowKeys()
        }
    }

    function handleRowSelect(item: T) {
        tableActionStore.toggleRowKey(item.id)
    }

    return {
        selectAllRef,
        selectedRowKeys,
        handleSelectAll,
        handleRowSelect
    }
}
