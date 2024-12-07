import { Controller, FieldValues, Path } from 'react-hook-form'
import { ControlledTextAreaProps } from './input-prop'

function ControlledTextArea<T extends FieldValues>({
    name,
    form,
    rows = 3,
    className = ''
}: ControlledTextAreaProps<T>) {
    return (
        <Controller
            defaultValue={'' as T[Path<T>]}
            name={name}
            control={form.control}
            render={({ field }) => (
                <textarea
                    {...field}
                    className={className}
                    rows={rows}
                    placeholder='Enter your message here...'
                ></textarea>
            )}
        />
    )
}

export default ControlledTextArea
