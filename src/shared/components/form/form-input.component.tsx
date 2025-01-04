import { HTMLInputTypeAttribute } from 'react'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { capitalizeFirstCharacter, ControlledInputProps } from './input-prop'

function handlePhoneInput(e: React.ChangeEvent<HTMLInputElement>, inputType: HTMLInputTypeAttribute) {
    const value = e.target.value

    if (inputType === 'tel') {
        // Remove non-numeric characters
        e.target.value = value.replace(/[^0-9]/g, '')
    }
}

function ControlledInput<T extends FieldValues>({
    name,
    form,
    type = 'text',
    placeholder = '',
    autoComplete = '',
    className = 'form-control'
}: ControlledInputProps<T>) {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (type === 'tel') {
            // Remove non-numeric characters
            e.target.value = value.replace(/[^0-9]/g, '')
        }
    }

    return (
        <>
            <Controller
                defaultValue={'' as T[Path<T>]}
                name={name}
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input
                            id={name}
                            {...field}
                            type={type}
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            className={className}
                            accept={type === 'file' ? 'application/pdf' : ''}
                            onChange={e => field.onChange(e.target.value)}
                            onInput={handleInput}
                        />

                        <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                    </>
                )}
            />
        </>
    )
}

export default ControlledInput
