export class EnumBuilder {
    static generateEnumList<T extends Record<string, number | string>>(enumObj: T) {
        return Object.values(enumObj)
            .filter(v => typeof v === 'number')
            .map(value => ({
                id: value as number,
                name: EnumBuilder.getEnumName(enumObj, value as T[keyof T])
            }))
    }

    static getEnumName<T extends Record<string, number | string>>(
        enumObj: T,
        value: T[keyof T]
    ): string | undefined {
        const name = Object.entries(enumObj).find(([_, v]) => v === value)?.[0]
        return name ? EnumBuilder.formatEnumName(name) : undefined
    }

    private static formatEnumName(enumValue: string): string {
        return enumValue
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase
            .replace(/(\d+)/g, ' $1 ') // Add space before numbers
            .replace(/_/g, ' ') // Replace underscores with spaces
            .trim()
    }
}
