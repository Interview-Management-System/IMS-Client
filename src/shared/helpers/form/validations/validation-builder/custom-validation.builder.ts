import * as Yup from 'yup'

export function createDateValidation(isRequired: boolean = true) {
    return isRequired ? Yup.date().required('Date is required') : Yup.date()
}

export function createFileValidation() {
    return Yup.mixed()
        .optional()
        .test('type', 'Only PDF files are allowed', value => {
            if (value && value instanceof File) {
                return value.type === 'application/pdf'
            }
            return true
        })
}

export function createBooleanValidation() {
    return Yup.boolean().required('This field is required').oneOf([true, false], 'Invalid boolean value')
}
