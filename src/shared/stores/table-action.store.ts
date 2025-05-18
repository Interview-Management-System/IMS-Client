import { makeAutoObservable } from 'mobx'
import { ButtonVariant } from 'react-bootstrap/esm/types'

export type ButtonInfo = {
    label: string
    isDisable?: boolean
    onClick?: () => void
    variant?: ButtonVariant
}

export class TableActionStore {
    buttonInfos = [] as ButtonInfo[]
    selectedRowKeys: (string | number)[] = []

    get isRowSelected() {
        return this.selectedRowKeys.length > 0
    }

    constructor() {
        makeAutoObservable(this)
    }

    /******************************************************* Buttons *******************************/
    setButtonInfos(buttonInfos: ButtonInfo[]) {
        this.buttonInfos = buttonInfos
    }

    clearButtons() {
        this.buttonInfos = []
    }

    /******************************************************* Select *******************************/
    setSelectedRowKeys(keys: (string | number)[]) {
        this.selectedRowKeys = keys
    }

    addSelectedRowKeys(keys: (string | number)[]) {
        this.selectedRowKeys = Array.from(new Set([...this.selectedRowKeys, ...keys]))
    }

    removeSelectedRowKeys() {
        this.selectedRowKeys = []
    }

    toggleRowKey(key: string | number) {
        if (this.selectedRowKeys.includes(key)) {
            this.selectedRowKeys = this.selectedRowKeys.filter(k => k !== key)
        } else {
            this.selectedRowKeys = [...this.selectedRowKeys, key]
        }
    }
}

const tableActionStore = new TableActionStore()
export default tableActionStore
