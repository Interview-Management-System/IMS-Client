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
import { UserForRetrieveDTO, UserPaginatedSearchRequest } from '../../../../../modules/user/models/user.model'
import userService from '../../../../../modules/user/services/user.service'
import userStore from '../../../../../modules/user/stores/user.store'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import PaginationComponent from '../../../../../shared/components/pagination/pagination.component'
import TableComponent from '../../../../../shared/components/table/table.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { RoleEnum } from '../../../../../shared/enums/entity-enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import useModal from '../../../../../shared/hooks/useModal'
import { TableConfig } from '../../../../../shared/models/table-config'

function handleSearchUser(formData: UserPaginatedSearchRequest) {
    if (formData.roleId !== RoleEnum.Default || formData.searchText?.trim() !== '') {
        userStore.setUserPaginationSearchValue(formData)
        userService.getUserListPaging()
    }
}

function UserListComponent() {
    const modal = useModal()
    const navigate = useNavigate()
    const pageResult = userStore.userPageResult

    useFetch(() => userService.getUserListPaging())

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
                headerName: 'Role'
            },
            {
                headerName: 'Status'
            }
        ],
        columns: ['username', 'email', 'phoneNumber', 'role', 'statusText']
    } as TableConfig<UserForRetrieveDTO>

    const { register, handleSubmit, reset, getValues } = useForm<UserPaginatedSearchRequest>()

    const [, setUserIdToDelete] = useState('')
    const [, setUserIdToActivate] = useState('')
    const [, setUserIdToDeActivate] = useState('')

    // Modal states
    const [modalTitle, setModalTitle] = useState('')
    const [modalConfirmQuestion, setModalConfirmQuestion] = useState('')
    const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => {})

    // Delete
    function confirmDeleteUser(userId: string) {
        modal.showModal()
        setUserIdToDelete(userId)
        setModalTitle('Delete confirmation')
        setModalConfirmQuestion('Are you sure you want to delete ?')
        setModalConfirmHandler(() => () => userService.deleteUser(userId))
    }

    // Activate
    function confirmActivateUser(userId: string) {
        modal.showModal()
        setUserIdToActivate(userId)
        setModalTitle('Active confirmation')
        setModalConfirmQuestion('Are you sure you want to activate ?')
        setModalConfirmHandler(() => () => userService.activateUser(userId))
    }

    // De-Activate
    function confirmDeActivateUser(userId: string) {
        modal.showModal()
        setUserIdToDeActivate(userId)
        setModalTitle('De-activate confirmation')
        setModalConfirmQuestion('Are you sure you want to de-activate ?')
        setModalConfirmHandler(() => () => userService.deActivateUser(userId))
    }

    function resetForm() {
        reset()
        userStore.resetUserPaginationSearchValue()
        userService.getUserListPaging()
    }

    function onPageIndexChange(newPageIndex: number) {
        userStore.setUserPaginationSearchValue({
            ...getValues(),
            paginationRequest: {
                pageIndex: newPageIndex
            }
        })

        userService.getUserListPaging()
    }

    function onPageSizeChange(newPageSize: number) {
        userStore.setUserPaginationSearchValue({
            ...getValues(),
            paginationRequest: {
                pageSize: newPageSize
            }
        })

        userService.getUserListPaging()
    }

    function onSortChange(propertyName: string, isAscending: boolean) {
        userStore.setUserPaginationSearchValue({
            ...getValues(),
            sortCriteria: {
                isAscending: isAscending,
                sortProperty: propertyName
            }
        })
        userService.getUserListPaging()
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
                    <h6 className='m-0 font-weight-bold text-primary'>User List</h6>
                </div>

                <div className='card-body'>
                    <div className='table-responsive'>
                        <div id='dataTable_wrapper' className='dataTables_wrapper pt-1 px-1'>
                            <div className='row my-2'>
                                <div className='col-sm-2 col-md-5'>
                                    <div className='dataTables_length'>
                                        <Button
                                            className='btn-icon-split'
                                            onClick={() => navigate('/user/create')}
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
                                        <form className='user' onSubmit={handleSubmit(handleSearchUser)}>
                                            <div className='row'>
                                                {/* Status dropdown */}
                                                <select
                                                    className='form-control col-md-5 '
                                                    {...register('roleId', { valueAsNumber: true })}
                                                >
                                                    <option value={0}>Select role to filter</option>

                                                    {EnumList.roleList.map(role => (
                                                        <option key={role.id} value={role.id}>
                                                            {role.name}
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

                            <TableComponent
                                tableConfig={tableConfig}
                                items={pageResult.items}
                                onSortChange={onSortChange}
                                renderActions={user => (
                                    <>
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip id='tooltip-view'>Details</Tooltip>}
                                        >
                                            <Button
                                                variant={ButtonVariant.Primary}
                                                className='m-1 btn-sm'
                                                onClick={() => navigate(`/user/detail/${user.id}`)}
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip id='tooltip-edit'>Edit </Tooltip>}
                                        >
                                            <Button
                                                disabled={!user.isActive}
                                                variant={ButtonVariant.Info}
                                                className='m-1 btn-sm'
                                                onClick={() => navigate(`/user/edit/${user.id}`)}
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
                                                onClick={() => confirmDeleteUser(user.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </OverlayTrigger>

                                        <>
                                            {user.isActive && (
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
                                                        onClick={() => confirmDeActivateUser(user.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faToggleOff} />
                                                    </Button>
                                                </OverlayTrigger>
                                            )}

                                            {!user.isActive && (
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
                                                        onClick={() => confirmActivateUser(user.id)}
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
                                onPageIndexChange={onPageIndexChange}
                                onPageSizeChange={onPageSizeChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(UserListComponent)
