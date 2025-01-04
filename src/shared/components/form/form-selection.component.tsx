import { Controller, FieldValues, Path, PathValue } from 'react-hook-form'
import { GenderEnum } from '../../enums/entity-enums/master-data.enum'
import { capitalizeFirstCharacter, ControlledSelectionProps } from './input-prop'

function getDisplayValue<T>(value: string, fieldValue: PathValue<T, Path<T>>) {
    if (value === 'gender') {
        return fieldValue === true ? GenderEnum.Male : fieldValue === false ? GenderEnum.Female : ''
    }
    return fieldValue
}

function ControlledSelection<T extends FieldValues>({
    form,
    name,
    className = 'form-control',
    optionList
}: ControlledSelectionProps<T>) {
    return (
        <Controller
            defaultValue={undefined as T[Path<T>]}
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <>
                        <select
                            className={className}
                            {...field}
                            value={getDisplayValue<T>(name, field.value)} // Ensure the correct value is displayed
                            onChange={e => {
                                const selectedValue = e.target.value
                                const option = optionList.find(option => String(option.id) === selectedValue)

                                let convertedValue: null | string | number | boolean = null

                                if (option !== undefined) {
                                    // Handle special case for gender
                                    if (name === 'gender') {
                                        convertedValue = +option.id === GenderEnum.Male
                                    } else {
                                        convertedValue =
                                            typeof option.id === 'number' ? +option.id : option.id
                                    }
                                }

                                field.onChange(convertedValue)
                            }}
                        >
                            <option value={undefined}>Select your option</option>

                            {optionList.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>

                        <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                    </>
                )
            }}
        />
    )
}

export default ControlledSelection
