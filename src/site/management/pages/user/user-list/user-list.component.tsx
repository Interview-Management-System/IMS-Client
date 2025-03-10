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
import Button from 'react-bootstrap/esm/Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
    UserForPaginationRetrieveDTO,
    UserPaginatedSearchRequest
} from '../../../../../modules/user/models/user.model'
import userService from '../../../../../modules/user/services/user.service'
import userStore from '../../../../../modules/user/stores/user.store'
import ButtonActionComponent from '../../../../../shared/components/buttons/button-action.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import PaginationComponent from '../../../../../shared/components/table/components/pagination/pagination.component'
import TablePaginationComponent from '../../../../../shared/components/table/table-pagination.component'
import { ButtonColor } from '../../../../../shared/enums/button.enum'
import { RoleEnum } from '../../../../../shared/enums/entity-enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import useModal from '../../../../../shared/hooks/use-modal'
import usePaginatedSearch from '../../../../../shared/hooks/use-paginated-search'
import { TableConfig } from '../../../../../shared/models/table-config'

function handleSearchUser(formData: UserPaginatedSearchRequest) {
    if (formData.roleId !== RoleEnum.Default || formData.searchText?.trim() !== '') {
        userStore.setUserPaginationSearchValue(formData)
        userService.getUserListPaging()
    }
}
function UserListComponent() {
    const navigate = useNavigate()
    const pageResult = userStore.userPageResult
    const searchForm = useForm<UserPaginatedSearchRequest>()
    const { show, closeModal, modalTitle, modalConfirmQuestion, modalConfirmHandler, confirm } = useModal()

    useFetch(() => userService.getUserListPaging())

    const userTableConfig: TableConfig<UserForPaginationRetrieveDTO> = {
        columns: [
            { header: 'User Name', accessor: 'username', sortable: true },
            { header: 'Email', accessor: 'email', sortable: true },
            { header: 'Phone', accessor: 'phoneNumber', sortable: true },
            { header: 'Role', accessor: 'role', sortable: false },
            { header: 'Status', accessor: 'userStatus.statusText', sortable: false }
        ]
    }

    const { resetForm, onPageIndexChange, onPageSizeChange, onSortChange } = usePaginatedSearch({
        form: searchForm,
        resetSearch: userStore.resetUserPaginationSearchValue,
        getListPaging: userService.getUserListPaging,
        setSearchValue: userStore.setUserPaginationSearchValue
    })

    // Delete
    function confirmDeleteUser(userId: string) {
        confirm('Delete confirmation', 'Are you sure you want to delete ?', () =>
            userService.deleteUser(userId)
        )
    }

    // Activate
    function confirmActivateUser(userId: string) {
        confirm('Active confirmation', 'Are you sure you want to activate ?', () =>
            userService.activateUser(userId)
        )
    }

    // De-Activate
    function confirmDeActivateUser(userId: string) {
        confirm('De-activate confirmation', 'Are you sure you want to de-activate ?', () =>
            userService.deActivateUser(userId)
        )
    }

    return (
        <>
            <ModalConfirmComponent
                show={show}
                modalTitle={modalTitle}
                handleClose={closeModal}
                buttonColor={ButtonColor.Danger}
                handleConfirm={modalConfirmHandler}
                modalConfirmQuestion={modalConfirmQuestion}
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
                                        <form
                                            className='user'
                                            onSubmit={searchForm.handleSubmit(handleSearchUser)}
                                        >
                                            <div className='row'>
                                                {/* Status dropdown */}
                                                <select
                                                    className='form-control col-md-5 '
                                                    {...searchForm.register('roleId', {
                                                        valueAsNumber: true
                                                    })}
                                                >
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
                                                        {...searchForm.register('searchText')}
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

                            <TablePaginationComponent
                                items={pageResult.items}
                                tableConfig={userTableConfig}
                                onSortChange={onSortChange}
                                renderActions={user => {
                                    return (
                                        <>
                                            <ButtonActionComponent
                                                icon={faEye}
                                                tooltipName='Details'
                                                buttonColor={ButtonColor.Primary}
                                                action={() => navigate(`/user/detail/${user.id}`)}
                                            />

                                            <ButtonActionComponent
                                                icon={faPenToSquare}
                                                tooltipName='Edit'
                                                buttonColor={ButtonColor.Info}
                                                action={() => navigate(`/user/edit/${user.id}`)}
                                            />

                                            <ButtonActionComponent
                                                icon={faTrash}
                                                tooltipName='Delete'
                                                buttonColor={ButtonColor.Danger}
                                                action={() => confirmDeleteUser(user.id)}
                                            />

                                            {/* Active or deactive */}
                                            <>
                                                {user.userStatus?.isActive && (
                                                    <ButtonActionComponent
                                                        icon={faToggleOff}
                                                        tooltipName='De-active'
                                                        buttonColor={ButtonColor.Dark}
                                                        action={() => confirmDeActivateUser(user.id)}
                                                    />
                                                )}

                                                {!user.userStatus?.isActive && (
                                                    <ButtonActionComponent
                                                        icon={faToggleOn}
                                                        tooltipName='Active'
                                                        buttonColor={ButtonColor.Success}
                                                        action={() => confirmActivateUser(user.id)}
                                                    />
                                                )}
                                            </>
                                        </>
                                    )
                                }}
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
