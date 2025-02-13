import {
    faAdd,
    faEye,
    faPenToSquare,
    faSearch,
    faToggleOff,
    faToggleOn,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
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
import PaginationComponent from '../../../../../shared/components/pagination/pagination.component'
import TableComponent from '../../../../../shared/components/table/table.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { CandidateStatusEnum } from '../../../../../shared/enums/entity-enums/candidate.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import useModal from '../../../../../shared/hooks/useModal'
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
        headers: [
            {
                headerName: 'User Name',
                propertyName: 'UserName'
            },
            {
                headerName: 'Email',
                propertyName: 'Email'
            },
            {
                headerName: 'Phone',
                propertyName: 'PhoneNumber'
            },
            {
                headerName: 'Current Position'
            },
            {
                headerName: 'Owner HR'
            },
            {
                headerName: 'Status'
            }
        ],
        columns: ['username', 'email', 'phoneNumber', 'currentPosition', 'ownerHr', 'candidateStatus']
    } as TableConfig<CandidateForPaginationRetrieveDTO>

    useFetch(() => candidateService.getCandidateListPaging())

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
                buttonVariant={ButtonVariant.Danger}
                modalTitle={modalTitle}
                handleClose={modal.closeModal}
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

                            <TableComponent
                                tableConfig={tableConfig}
                                items={pageResult.items}
                                onSortChange={onSortChange}
                                renderActions={candidate => (
                                    <>
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip id='tooltip-view'>Details</Tooltip>}
                                        >
                                            <Button
                                                variant={ButtonVariant.Primary}
                                                className='m-1 btn-sm'
                                                onClick={() => navigate(`/candidate/detail/${candidate.id}`)}
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip id='tooltip-edit'>Edit </Tooltip>}
                                        >
                                            <Button
                                                disabled={!candidate.userStatus?.isActive}
                                                variant={ButtonVariant.Info}
                                                className='m-1 btn-sm'
                                                onClick={() => navigate(`/candidate/edit/${candidate.id}`)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip id='tooltip-delete'>Delete </Tooltip>}
                                        >
                                            <Button
                                                variant={ButtonVariant.Danger}
                                                className='m-1 btn-sm'
                                                onClick={() => confirmDeleteCandidate(candidate.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </OverlayTrigger>

                                        <>
                                            {candidate.userStatus?.isActive && (
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={
                                                        <Tooltip id='tooltip-another-action'>
                                                            De-activate
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button
                                                        variant={ButtonVariant.Dark}
                                                        className='m-1 btn-sm'
                                                        onClick={() =>
                                                            confirmDeActivateCandidate(candidate.id)
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faToggleOff} />
                                                    </Button>
                                                </OverlayTrigger>
                                            )}

                                            {!candidate.userStatus?.isActive && (
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={
                                                        <Tooltip id='tooltip-another-action'>
                                                            Activate
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button
                                                        variant={ButtonVariant.Success}
                                                        className='m-1 btn-sm'
                                                        onClick={() => confirmActivateCandidate(candidate.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faToggleOn} />
                                                    </Button>
                                                </OverlayTrigger>
                                            )}
                                        </>
                                    </>
                                )}
                            />

                            <PaginationComponent
                                paginationResult={pageResult}
                                onPageSizeChange={onPageSizeChange}
                                onPageIndexChange={onPageIndexChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(CandidateListComponent)
