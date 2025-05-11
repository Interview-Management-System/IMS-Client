class CancelManager {
    private static controllers = new Map<string, AbortController>()

    static create(): AbortSignal {
        const controller = new AbortController()
        CancelManager.controllers.set(crypto.randomUUID(), controller)

        return controller.signal
    }

    static cancel(key: string) {
        const controller = CancelManager.controllers.get(key)
        if (controller) {
            controller.abort()
            CancelManager.controllers.delete(key)
        }
    }

    static cancelAll() {
        // const controllers = CancelManager.controllers.values().toArray()
        // for (const controller of controllers) {
        //     controller.abort()
        // }
        // CancelManager.controllers.clear()
    }
}

export default CancelManager

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
