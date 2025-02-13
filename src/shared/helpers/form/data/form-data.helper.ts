export class FormDataHelper {
    static buildFormData(dataToBuild: any) {
        const formData = new FormData()

        for (const key in dataToBuild) {
            const value = (dataToBuild as any)[key]

            if (value instanceof Array) {
                value.forEach(item => formData.append(key, item))
            } else if (value instanceof FileList) {
                formData.append(key, value.item(0) as any)
            } else {
                formData.append(key, value)
            }
        }

        return formData
    }
}
