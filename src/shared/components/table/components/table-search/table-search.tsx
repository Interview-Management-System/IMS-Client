import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'
import { PaginatedSearchRequest } from 'shared/models/pagination'

interface TableSearchFormProps<TSearch extends PaginatedSearchRequest = PaginatedSearchRequest> {
    tableSearchForm?: {
        resetForm: () => void
        searchForm: UseFormReturn<TSearch>
        handleSearch: (data: TSearch) => void
        filterOptions?: {
            filterOptionKey: keyof TSearch
            options: { label: string; value: string | number | boolean }[]
        }[]
    }
}

function TableSearchForm({ tableSearchForm }: TableSearchFormProps) {
    const searchForm = tableSearchForm?.searchForm

    return (
        <>
            {/* Search form */}
            <div id='dataTable_filter' className='dataTables_filter text-right'>
                <form
                    className='user'
                    onSubmit={searchForm?.handleSubmit((data: any) => tableSearchForm?.handleSearch(data))}
                >
                    <div className=' row align-items-end'>
                        {/* To keep text search at the end of the line */}
                        {!tableSearchForm?.filterOptions && <div className='col-md-5'></div>}

                        {tableSearchForm?.filterOptions &&
                            tableSearchForm.filterOptions.map((filter, index) => (
                                <div key={index} className='col-md-5'>
                                    <select
                                        className='form-control'
                                        {...searchForm?.register(filter.filterOptionKey, {
                                            valueAsNumber: true
                                        })}
                                    >
                                        <option value={0}>Select to filter</option>
                                        {filter.options.map(opt => (
                                            <option key={opt.value.toString()} value={opt.value as number}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                        {/* Search field */}
                        <div className='input-group col-md-5'>
                            <input
                                type='text'
                                placeholder='Search...'
                                className='form-control bg-light border-0 small'
                                {...searchForm?.register('searchText')}
                            />

                            <div className='input-group-append'>
                                <Button className='btn-info' type='submit'>
                                    <FontAwesomeIcon icon={faSearch} size='1x' />
                                </Button>
                            </div>
                        </div>

                        <div className='col-md-1 p-0'>
                            <Button className='btn-secondary' onClick={() => tableSearchForm?.resetForm()}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TableSearchForm
