import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type ControlledInputProps<T extends FieldValues> = {
    name: Path<T>
    label?: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoComplete?: HTMLInputAutoCompleteAttribute | undefined
    form: UseFormReturn<T, any, undefined>
}

function capitalizeFirstCharacter(message: string = '') {
    if (!message) return message
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`
}

function ControlledInput<T extends FieldValues>({
    name,
    form,
    label,
    type = 'text',
    placeholder = '',
    autoComplete = ''
}: ControlledInputProps<T>) {
    return (
        <>
            <div className='form-group'>
                <label htmlFor={name} className='form-label'>
                    {label}
                </label>

                <Controller
                    defaultValue={'' as T[Path<T>]}
                    name={name}
                    control={form.control}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <div className='input-group'>
                                <input
                                    id={name}
                                    {...field}
                                    type={type}
                                    autoComplete={autoComplete}
                                    placeholder={placeholder}
                                    className='form-control form-control-lg'
                                />
                            </div>

                            <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                        </>
                    )}
                />
            </div>
        </>
    )
}

export default ControlledInput
