import { Controller, FieldValues, Path } from 'react-hook-form'
import { capitalizeFirstCharacter, ControlledInputProps } from './input-prop'

function ControlledInput<T extends FieldValues>({
    name,
    form,
    type = 'text',
    placeholder = '',
    autoComplete = '',
    className = 'form-control'
}: ControlledInputProps<T>) {
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
                        />

                        <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                    </>
                )}
            />
        </>
    )
}

export default ControlledInput
