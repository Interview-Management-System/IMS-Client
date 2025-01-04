import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { candidateListTestData } from '../../../../../data/test/user-data.test'
import { CandidateForRetrieveDTO } from '../../../../../modules/user/models/candidate.model'
import ActionButtonComponent from '../../../../../shared/components/buttons/action-button.component'
import PaginationComponent from '../../../../../shared/components/pagination/pagination.component'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'

import usePagination from '../../../../../shared/hooks/usePagination'
import { PaginationResult } from '../../../../../shared/models/pagination'
import './candidate-list.scss'

interface CandidateSearch {
    status: number
    searchText?: string
}

function handleSubmitForm(formData: CandidateSearch) {
    if (formData.status > 0 || formData.searchText !== '') {
        // call api
        console.log(formData)
    }
}

function CandidateListComponent() {
    const navigate = useNavigate()

    const paginationResult = {
        items: candidateListTestData,
        pageSize: 4,
        pageIndex: 1,
        totalRecords: candidateListTestData.length
    } as PaginationResult<CandidateForRetrieveDTO>

    const pageResult = usePagination(paginationResult)

    const { register, handleSubmit, reset } = useForm<CandidateSearch>({
        defaultValues: {
            status: 0,
            searchText: ''
        }
    })

    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h6 className='m-0 font-weight-bold text-primary'>Candidate List</h6>
            </div>

            <div className='card-body'>
                <div className='table-responsive'>
                    <div id='dataTable_wrapper' className='dataTables_wrapper pt-1 px-1'>
                        <div className='row my-2'>
                            <div className='col-sm-2 col-md-5'>
                                <div className='dataTables_length'>
                                    <Button
                                        className='btn-icon-split'
                                        onClick={() => navigate('/candidate/create')}
                                    >
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
                                    <form className='user' onSubmit={handleSubmit(handleSubmitForm)}>
                                        <div className='row'>
                                            {/* Status dropdown */}
                                            <select
                                                className='form-control col-md-5 '
                                                {...register('status')}
                                            >
                                                <option value={0}>Select status to filter</option>

                                                {EnumList.candidateStatusList.map(candidateStatus => (
                                                    <option
                                                        key={candidateStatus.id}
                                                        value={candidateStatus.id}
                                                    >
                                                        {candidateStatus.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Search field */}
                                            <div className='input-group col-md-5'>
                                                <input
                                                    type='text'
                                                    id='searchInput'
                                                    placeholder='Search for...'
                                                    {...register('searchText')}
                                                    className='form-control bg-light border-0 small'
                                                />

                                                <div className='input-group-append'>
                                                    <Button className='btn-info' type='submit'>
                                                        <FontAwesomeIcon icon={faSearch} size='1x' />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className='col-md-1'>
                                                <Button className='btn-secondary' onClick={() => reset()}>
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
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
                                    {pageResult.items?.map(candidate => (
                                        <tr key={candidate.id}>
                                            <td>{candidate.username}</td>
                                            <td>{candidate.email}</td>
                                            <td>{candidate.phoneNumber}</td>
                                            <td>{candidate.position}</td>
                                            <td>{candidate.recruiterName}</td>
                                            <td>{candidate.status}</td>
                                            <td className='badge badge-success'></td>

                                            <td className='text-center' style={{ width: '10%' }}>
                                                <ActionButtonComponent
                                                    detailRoute={`/candidate/detail/${candidate.id}`}
                                                    editRoute={`/candidate/edit?id=${candidate.id}`}
                                                    deleteAction={() => {}}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <PaginationComponent
                            paginationResult={pageResult}
                            onPageSizeChange={pageResult.handlePageSizeChange}
                            onPageIndexChange={pageResult.handlePageIndexChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateListComponent
