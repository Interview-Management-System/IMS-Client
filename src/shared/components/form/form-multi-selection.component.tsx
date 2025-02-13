import { FieldValues } from 'react-hook-form'
import { ControlledSelectionProps } from './input-prop'

function ControlledMultiSelection<T extends FieldValues>({}: ControlledSelectionProps<T>) {
    return (
        <></>
        // <Controller
        //     name={name}
        //     control={form.control}
        //     defaultValue={[''] as any}
        //     render={({ field, fieldState: { error } }) => (
        //         <>
        //             <Select
        //                 isMulti={isMulti}
        //                 {...(field as any)}
        //                 closeMenuOnSelect={false}
        //                 options={
        //                     optionList.map(item => ({
        //                         value: item.id,
        //                         label: item.name
        //                     })) as { value: number; label: string }[]
        //                 }
        //                 onChange={(selectedOptions: any[]) => {
        //                     // Update the form with an array of values (ids)
        //                     const selectedIds = selectedOptions.map(option => option.value)
        //                     field.onChange(selectedIds) // Only store the array of ids
        //                 }}
        //                 // Map the selected ids to options for displaying the selected labels
        //                 value={optionList
        //                     .filter(item => field.value.includes(item.id))
        //                     .map(item => ({
        //                         value: item.id,
        //                         label: item.name || ''
        //                     }))}
        //             />
        //             <p className='text-danger'>{capitalizeFirstCharacter(error?.message!)}</p>
        //         </>
        //     )}
        // />
    )
}

export default ControlledMultiSelection
