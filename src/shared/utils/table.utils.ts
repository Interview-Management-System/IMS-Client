import tableActionStore from '../stores/table-action.store'

export default class TableUtils {
    /**
     * Returns the items from the provided list that are currently selected, based on their `id` property.
     *
     * @template T - The type of items, which must have an `id` property of type `string` or `number`.
     * @param pageResultItems - The array of items to filter, or `undefined`.
     * @returns An array of items whose `id` is included in the `selectedRowKeys` from the `tableActionStore`.
     */
    static getSelectedItems<T extends { id: string | number }>(pageResultItems: T[] | undefined) {
        const selectedRowKeys = tableActionStore.selectedRowKeys
        return pageResultItems?.filter(item => selectedRowKeys.includes(item.id)) ?? []
    }
}
