export class DateUtility {
    static formatDate(date: Date, format: 'dd/mm/yyyy' | 'yyyy/mm/dd' | 'mm/dd/yyyy') {
        if (date === null) return

        const parts = {
            dd: String(date.getDate()).padStart(2, '0'),
            mm: String(date.getMonth() + 1).padStart(2, '0'),
            yyyy: date.getFullYear()
        }

        return format.replace('dd', parts.dd).replace('mm', parts.mm).replace('yyyy', String(parts.yyyy))
    }
}
