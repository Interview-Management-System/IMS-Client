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

    constructor() {
        makeAutoObservable(this)
    }

    setButonInfos(buttonInfos: ButtonInfo[]) {
        this.buttonInfos = buttonInfos
    }

    clearButtons() {
        this.buttonInfos = []
    }
}

const tableActionStore = new TableActionStore()
export default tableActionStore
