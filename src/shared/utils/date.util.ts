export class DateUtility {
    static formatDate(date?: Date, format?: 'dd/mm/yyyy' | 'yyyy/mm/dd' | 'mm/dd/yyyy') {
        if (!date) return

        const parsedDate = date instanceof Date ? date : new Date(date)

        if (isNaN(parsedDate.getTime())) return // Invalid date check

        const parts = {
            dd: parsedDate.getDate().toString().padStart(2, '0'),
            mm: (parsedDate.getMonth() + 1).toString().padStart(2, '0'),
            yyyy: parsedDate.getFullYear().toString()
        }

        return format?.replace('dd', parts.dd).replace('mm', parts.mm).replace('yyyy', parts.yyyy)
    }

    static formatRelativeDate(date?: string | Date): string | undefined {
        if (!date) return

        const parsedDate = date instanceof Date ? date : new Date(date)
        if (isNaN(parsedDate.getTime())) return // Invalid date check

        const now = new Date()

        // Calculate difference in calendar days (not milliseconds)
        const diffTime = now.getTime() - parsedDate.getTime()
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return 'Today'
        if (diffDays === 1) return 'Yesterday'
        if (diffDays < 7) return `${diffDays} days ago`

        const weeks = Math.floor(diffDays / 7)
        const remainingDays = diffDays % 7

        if (weeks === 1 && remainingDays === 0) return '1 week ago'
        if (weeks > 1 && remainingDays === 0) return `${weeks} weeks ago`

        // Showing weeks and total days for the rest of the cases
        return `${weeks} week${weeks > 1 ? 's' : ''} (${diffDays} days) ago`
    }
}
