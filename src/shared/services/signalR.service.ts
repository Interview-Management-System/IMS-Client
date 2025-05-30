import * as signalR from '@microsoft/signalr'
import { HubConnectionState } from '@microsoft/signalr'
import { AutoInvokeMeta, SignalEventMeta } from '../utils/signalR.util'
import ToastUtility from '../utils/toast.util'

export default abstract class SignalRService {
    protected connection: signalR.HubConnection | null = null
    private eventHandlers: Map<string, (...args: any[]) => void> = new Map()

    constructor(private readonly hubUrl: string) {}

    buildConnection() {
        if (this.hubUrl && !this.connection) {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.REACT_APP_API_BASE_URL}${this.hubUrl}`, {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .withAutomaticReconnect()
                .build()
        }

        this.connection?.onclose(error => console.log('Connection closed:', error))
    }

    startConnection() {
        if (!this.connection || this.connection.state !== HubConnectionState.Disconnected) {
            return
        }

        this.connection
            ?.start()
            .then(() => {
                console.log(`Connected to SignalR ${this.hubUrl} hub.`)
                this.invokeAutoMethods()
                this.registerSignalEvents()
            })
            .catch((err: any) => console.error('SignalR connection error:', err))
    }

    stopConnection() {
        if (this.connection) {
            this.connection
                .stop()
                .then(() => {
                    this.removeAllListeners()
                    console.log(`SignalR connection for ${this.hubUrl} - ${this.connection?.state}`)
                    // this.connection = null
                })
                .catch(err => console.error('Error stopping SignalR connection:', err))
        }
    }

    protected on(eventName: string, callback: (...args: any[]) => void): void {
        if (this.connection) {
            this.eventHandlers.set(eventName, callback)
            this.connection.on(eventName, callback)
        }
    }

    protected off(eventName: string, method?: (...args: any[]) => void): void {
        if (this.connection) {
            if (method) {
                const callback = this.eventHandlers.get(eventName)

                if (callback) {
                    this.connection.off(eventName, callback)
                    this.eventHandlers.delete(eventName)
                }
            } else {
                this.connection.off(eventName)
            }
        }
    }

    protected async invoke<T>(methodName: string, ...args: any[]) {
        try {
            return await this.connection?.invoke<T>(methodName, ...args)
        } catch (error) {
            console.error(`Error invoking method ${methodName}:`, error)
            return undefined // Or throw the error, depending on desired error handling
        } finally {
        }
    }

    // Send a message to the server
    protected async send(eventName: string, ...args: any[]): Promise<void> {
        if (!this.connection) throw new Error('Connection is not established.')

        try {
            await this.connection.send(eventName, ...args)
        } catch (err) {
            console.error(`Error sending message to ${eventName}:`, err)
        }
    }

    private removeAllListeners(): void {
        if (this.connection) {
            this.eventHandlers.forEach((_, eventName) => this.connection?.off(eventName))
            this.eventHandlers.clear()
        }
    }

    /**
     * Automatically registers all event handlers defined via the @SignalEvent decorator.
     *
     * This method checks for a special metadata property `__signalEvents` on the instance's prototype.
     * This metadata is populated by the @SignalEvent decorator, which stores an array of event configurations,
     * each containing an event name and the corresponding method name.
     *
     * For each entry in the metadata, the method:
     *  - Retrieves the method from the instance.
     *  - Binds it to the instance (to ensure the correct `this` context).
     *  - Registers the method as a listener for the specified event on the SignalR connection by calling `on()`.
     *
     * **Note:** This method should only be called after the SignalR connection has been successfully started,
     * to ensure that the connection object is available and ready to accept event registrations.
     */
    private registerSignalEvents() {
        const events: SignalEventMeta[] = (this as any)._signalEvents

        if (events && Array.isArray(events)) {
            for (const { signalEventName, methodName } of events) {
                // 'method' is the name of the method to call.
                const methodFn = (this as any)[methodName].bind(this)
                this.on(signalEventName, methodFn)
            }
        }
    }

    /**
     * Iterates over all methods marked for automatic invocation, calls the corresponding SignalR server methods,
     * and passes the results to their respective handlers.
     *
     * Each method to be auto-invoked is described by an @AutoInvokes decorator, which specifies the SignalR method name
     * (`signalMethod`) and the local handler method name (`methodName`). The handler is called with the result of the invocation.
     *
     * If an error occurs during invocation, it is logged to the console.
     *
     * @returns {Promise<void>} A promise that resolves when all auto-invoked methods have been processed.
     */
    private async invokeAutoMethods(): Promise<void> {
        const methods: AutoInvokeMeta[] = (this as any)._autoInvokes || []

        ToastUtility.displayLoading()

        for (const { signalMethod, methodName } of methods) {
            try {
                const result = await this.connection?.invoke(signalMethod)
                const handler = (this as any)[methodName].bind(this)

                handler(result)
            } catch (e) {
                console.error(`AutoInvoke ${signalMethod} error`, e)
            }
        }
        ToastUtility.hideLoading()
    }
}
