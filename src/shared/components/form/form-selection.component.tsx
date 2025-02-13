import { Controller, FieldValues, Path } from 'react-hook-form'
import Select from 'react-select'
import { capitalizeFirstCharacter, ControlledSelectionProps } from './input-prop'

function ControlledSelection<T extends FieldValues>({
    name,
    form,
    options,
    isMulti = false,
    closeMenuOnSelect = true
}: ControlledSelectionProps<T>) {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Select
                        {...field}
                        isClearable
                        defaultValue={'' as T[Path<T>]}
                        isMulti={isMulti}
                        options={options}
                        closeMenuOnSelect={closeMenuOnSelect}
                        value={
                            field.value !== undefined
                                ? isMulti
                                    ? options.filter(option => (field.value as any[]).includes(option.value))
                                    : options.find(option => option.value === field.value)
                                : null
                        }
                        onChange={selectedOption => {
                            form.setValue(
                                name,
                                isMulti
                                    ? (selectedOption as any[]).map(option => option.value)
                                    : selectedOption !== null && selectedOption !== undefined
                                    ? (selectedOption as any).value
                                    : null
                            )
                        }}
                    />

                    <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
                </>
            )}
        />
    )
}

export default ControlledSelection
