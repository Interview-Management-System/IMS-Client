/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message'
import { FieldErrors, FieldName, FieldValues } from 'react-hook-form'

interface ErrorMessageProps<T extends FieldValues> {
    fieldName: keyof T
    errors: FieldErrors<T>
}

function capitalizeFirstCharacter(message: string) {
    if (!message) return message
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`
}

function ErrorMessageComponent<T extends FieldValues>({ fieldName, errors }: ErrorMessageProps<T>) {
    return (
        <ErrorMessage
            errors={errors}
            name={fieldName as FieldName<FieldValuesFromFieldErrors<T>>}
            render={({ message }) => <p className='text-danger'>{capitalizeFirstCharacter(message)}</p>}
        />
    )
}

export default ErrorMessageComponent
