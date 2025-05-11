import { faEye, faPenToSquare, faToggleOff, faToggleOn, faTrash } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
    UserPaginatedSearchRequest,
    UserPaginationRetrieveDTO
} from '../../../../../modules/user/models/user.model'
import userService from '../../../../../modules/user/services/user.service'
import userStore from '../../../../../modules/user/stores/user.store'
import ButtonActionComponent from '../../../../../shared/components/buttons/button-action.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import TablePaginationComponent from '../../../../../shared/components/table/table-pagination.component'
import { ButtonColor } from '../../../../../shared/enums/button.enum'
import { RoleEnum } from '../../../../../shared/enums/entity-enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import useModal from '../../../../../shared/hooks/use-modal'
import usePaginatedSearch from '../../../../../shared/hooks/use-paginated-search'
import useSignalR from '../../../../../shared/hooks/use-signalR'
import useTableAcion from '../../../../../shared/hooks/use-table-action'
import { TableColumn } from '../../../../../shared/models/table-config'

function UserListComponent() {
    useSignalR(userService)

    const navigate = useNavigate()
    const pageResult = userStore.userPageResult
    const searchForm = useForm<UserPaginatedSearchRequest>()

    const { show, closeModal, modalTitle, modalConfirmQuestion, modalConfirmHandler, confirm } = useModal()

    useTableAcion([
        {
            label: 'Detail',
            variant: 'primary',
            isDisable: true,
            onClick: () => {
                console.log(32)
            }
        },
        {
            label: 'Edit',
            variant: 'info',
            onClick: () => {}
        },
        {
            label: 'Profile',
            variant: 'success',
            onClick: () => {}
        }
    ])

    const userTableColumns = [
        { header: 'User Name', accessor: 'username', sortable: true },
        { header: 'Email', accessor: 'email', sortable: true },
        { header: 'Phone', accessor: 'phoneNumber', sortable: true },
        { header: 'Role', accessor: 'role', sortable: false },
        { header: 'Status', accessor: 'userStatus.statusText', sortable: false }
    ] as TableColumn<UserPaginationRetrieveDTO>[]

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
                buttonColor={ButtonColor.Danger}
                handleConfirm={modalConfirmHandler}
                modalConfirmQuestion={modalConfirmQuestion}
            />

            <TablePaginationComponent<UserPaginationRetrieveDTO, UserPaginatedSearchRequest>
                tableConfig={{
                    tableName: 'User List',
                    columns: userTableColumns,
                    paginationResult: pageResult,
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
                            {user.userStatus?.isActive ? (
                                <ButtonActionComponent
                                    icon={faToggleOff}
                                    tooltipName='De-active'
                                    buttonColor={ButtonColor.Dark}
                                    action={() => confirmDeActivateUser(user.id)}
                                />
                            ) : (
                                <ButtonActionComponent
                                    icon={faToggleOn}
                                    tooltipName='Active'
                                    buttonColor={ButtonColor.Success}
                                    action={() => confirmActivateUser(user.id)}
                                />
                            )}
                        </>
                    )
                }}
            />
        </>
    )
}

export default observer(UserListComponent)
