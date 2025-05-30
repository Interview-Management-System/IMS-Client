import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite'
import { UserPaginatedSearchRequest, UserPaginationRetrieveDTO } from 'modules/user/models/user.model'
import userService from 'modules/user/services/user.service'
import userStore from 'modules/user/stores/user.store'
import UserTableActionUtil from 'modules/user/utils/user-table-action.util'
import { Badge } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ButtonActionComponent from 'shared/components/buttons/button-action.component'
import ModalConfirmComponent from 'shared/components/modals/modal-confirm/modal-confirm.component'
import TablePaginationComponent from 'shared/components/table/table-pagination.component'
import { RoleEnum } from 'shared/enums/entity-enums/master-data.enum'
import { EnumList } from 'shared/helpers/enums/enum-list.helper'
import useModal from 'shared/hooks/use-modal'
import usePaginatedSearch from 'shared/hooks/use-paginated-search'
import useSignalR from 'shared/hooks/use-signalR'
import { useTableAction } from 'shared/hooks/use-table'
import { TableColumn } from 'shared/models/table-config'

function UserListComponent() {
    useSignalR(userService)

    const navigate = useNavigate()
    const searchForm = useForm<UserPaginatedSearchRequest>()
    const { show, closeModal, modalTitle, modalConfirmQuestion, modalConfirmHandler, confirm } = useModal()

    useTableAction([
        {
            label: 'Activate',
            variant: 'success',
            isDisable: UserTableActionUtil.canActivate(),
            onClick: () => {
                confirm('Activate confirmation', 'Are you sure you want to activate ?', () =>
                    userService.activateUser()
                )
            }
        },
        {
            label: 'De-activate',
            variant: 'warning',
            isDisable: UserTableActionUtil.canDeactivate(),
            onClick: () =>
                confirm('De-activate confirmation', 'Are you sure you want to de-activate ?', () =>
                    userService.deActivateUser()
                )
        },
        {
            label: 'Delete',
            variant: 'danger',
            isDisable: UserTableActionUtil.canDelete(),
            onClick: () =>
                confirm('Delete confirmation', 'Are you sure you want to delete ?', () =>
                    userService.deleteUser()
                )
        }
    ])

    const userTableColumns = [
        { header: 'User Name', accessor: 'username', sortable: true },
        { header: 'Email', accessor: 'email', sortable: true },
        { header: 'Phone', accessor: 'phoneNumber', sortable: true },
        { header: 'Role', accessor: 'role', sortable: false },
        {
            header: 'Status',
            accessor: 'userStatus.statusText',
            sortable: false,
            render: (user: UserPaginationRetrieveDTO) => {
                const isActive = user.userStatus?.isActive
                return (
                    <Badge className='badge-text-font' bg={isActive ? 'success' : 'danger'}>
                        {user.userStatus?.statusText}
                    </Badge>
                )
            }
        }
    ] satisfies TableColumn<UserPaginationRetrieveDTO>[]

    const { resetForm, onPageIndexChange, onPageSizeChange, onSortChange } = usePaginatedSearch({
        form: searchForm,
        onReset: () => userStore.resetUserPaginationSearchValue(),
        getListPaging: () => userService.getUserListPaging(),
        onSearch: formData => userStore.setUserPaginationSearchValue(formData)
    })

    function handleSearchUser(formData: UserPaginatedSearchRequest) {
        if (formData.roleId !== RoleEnum.Default || formData.searchText?.trim() !== '') {
            userStore.setUserPaginationSearchValue(formData)
            userService.getUserListPaging()
        }
    }

    return (
        <>
            <ModalConfirmComponent
                show={show}
                modalTitle={modalTitle}
                handleClose={closeModal}
                buttonColor='danger'
                handleConfirm={modalConfirmHandler}
                modalConfirmQuestion={modalConfirmQuestion}
            />

            <TablePaginationComponent<UserPaginationRetrieveDTO, UserPaginatedSearchRequest>
                tableConfig={{
                    tableName: 'User List',
                    columns: userTableColumns,
                    paginationResult: userStore.userPageResult,
                    createPageRoute: '/user/create'
                }}
                tableSearchForm={{
                    resetForm: resetForm,
                    searchForm: searchForm,
                    handleSearch: handleSearchUser,
                    filterOptions: [
                        {
                            filterOptionKey: 'roleId',
                            options: EnumList.roleList
                        }
                    ]
                }}
                tableActions={{
                    onSortChange: onSortChange,
                    onPageSizeChange: onPageSizeChange,
                    onPageIndexChange: onPageIndexChange,
                    renderActions: user => (
                        <>
                            <ButtonActionComponent
                                icon={faEye}
                                tooltipName='Details'
                                buttonColor='primary'
                                action={() => navigate(`/user/detail/${user.id}`)}
                            />
                            <ButtonActionComponent
                                icon={faPenToSquare}
                                tooltipName='Edit'
                                buttonColor='info'
                                action={() => navigate(`/user/edit/${user.id}`)}
                            />
                        </>
                    )
                }}
            />
        </>
    )
}

export default observer(UserListComponent)
