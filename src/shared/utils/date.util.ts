export class DateUtility {
    static formatDate(date?: Date, format?: 'dd/mm/yyyy' | 'yyyy/mm/dd' | 'mm/dd/yyyy') {
        if (!(date instanceof Date) || isNaN(date.getTime())) return

        const parts = {
            dd: date.getDate().toString().padStart(2, '0'),
            mm: (date.getMonth() + 1).toString().padStart(2, '0'),
            yyyy: date.getFullYear().toString()
        }

        // Replace placeholders in the format string
        return format?.replace('dd', parts.dd).replace('mm', parts.mm).replace('yyyy', parts.yyyy)
    }
}
