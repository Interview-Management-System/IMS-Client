import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PaginatedSearchRequest } from '../../models/pagination'
import { TablePaginationProps } from '../../models/table-config'
import PaginationComponent from './components/pagination/pagination.component'
import TableDataComponent from './components/table-data/table-data.component'

function TablePaginationComponent<T>({
    tableConfig,
    tableActions,
    tableSearchForm
}: TablePaginationProps<T>) {
    const navigate = useNavigate()
    const searchForm = tableSearchForm?.searchForm

    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>{tableConfig.tableName}</h6>
            </div>

            <div className='card-body'>
                <div className='table-responsive'>
                    <div id='dataTable_wrapper' className='dataTables_wrapper pt-1 px-1'>
                        <div className='row my-2'>
                            <div className='col-sm-2 col-md-5'>
                                <div className='dataTables_length'>
                                    <Button
                                        className='btn-icon-split'
                                        onClick={() => navigate(tableConfig.createPageRoute)}
                                    >
                                        <span className='icon text-white-50'>
                                            <FontAwesomeIcon icon={faAdd} size='1x' />
                                        </span>
                                        <span className='text'>Create</span>
                                    </Button>
                                </div>
                            </div>

                            {/* Search form */}
                            <div className='col-sm-10 col-md-7'>
                                <div id='dataTable_filter' className='dataTables_filter text-right'>
                                    <form
                                        className='user'
                                        onSubmit={searchForm?.handleSubmit((data: any) =>
                                            tableSearchForm?.handleSearch(data)
                                        )}
                                    >
                                        <div className=' row align-items-end'>
                                            {/* To keep text search at the end of the line */}
                                            {!tableSearchForm?.filterOptions && (
                                                <div className='col-md-5'></div>
                                            )}

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
                                                                <option
                                                                    key={opt.value.toString()}
                                                                    value={opt.value as number}
                                                                >
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
                                                <Button
                                                    className='btn-secondary'
                                                    onClick={() => tableSearchForm?.resetForm()}
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Data */}
                        <TableDataComponent
                            columns={tableConfig.columns}
                            onSortChange={tableActions.onSortChange}
                            renderActions={tableActions.renderActions}
                            items={tableConfig.paginationResult?.items ?? []}
                        />

                        {/* Pagination */}
                        <PaginationComponent
                            paginationResult={tableConfig.paginationResult}
                            onPageSizeChange={tableActions.onPageSizeChange}
                            onPageIndexChange={tableActions.onPageIndexChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(TablePaginationComponent) as <
    T,
    TSearch extends PaginatedSearchRequest = PaginatedSearchRequest
>(
    props: TablePaginationProps<T, TSearch>
) => JSX.Element
