export class FileUtils {
    static createPdfUrlFromBytes(bytes: string) {
        const base64Data = bytes
        const binaryData = atob(base64Data)
        const byteNumbers = new Uint8Array(binaryData.length)

        for (let i = 0; i < binaryData.length; i++) {
            byteNumbers[i] = binaryData.charCodeAt(i)
        }

        const blob = new Blob([byteNumbers], { type: 'application/pdf' })
        return URL.createObjectURL(blob)
    }
}
