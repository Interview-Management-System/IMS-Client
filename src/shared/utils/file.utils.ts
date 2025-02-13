export class FileUtils {
    static createPdfUrlFromBytes(bytes?: string) {
        if (!bytes) return ''

        const binaryData = atob(bytes)
        const byteNumbers = Uint8Array.from(binaryData, char => char.charCodeAt(0))

        const blob = new Blob([byteNumbers], { type: 'application/pdf' })
        return URL.createObjectURL(blob)
    }
}
