import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'
import { Button } from 'react-bootstrap'
import { EnumList } from '../../helpers/enums/enum-list.helper'
import { TablePaginationProps } from '../../models/table-config'
import PaginationComponent from './components/pagination/pagination.component'
import TableDataComponent from './components/table-data/table-data.component'
import './table.scss'

function TablePaginationComponent<T>({ tableConfig, tableActions }: TablePaginationProps<T>) {
    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>{tableConfig.tableName}</h6>
            </div>

            <div className='card-body'>
                <div className='table-responsive'>
                    <div id='dataTable_wrapper' className='dataTables_wrapper pt-1 px-1'>
                        {/* Form */}
                        <div className='row my-2'>
                            <div className='col-sm-2 col-md-5'>
                                <div className='dataTables_length'>
                                    <Button className='btn-icon-split' onClick={() => {}}>
                                        <span className='icon text-white-50'>
                                            <FontAwesomeIcon icon={faAdd} size='1x' />
                                        </span>
                                        <span className='text'>Create</span>
                                    </Button>
                                </div>
                            </div>

                            {/* Search */}
                            <div className='col-sm-10 col-md-7'>
                                <div id='dataTable_filter' className='dataTables_filter text-right'>
                                    <form className='user'>
                                        <div className='row'>
                                            {/* Status dropdown */}
                                            <select className='form-control col-md-5 '>
                                                <option value={0}>Select role to filter</option>

                                                {EnumList.roleList.map(role => (
                                                    <option
                                                        key={role.value as string}
                                                        value={role.value as number}
                                                    >
                                                        {role.label}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Search field */}
                                            <div className='input-group col-md-5'>
                                                <input
                                                    type='text'
                                                    id='searchInput'
                                                    placeholder='Search...'
                                                    className='form-control bg-light border-0 small'
                                                />

                                                <div className='input-group-append'>
                                                    <Button className='btn-info' type='submit'>
                                                        <FontAwesomeIcon icon={faSearch} size='1x' />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className='col-md-1'>
                                                <Button className='btn-secondary'>Reset</Button>
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

export default memo(TablePaginationComponent) as <T>(props: TablePaginationProps<T>) => JSX.Element
