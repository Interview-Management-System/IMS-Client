export class AbortSignalManager {
    private static controller: AbortController | null = null

    static get signal(): AbortSignal | undefined {
        return AbortSignalManager.controller?.signal
    }

    static initialize() {
        AbortSignalManager.controller = new AbortController()
    }

    static abort() {
        AbortSignalManager.controller?.abort()
        AbortSignalManager.controller = null
    }
}
