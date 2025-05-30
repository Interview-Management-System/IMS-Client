import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import tableActionStore from 'shared/stores/table-action.store'
import { PaginatedSearchRequest } from '../models/pagination'

interface UsePaginatedSearchProps<T extends PaginatedSearchRequest & FieldValues> {
    form: UseFormReturn<T>
    onReset: () => void
    getListPaging: () => void
    onSearch: (value: T) => void
}

/**
 * Custom hook to manage paginated search functionality with form integration.
 *
 * @template T - The type extending PaginatedSearchRequest and FieldValues.
 * @param {Object} params - The hook parameters.
 * @param {UseFormReturn<T>} params.form - The form instance from react-hook-form.
 * @param {() => void} params.onReset - Callback invoked when the form is reset.
 * @param {() => void} params.getListPaging - Callback to fetch the paginated list.
 * @param {(values: T) => void} params.onSearch - Callback invoked when a search is performed.
 * @returns An object containing handlers for resetting the form, changing page index, page size, and sorting.
 *
 * @example
 * const { resetForm, onPageIndexChange, onPageSizeChange, onSortChange } = usePaginatedSearch({
 *   form,
 *   onReset: handleReset,
 *   getListPaging: fetchList,
 *   onSearch: handleSearch
 * });
 */
export default function usePaginatedSearch<T extends PaginatedSearchRequest & FieldValues>({
    form,
    onReset,
    getListPaging,
    onSearch
}: UsePaginatedSearchProps<T>) {
    function resetForm() {
        form.reset()
        onReset()
        getListPaging()
    }

    function onPaginationChange(update: Partial<{ pageIndex: number; pageSize: number }>) {
        const currentValues = form.getValues()
        const updatedPagination = {
            ...currentValues.paginationRequest,
            ...update
        }

        setFormFieldValue('paginationRequest', updatedPagination)
        onSearch({ ...currentValues, paginationRequest: updatedPagination })
        getListPaging()
    }

    function onPageIndexChange(newPageIndex: number) {
        tableActionStore.removeSelectedRowKeys()
        onPaginationChange({ pageIndex: newPageIndex })
    }

    function onPageSizeChange(newPageSize: number) {
        onPaginationChange({ pageIndex: 1, pageSize: newPageSize })
    }

    function onSortChange(propertyName: string, isAscending: boolean) {
        const currentValues = form.getValues()

        const sortCriteria = { sortProperty: propertyName, isAscending }
        setFormFieldValue('sortCriteria', sortCriteria)

        onSearch({ ...currentValues, sortCriteria: sortCriteria })
        getListPaging()
    }

    function setFormFieldValue(name: keyof PaginatedSearchRequest, value: any) {
        form.setValue(name as Path<T>, value as PathValue<T, Path<T>>)
    }

    return { resetForm, onPageIndexChange, onPageSizeChange, onSortChange }
}
