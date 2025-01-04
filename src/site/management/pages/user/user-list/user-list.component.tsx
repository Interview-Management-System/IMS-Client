import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { userListTestData } from '../../../../../data/test/user-data.test'
import { UserPaginatedSearchRequest } from '../../../../../modules/user/models/user.model'
import userService from '../../../../../modules/user/services/user.service'
import ActionButtonComponent from '../../../../../shared/components/buttons/action-button.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import PaginationComponent from '../../../../../shared/components/pagination/pagination.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { RoleEnum } from '../../../../../shared/enums/entity-enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import useModal from '../../../../../shared/hooks/useModal'
import usePagination from '../../../../../shared/hooks/usePagination'

const defaultSearchValue = {
    searchText: '',
    roleId: RoleEnum.Default,
    paginationRequest: { pageIndex: 1, pageSize: 5 }
} as UserPaginatedSearchRequest

function deleteUser(userId: string) {
    // todo:
    console.log(userId)
}

function resetForm() {
    userService.getUserListPaging(defaultSearchValue)
}

function handleSubmitForm(formData: UserPaginatedSearchRequest) {
    if (formData.searchText !== '' || formData.roleId !== RoleEnum.Default) {
        userService.getUserListPaging(formData)
    }
}

function UserListComponent() {
    const modal = useModal()
    const navigate = useNavigate()

    useFetch(() => {
        userService.getUserListPaging(defaultSearchValue)
    })

    const pageResult = usePagination({
        items: userListTestData,
        pageSize: 5,
        pageIndex: 1,
        totalRecords: userListTestData.length
    })

    const { register, handleSubmit, reset } = useForm<UserPaginatedSearchRequest>({
        defaultValues: defaultSearchValue
    })

    const [userIdToDelete, setUserIdToDelete] = useState('')

    const handleDeleteUser = (userId: string) => {
        setUserIdToDelete(userId)
        modal.setShow(true)
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                buttonVariant={ButtonVariant.Danger}
                modalTitle='Delete confirm'
                handleClose={modal.handleClose}
                modalConfirmQuestion='Do you want to delete this user ?'
                handleConfirm={() => deleteUser(userIdToDelete)}
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
                                                            reset()
                                                            resetForm()
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

                            {/* Table */}
                            <div className='row'>
                                <table className='table table-bordered' id='dataTable' cellSpacing='0'>
                                    <thead>
                                        <tr>
                                            <th className='text-center'>User Name</th>
                                            <th className='text-center'>Email</th>
                                            <th className='text-center'>Phone</th>
                                            <th className='text-center'>Role</th>
                                            <th className='text-center'>Status</th>
                                            <th className='text-center'>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {pageResult.items?.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{user.role}</td>
                                                <td>{user.status}</td>
                                                <td className='badge badge-success'></td>

                                                <td className='text-center' style={{ width: '10%' }}>
                                                    <ActionButtonComponent
                                                        editRoute={`/user/edit?id=${user.id}`}
                                                        detailRoute={`/user/detail/${user.id}`}
                                                        deleteAction={() => handleDeleteUser(user.id)}
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
        </>
    )
}

export default UserListComponent
