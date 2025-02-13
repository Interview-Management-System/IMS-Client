import { FieldValues, Path, PathValue } from 'react-hook-form'
import { GenderEnum, UserStatusEnum } from '../../enums/entity-enums/master-data.enum'
import { ControlledSelectionProps } from './input-prop'

function getDisplayValue<T>(value: string, fieldValue?: PathValue<T, Path<T>>) {
    if (value === 'gender') {
        return fieldValue === true ? GenderEnum.Male : fieldValue === false ? GenderEnum.Female : ''
    } else if (value === 'isActive') {
        return fieldValue === true
            ? UserStatusEnum.Active
            : fieldValue === false
            ? UserStatusEnum.InActive
            : ''
    }

    return fieldValue ?? ''
}

function ControlledSelectionssss<T extends FieldValues>({}: ControlledSelectionProps<T>) {
    return (
        <></>
        // <Controller
        //     defaultValue={undefined as T[Path<T>]}
        //     name={name}
        //     control={form.control}
        //     render={({ field, fieldState: { error } }) => {
        //         return (
        //             <>
        //                 <select
        //                     {...field}
        //                     className={className}
        //                     {...form.register(name, registerOptions)}
        //                     value={getDisplayValue<T>(name, field.value)}
        //                 >
        //                     <option value=''>Select your option</option>

        //                     {optionList.map(option => (
        //                         <option key={option.id} value={option.id}>
        //                             {option.name}
        //                         </option>
        //                     ))}
        //                 </select>

        //                 <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
        //             </>
        //         )
        //     }}
        // />
    )
}
export default ControlledSelectionssss

/*


function getDisplayValue<T>(value: string, fieldValue?: PathValue<T, Path<T>>) {
    if (value === 'gender') {
        return fieldValue === true ? GenderEnum.Male : fieldValue === false ? GenderEnum.Female : ''
    } else if (value === 'isActive') {
        return fieldValue === true ? StatusEnum.Active : fieldValue === false ? StatusEnum.InActive : ''
    }

    return fieldValue ?? ''
}




 // value={getDisplayValue<T>(name, field.value)} // Ensure the correct value is displayed
                           
                            onChange={e => {
                                const selectedValue = e.target.value
                                const option = optionList.find(option => String(option.id) === selectedValue)

                                let convertedValue: null | string | number | boolean = null

                                if (option !== undefined) {
                                    // Handle special cases
                                    if (name === 'gender') {
                                        convertedValue = +option.id === GenderEnum.Male
                                    } else if (name === 'isActive') {
                                        convertedValue = +option.id === StatusEnum.Active
                                    } else {
                                        convertedValue =
                                            typeof option.id === 'number' ? +option.id : option.id
                                    }
                                }
                                field.onChange(convertedValue)
                            }}
                           



*/
