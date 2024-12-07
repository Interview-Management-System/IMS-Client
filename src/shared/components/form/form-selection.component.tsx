import { Controller, FieldValues, Path } from 'react-hook-form'
import { capitalizeFirstCharacter, ControlledSelectionProps } from './input-prop'

function ControlledSelection<T extends FieldValues>({
    form,
    name,
    className = 'form-control',
    optionList
}: ControlledSelectionProps<T>) {
    return (
        <Controller
            defaultValue={[] as T[Path<T>]}
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <select className={className} {...field}>
                        <option value={''}>Select your option</option>

                        {optionList.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>

                    <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                </>
            )}
        />
    )
}

export default ControlledSelection
