import { faAdd, faEye, faPenToSquare, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import PaginationComponent from '../../../../../shared/components/pagination/pagination.component'
import { PaginationResult } from '../../../../../shared/models/pagination'
import './candidate-list.scss'

function CandidateListComponent() {
    const a = {
        items: ['asdf', 'asdf', 'adsafs', 'asdf', 'asdf'],
        pageSize: 5,
        pageIndex: 1,
        totalRecords: 15
    } as PaginationResult<string>

    const [pageResult, setPageResult] = useState<PaginationResult<string>>(a)

    const handlePageChange = (pageIndex: number) => {
        setPageResult(prev => ({
            ...prev,
            pageIndex
        }))
    }

    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>List Candidate</h6>
            </div>

            <div className='card-body'>
                <div className='table-responsive'>
                    <div id='dataTable_wrapper' className='dataTables_wrapper pt-1 px-1'>
                        <div className='row my-2'>
                            <div className='col-sm-12 col-md-6'>
                                <div className='dataTables_length'>
                                    <button className='btn btn-primary btn-icon-split'>
                                        <span className='icon text-white-50'>
                                            <FontAwesomeIcon icon={faAdd} size='1x' />
                                        </span>

                                        <span className='text'>Create</span>
                                    </button>
                                </div>
                            </div>

                            {/* Search */}
                            <div className='col-sm-12 col-md-6'>
                                <div id='dataTable_filter' className='dataTables_filter text-right'>
                                    <div className='row'>
                                        <select className='form-control col-md-4'>
                                            <option value='0'>-- Select role --</option>
                                        </select>

                                        <div className='input-group col-md-8'>
                                            <input
                                                id='searchInput'
                                                type='text'
                                                className='form-control bg-light border-0 small'
                                                placeholder='Search for...'
                                            />
                                            <div className='input-group-append'>
                                                <Button className='btn-info' type='button'>
                                                    <FontAwesomeIcon icon={faSearch} size='1x' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className='row'>
                            <table className='table table-bordered' id='dataTable' cellSpacing='0'>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Name</th>
                                        <th className='text-center'>Email</th>
                                        <th className='text-center'>Phone</th>
                                        <th className='text-center'>Current Position</th>
                                        <th className='text-center'>Owner HR</th>
                                        <th className='text-center'>Status</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>y</td>
                                        <td>r</td>
                                        <td>r</td>
                                        <td>r</td>
                                        <td>r</td>
                                        <td>r</td>
                                        <td className='badge badge-success'></td>

                                        <td className='text-center' style={{ width: '10%' }}>
                                            <Button variant='primary' className='m-1 btn-sm'>
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>

                                            <Button variant='info' className='m-1 btn-sm'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>

                                            <Button variant='danger' className='m-1 btn-sm'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>

                                            <Button variant='danger' className='m-1 btn-sm'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <PaginationComponent paginationResult={pageResult} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateListComponent
