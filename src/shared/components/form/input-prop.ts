import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type ControlledProp<T extends FieldValues> = {
    name: Path<T>
    form: UseFormReturn<T, any, undefined>
    className?: string
}

export type OptionType = {
    value: string | number | boolean
    label: string
}

export type ControlledInputProps<T extends FieldValues> = ControlledProp<T> & {
    value?: string | number
    placeholder?: string
    type?: Exclude<HTMLInputTypeAttribute, 'date' | 'datetime-local'>
    autoComplete?: HTMLInputAutoCompleteAttribute | undefined
}

// export type ControlledSelectionProps<T extends FieldValues> = ControlledProp<T> & {
//     isMulti?: boolean
//     registerOptions?: RegisterOptions<T, Path<T>>
//     optionList: { id: number | string; name: string | undefined | null }[]
// }

export type ControlledTextAreaProps<T extends FieldValues> = ControlledProp<T> & {
    rows?: number
}

export type ControlledDateInputProps<T extends FieldValues> = ControlledProp<T> & {
    dateType?: 'date' | 'datetime-local'
}

export type ControlledSelectionProps<T extends FieldValues> = ControlledProp<T> & {
    isMulti?: boolean
    options: OptionType[]
    closeMenuOnSelect?: boolean
}

export function capitalizeFirstCharacter(message: string = '') {
    if (!message) return message
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`
}
