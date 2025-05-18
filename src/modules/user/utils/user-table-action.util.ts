import TableUtils from '../../../shared/utils/table.utils'
import userStore from '../stores/user.store'

export default class UserTableActionUtil {
    static canDelete() {
        const selectedItems = TableUtils.getSelectedItems(userStore.userPageResult.items)
        return selectedItems.length > 0 && selectedItems.every(item => item.isDeleted === false)
    }

    static canActivate() {
        const selectedItems = TableUtils.getSelectedItems(userStore.userPageResult.items)
        return selectedItems.length > 0 && selectedItems.every(item => item.userStatus?.isActive === false)
    }

    static canDeactivate() {
        const selectedItems = TableUtils.getSelectedItems(userStore.userPageResult.items)
        return selectedItems.length > 0 && selectedItems.every(item => item.userStatus?.isActive)
    }
}
