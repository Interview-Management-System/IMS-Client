import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PaginatedSearchRequest } from '../../models/pagination'
import { TablePaginationProps } from '../../models/table-config'
import PaginationComponent from './components/pagination/pagination.component'
import TableDataComponent from './components/table-data/table-data.component'
import TableSearchForm from './components/table-search/table-search'

/**
 * Renders a paginated table component with optional search and filter functionality.
 *
 * @template T - The type of data displayed in the table rows.
 * @param {TablePaginationProps<T>} props - The properties for configuring the table, actions, and search form.
 * @param props.tableConfig - Configuration for the table, including columns, table name, and pagination result.
 * @param props.tableActions - Actions for handling sorting, pagination, and rendering row actions.
 * @param [props.tableSearchForm] - Optional search form configuration, including filter options and handlers.
 *
 * @returns The rendered table with pagination, search, and filter controls.
 */
function TablePaginationComponent<T>({
    tableConfig,
    tableActions,
    tableSearchForm
}: TablePaginationProps<T>) {
    const navigate = useNavigate()

    return (
        <div className='card shadow'>
            <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>{tableConfig.tableName}</h6>
            </div>

            <div className='card-body py-1'>
                <div id='dataTable_wrapper' className='dataTables_wrapper px-1'>
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
                            <TableSearchForm tableSearchForm={tableSearchForm} />
                        </div>
                    </div>

                    {/* Data */}
                    <TableDataComponent
                        columns={tableConfig.columns}
                        onSortChange={tableActions.onSortChange}
                        renderActions={tableActions.renderActions}
                        paginationResult={tableConfig.paginationResult}
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
    )
}

export default memo(TablePaginationComponent) as <
    T,
    TSearch extends PaginatedSearchRequest = PaginatedSearchRequest
>(
    props: TablePaginationProps<T, TSearch>
) => JSX.Element
