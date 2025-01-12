import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserForRetrieveDTO, UserPaginatedSearchRequest } from '../../../../../modules/user/models/user.model'
import userService from '../../../../../modules/user/services/user.service'
import userStore from '../../../../../modules/user/stores/user.store'
import ActionButtonComponent from '../../../../../shared/components/buttons/action-button.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import PaginationComponent from '../../../../../shared/components/pagination/pagination.component'
import TableComponent from '../../../../../shared/components/table/table.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { RoleEnum } from '../../../../../shared/enums/entity-enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import useModal from '../../../../../shared/hooks/useModal'

function deleteUser(userId: string, formData: UserPaginatedSearchRequest) {
    // userService.deleteUserById(userId).then(() => userService.getUserListPaging(formData))
}

function resetForm(formData: UserPaginatedSearchRequest) {
    if (formData.roleId !== RoleEnum.Default || formData.searchText?.trim() !== '') {
        userService.getUserListPaging()
    }
}

function handleSubmitForm(formData: UserPaginatedSearchRequest) {
    userService.getUserListPaging(formData)
}

function UserListComponent() {
    const modal = useModal()
    const navigate = useNavigate()
    const pageResult = userStore.userPageResult
    const headers = ['User Name', 'Email', 'Phone', 'Role', 'Status']
    const columns = ['username', 'email', 'phoneNumber', 'role', 'status'] as (keyof UserForRetrieveDTO)[]

    useFetch(() => userService.getUserListPaging())

    const [userIdToDelete, setUserIdToDelete] = useState('')
    const { register, handleSubmit, reset, getValues } = useForm<UserPaginatedSearchRequest>()

    const handleDeleteUser = useMemo(
        () => (userId: string) => {
            setUserIdToDelete(userId)
            modal.showModal()
        },
        [modal]
    )

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                buttonVariant={ButtonVariant.Danger}
                modalTitle='Delete confirm'
                handleClose={modal.closeModal}
                modalConfirmQuestion='Do you want to delete this user ?'
                handleConfirm={() => {
                    //
                }}
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
                                        <form className='user' onSubmit={handleSubmit(handleSubmitForm)}>
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
                                                    <Button
                                                        className='btn-secondary'
                                                        onClick={() => {
                                                            resetForm(getValues())
                                                            reset()
                                                        }}
                                                    >
                                                        Reset
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <TableComponent
                                headers={headers}
                                columns={columns}
                                items={pageResult.items}
                                renderActions={user => (
                                    <ActionButtonComponent
                                        editRoute={`/user/edit/${user.id}`}
                                        detailRoute={`/user/detail/${user.id}`}
                                        deleteAction={() => handleDeleteUser(user.id)}
                                    />
                                )}
                            />

                            <PaginationComponent
                                paginationResult={pageResult}
                                onPageIndexChange={(newPageIndex: number) => {
                                    userService.getUserListPaging({
                                        ...getValues(),
                                        paginationRequest: {
                                            pageIndex: newPageIndex
                                        }
                                    })
                                }}
                                onPageSizeChange={(newPageSize: number) => {
                                    userService.getUserListPaging({
                                        ...getValues(),
                                        paginationRequest: {
                                            pageSize: newPageSize
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(UserListComponent)
