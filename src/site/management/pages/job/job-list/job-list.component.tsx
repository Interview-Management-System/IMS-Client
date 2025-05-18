import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
    JobPaginatedSearchRequest,
    JobPaginationRetrieveDTO
} from '../../../../../modules/job/models/job-retrieve.model'
import jobService from '../../../../../modules/job/services/job.service'
import jobStore from '../../../../../modules/user/stores/job.store'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import useModal from '../../../../../shared/hooks/use-modal'
import { TableConfig } from '../../../../../shared/models/table-config'

function JobListComponent() {
    const modal = useModal()
    const navigate = useNavigate()

    const pageResult = jobStore.jobPageResult

    const jobTableConfig: TableConfig<JobPaginationRetrieveDTO> = {
        columns: [
            { header: 'Title', accessor: 'title', sortable: true },
            { header: 'Skills', accessor: 'requiredSkills', sortable: true },
            { header: 'Start Date', accessor: 'datePeriod.startDate', sortable: true },
            { header: 'End Date', accessor: 'datePeriod.endDate', sortable: true },
            { header: 'Levels', accessor: 'levels', sortable: false },
            { header: 'Status', accessor: 'jobStatus', sortable: false }
        ]
    }

    const [, setJobIdToDelete] = useState('')
    const { register, handleSubmit, reset, getValues } = useForm<JobPaginatedSearchRequest>()

    // Modal states
    const [modalTitle, setModalTitle] = useState('')
    const [modalConfirmQuestion, setModalConfirmQuestion] = useState('')
    const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => {})

    // Delete
    function confirmDeleteJob(jobId: string) {
        modal.showModal()
        setJobIdToDelete(jobId)
        setModalTitle('Delete confirmation')
        setModalConfirmQuestion('Are you sure you want to delete ?')
        setModalConfirmHandler(() => () => {
            /// del job
        })
    }

    function resetForm() {
        reset()
        jobStore.resetJobPaginationSearchValue()
        jobService.getJobListPaging()
    }

    function onPageIndexChange(newPageIndex: number) {
        jobStore.setJobPaginationSearchValue({
            ...getValues(),
            paginationRequest: {
                pageIndex: newPageIndex
            }
        })

        jobService.getJobListPaging()
    }

    function onPageSizeChange(newPageSize: number) {
        jobStore.setJobPaginationSearchValue({
            ...getValues(),
            paginationRequest: {
                pageSize: newPageSize
            }
        })

        jobService.getJobListPaging()
    }

    function onSortChange(propertyName: string, isAscending: boolean) {
        jobStore.setJobPaginationSearchValue({
            ...getValues(),
            sortCriteria: {
                isAscending: isAscending,
                sortProperty: propertyName
            }
        })
        jobService.getJobListPaging()
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                modalTitle={modalTitle}
                handleClose={modal.closeModal}
                buttonColor='danger'
                handleConfirm={modalConfirmHandler}
                modalConfirmQuestion={modalConfirmQuestion}
            />

            <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                    <h6 className='m-0 font-weight-bold text-primary'>Job List</h6>
                </div>

                <div className='card-body'>
                    <div className='table-responsive'>
                        <div id='dataTable_wrapper' className='dataTables_wrapper pt-1 px-1'>
                            <div className='row my-2'>
                                <div className='col-sm-2 col-md-5'>
                                    <div className='dataTables_length'>
                                        <Button
                                            className='btn-icon-split'
                                            onClick={() => navigate('/job/create')}
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
                                        <form className='user' onSubmit={handleSubmit(() => {})}>
                                            <div className='row'>
                                                {/* Status dropdown */}
                                                <select
                                                    className='form-control col-md-5 '
                                                    {...register('jobStatusId', { valueAsNumber: true })}
                                                >
                                                    <option value={0}>Select role to filter</option>

                                                    {EnumList.jobList.map(role => (
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
                                                    <Button className='btn-secondary' onClick={resetForm}>
                                                        Reset
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(JobListComponent)
