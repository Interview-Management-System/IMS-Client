import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type ControlledProp<T extends FieldValues> = {
    name: Path<T>
    form: UseFormReturn<T, any, undefined>
    className?: string
}

export type ControlledInputProps<T extends FieldValues> = ControlledProp<T> & {
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoComplete?: HTMLInputAutoCompleteAttribute | undefined
}

export type ControlledSelectionProps<T extends FieldValues> = ControlledProp<T> & {
    optionList: { id: number | string; name: string | undefined | null }[]
}

export type ControlledTextAreaProps<T extends FieldValues> = ControlledProp<T> & {
    rows: number
}

export function capitalizeFirstCharacter(message: string = '') {
    if (!message) return message
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`
}
