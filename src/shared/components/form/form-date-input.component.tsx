import { Controller, FieldValues } from 'react-hook-form'
import { capitalizeFirstCharacter, ControlledDateInputProps } from './input-prop'

function ControlledDateInput<T extends FieldValues>({
    name,
    form,
    dateType = 'date',
    className = 'form-control'
}: ControlledDateInputProps<T>) {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                    <input
                        type={dateType}
                        className={className}
                        value={value ? new Date(value).toISOString().split('T')[0] : ''}
                        onChange={e => {
                            const targetValue = e.target.value
                            const date = targetValue ? new Date(targetValue) : null

                            onChange(date)
                        }}
                    />

                    <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                </>
            )}
        />
    )
}

export default ControlledDateInput
