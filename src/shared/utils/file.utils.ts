export class FileUtils {
    static async createPdfUrl(pdfUrl: string) {
        const blob = await FileUtils.fetchFileFromUrl(pdfUrl)
        return URL.createObjectURL(blob!)
    }

    static async createImageUrl(imageUrl: string) {
        const blob = await FileUtils.fetchFileFromUrl(imageUrl)
        return URL.createObjectURL(blob!)
    }

    private static async fetchFileFromUrl(url?: string) {
        if (url) {
            const response = await fetch(url)
            return await response.blob()
        }
    }

    static async fetchFileUrl(fileUrl: string) {
        if (!fileUrl) return null

        try {
            const response = await fetch(fileUrl)
            const blob = await response.blob()

            return URL.createObjectURL(blob)
        } catch (error) {
            console.error('Error fetching file:', error)
            return null
        }
    }
}
