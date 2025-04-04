import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
    CandidateForPaginationRetrieveDTO,
    CandidatePaginatedSearchRequest
} from '../../../../../modules/user/models/candidate.model'
import candidateService from '../../../../../modules/user/services/candidate.service'
import userService from '../../../../../modules/user/services/user.service'
import userStore from '../../../../../modules/user/stores/user.store'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import { ButtonColor } from '../../../../../shared/enums/button.enum'
import { CandidateStatusEnum } from '../../../../../shared/enums/entity-enums/candidate.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import useModal from '../../../../../shared/hooks/use-modal'
import { TableConfig } from '../../../../../shared/models/table-config'
import './candidate-list.scss'

function handleSearchCandidate(formData: CandidatePaginatedSearchRequest) {
    if (formData.statusId !== CandidateStatusEnum.Default || formData.searchText?.trim() !== '') {
        userStore.setCandidatePaginationSearchValue(formData)
        candidateService.getCandidateListPaging()
    }
}

function CandidateListComponent() {
    const modal = useModal()
    const navigate = useNavigate()
    const pageResult = userStore.candidatePageResult

    const tableConfig = {
        columns: [
            { header: 'Candidate Name', accessor: 'username', sortable: true },
            { header: 'Email', accessor: 'email', sortable: true },
            { header: 'Phone', accessor: 'phoneNumber', sortable: true },
            { header: 'Position', accessor: 'currentPosition', sortable: false },
            { header: 'Recruiter', accessor: 'ownerHr', sortable: false },
            { header: 'Status', accessor: 'userStatus.statusText', sortable: false }
        ]
    } as TableConfig<CandidateForPaginationRetrieveDTO>

    useFetch(() => candidateService.getCandidateListPaging())
    // candidateService.getCandidateListPaging()
    useEffect(() => {
        return () => {
            // candidateService.stopConnection()
        }
    }, [])

    const { register, handleSubmit, reset, getValues } = useForm<CandidatePaginatedSearchRequest>()

    const [, setUserIdToDelete] = useState('')
    const [, setUserIdToActivate] = useState('')
    const [, setUserIdToDeActivate] = useState('')

    // Modal states
    const [modalTitle, setModalTitle] = useState('')
    const [modalConfirmQuestion, setModalConfirmQuestion] = useState('')
    const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => {})

    // Delete
    function confirmDeleteCandidate(userId: string) {
        modal.showModal()
        setUserIdToDelete(userId)
        setModalTitle('Delete confirmation')
        setModalConfirmQuestion('Are you sure you want to delete ?')
        setModalConfirmHandler(() => () => userService.deleteUser(userId))
    }

    // Activate
    function confirmActivateCandidate(userId: string) {
        modal.showModal()
        setUserIdToActivate(userId)
        setModalTitle('Active confirmation')
        setModalConfirmQuestion('Are you sure you want to activate ?')
        setModalConfirmHandler(() => () => userService.activateUser(userId))
    }

    // De-Activate
    function confirmDeActivateCandidate(userId: string) {
        modal.showModal()
        setUserIdToDeActivate(userId)
        setModalTitle('De-activate confirmation')
        setModalConfirmQuestion('Are you sure you want to de-activate ?')
        setModalConfirmHandler(() => () => userService.deActivateUser(userId))
    }

    function resetForm() {
        reset()
        userStore.resetCandidatePaginationSearchValue()
        candidateService.getCandidateListPaging()
    }

    function onPageIndexChange(newPageIndex: number) {
        userStore.setCandidatePaginationSearchValue({
            ...getValues(),
            paginationRequest: {
                pageIndex: newPageIndex
            }
        })

        candidateService.getCandidateListPaging()
    }

    function onPageSizeChange(newPageSize: number) {
        userStore.setCandidatePaginationSearchValue({
            ...getValues(),
            paginationRequest: {
                pageSize: newPageSize
            }
        })

        candidateService.getCandidateListPaging()
    }

    function onSortChange(propertyName: string, isAscending: boolean) {
        userStore.setCandidatePaginationSearchValue({
            ...getValues(),
            sortCriteria: {
                isAscending: isAscending,
                sortProperty: propertyName
            }
        })
        candidateService.getCandidateListPaging()
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                modalTitle={modalTitle}
                handleClose={modal.closeModal}
                buttonColor={ButtonColor.Danger}
                modalConfirmQuestion={modalConfirmQuestion}
                handleConfirm={modalConfirmHandler}
            />

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
                                        <form className='user' onSubmit={handleSubmit(handleSearchCandidate)}>
                                            <div className='row'>
                                                {/* Status dropdown */}
                                                <select
                                                    className='form-control col-md-5 '
                                                    {...register('statusId', { valueAsNumber: true })}
                                                >
                                                    <option value={0}>Select status to filter</option>

                                                    {EnumList.candidateStatusList.map(candidateStatus => (
                                                        <option
                                                            key={candidateStatus.value as number}
                                                            value={candidateStatus.value as number}
                                                        >
                                                            {candidateStatus.label}
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
                                                    <Button className='btn-secondary' onClick={resetForm}>
                                                        Reset
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* <TableComponent
                                onSortChange={onSortChange}
                                paginationResult={pageResult}
                                tableConfig={tableConfig}
                                onPageSizeChange={onPageSizeChange}
                                onPageIndexChange={onPageIndexChange}
                                renderActions={candidate => (
                                    <>
                                        <ButtonActionComponent
                                            icon={faEye}
                                            tooltipName='Details'
                                            buttonColor={ButtonColor.Primary}
                                            action={() => navigate(`/candidate/detail/${candidate.id}`)}
                                        />

                                        <ButtonActionComponent
                                            icon={faPenToSquare}
                                            tooltipName='Edit'
                                            buttonColor={ButtonColor.Info}
                                            action={() => navigate(`/candidate/edit/${candidate.id}`)}
                                        />

                                        <ButtonActionComponent
                                            icon={faTrash}
                                            tooltipName='Delete'
                                            buttonColor={ButtonColor.Danger}
                                            action={() => confirmDeleteCandidate(candidate.id)}
                                        />

                                        <>
                                            {candidate.userStatus?.isActive && (
                                                <ButtonActionComponent
                                                    icon={faToggleOff}
                                                    tooltipName='De-active'
                                                    buttonColor={ButtonColor.Dark}
                                                    action={() => confirmDeActivateCandidate(candidate.id)}
                                                />
                                            )}

                                            {!candidate.userStatus?.isActive && (
                                                <ButtonActionComponent
                                                    icon={faToggleOn}
                                                    tooltipName='Active'
                                                    buttonColor={ButtonColor.Success}
                                                    action={() => confirmActivateCandidate(candidate.id)}
                                                />
                                            )}
                                        </>
                                    </>
                                )}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(CandidateListComponent)
