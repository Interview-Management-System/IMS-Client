import { useEffect } from 'react'
import tableActionStore, { ButtonInfo } from '../stores/table-action.store'

/**
 * A custom React hook that manages table action buttons by interacting with a store.
 *
 * @param buttonInfos - An array of `ButtonInfo` objects that define the configuration
 * of the table action buttons.
 *
 * @remarks
 * - This hook uses the `useEffect` hook to set the button information in the `tableActionStore`
 * when the component mounts or when `buttonInfos` changes.
 * - When the component unmounts, it clears the button information from the store.
 *
 * @example
 * ```tsx
 * const buttonInfos = [
 *   { label: 'Edit', onClick: handleEdit },
 *   { label: 'Delete', onClick: handleDelete },
 * ];
 *
 * useTableAction(buttonInfos);
 * ```
 */
export default function useTableAcion(buttonInfos: ButtonInfo[]) {
    useEffect(() => {
        tableActionStore.setButonInfos(buttonInfos)

        return () => {
            tableActionStore.clearButtons()
        }
    })
}
