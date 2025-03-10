export class EnumBuilder {
    /**
     * Generates a list of enum entries with id and name.
     * Works for both numeric and string enums.
     */
    static generateEnumList<T extends Record<string, number | string | boolean>, U>(
        enumObj: T,
        enumValueType: U
    ) {
        return Object.entries(enumObj)
            .filter(([key, value]) => {
                // Exclude the 'Default' in enum
                if (key === 'Default') return false

                if (enumValueType === Number) {
                    return typeof value === 'number' // Filter for number enums
                } else if (enumValueType === String) {
                    return typeof value === 'string' // Filter for string enums
                } else if (enumValueType === Boolean) {
                    return typeof value === 'number' && (value === 0 || value === 1) // Filter for string enums
                }
                return false
            })
            .map(([key, value]) => ({
                value:
                    enumValueType === Boolean
                        ? (value as number) === 1 // Convert 1 → true, 0 → false
                        : value, // Use the enum value as the id
                label: EnumBuilder.formatEnumName(key) // Format the enum key for display
            }))
    }

    /**
     * Formats an enum key into a human-readable string.
     */
    private static formatEnumName(enumValue: string): string {
        return enumValue
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase
            .replace(/(\d+)/g, ' $1 ') // Add space before numbers
            .replace(/_/g, ' ') // Replace underscores with spaces
            .trim()
    }

    static areAllEnumValuesNumbers<T extends Record<string, number | string>>(enumObj: T): boolean {
        return Object.values(enumObj).every(value => typeof value === 'number')
    }
}
