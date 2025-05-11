import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { PaginatedSearchRequest } from '../models/pagination'

interface UsePaginatedSearchProps<T extends PaginatedSearchRequest & FieldValues> {
    form: UseFormReturn<T>
    resetSearch: () => void
    getListPaging: () => void
    setSearchValue: (value: T) => void
}

export default function usePaginatedSearch<T extends PaginatedSearchRequest & FieldValues>({
    form,
    resetSearch,
    getListPaging,
    setSearchValue
}: UsePaginatedSearchProps<T>) {
    function resetForm() {
        form.reset()
        resetSearch()
        getListPaging()
    }

    function onPaginationChange(update: Partial<{ pageIndex: number; pageSize: number }>) {
        const currentValues = form.getValues()
        const updatedPagination = {
            ...currentValues.paginationRequest,
            ...update
        }

        setFormFieldValue('paginationRequest', updatedPagination)
        setSearchValue({ ...currentValues, paginationRequest: updatedPagination })
        getListPaging()
    }

    function onPageIndexChange(newPageIndex: number) {
        onPaginationChange({ pageIndex: newPageIndex })
    }

    function onPageSizeChange(newPageSize: number) {
        onPaginationChange({ pageSize: newPageSize })
    }

    function onSortChange(propertyName: string, isAscending: boolean) {
        const currentValues = form.getValues()

        const sortCriteria = { sortProperty: propertyName, isAscending }
        setFormFieldValue('sortCriteria', sortCriteria)

        setSearchValue({ ...currentValues, sortCriteria: sortCriteria })
        getListPaging()
    }

    function setFormFieldValue(name: keyof PaginatedSearchRequest, value: any) {
        form.setValue(name as Path<T>, value as PathValue<T, Path<T>>)
    }

    return { resetForm, onPageIndexChange, onPageSizeChange, onSortChange }
}
