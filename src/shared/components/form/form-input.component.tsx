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
    value,
    name,
    form,
    type = 'text',
    placeholder = '',
    autoComplete = '',
    className = 'form-control'
}: ControlledInputProps<T>) {
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'tel') {
            const value = e.target.value
            // Remove non-numeric characters
            e.target.value = value.replace(/[^0-9]/g, '')
        }
    }

    return (
        <>
            <Controller
                name={name}
                control={form.control}
                defaultValue={'' as T[Path<T>]}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input
                            id={name}
                            {...field}
                            type={type}
                            onInput={handleInput}
                            className={className}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            // onChange={e => field.onChange(e.target.value)}
                        />

                        <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                    </>
                )}
            />
        </>
    )
}

export default ControlledInput
