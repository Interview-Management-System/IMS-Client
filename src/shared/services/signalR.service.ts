import * as signalR from '@microsoft/signalr'
import { HubConnectionState } from '@microsoft/signalr'

export default abstract class SignalRService {
    private connection: signalR.HubConnection | null = null
    private eventHandlers: Map<string, (...args: any[]) => void> = new Map()

    constructor(private hubUrl: string) {
        this.buildConnection()
        this.startConnection()
    }

    buildConnection() {
        if (this.hubUrl && !this.connection) {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(`https://localhost:7139${this.hubUrl}`, {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .withAutomaticReconnect()
                .build()
        }
    }

    startConnection() {
        if (this.connection?.state === HubConnectionState.Disconnected) {
            this.connection
                ?.start()
                .then(() => {
                    this.registerSignalEvents()
                    console.log('Connected to SignalR hub.')
                })
                .catch((err: any) => console.error('SignalR connection error:', err))
        }

        this.connection?.onclose(error => console.error('Connection closed:', error))
    }

    on(eventName: string, callback: (...args: any[]) => void): void {
        if (this.connection) {
            this.eventHandlers.set(eventName, callback)
            this.connection.on(eventName, callback)
        }
    }

    off(eventName: string, method?: (...args: any[]) => void): void {
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

    // Send a message to the server
    async send(eventName: string, ...args: any[]): Promise<void> {
        if (!this.connection) throw new Error('Connection is not established.')

        try {
            await this.connection.send(eventName, ...args)
        } catch (err) {
            console.error(`Error sending message to ${eventName}:`, err)
        }
    }

    stopConnection() {
        if (this.connection) {
            this.connection
                .stop()
                .then(() => {
                    this.removeAllListeners()
                    console.log(`SignalR connection ${this.connection?.state}`)
                    this.connection = null
                })
                .catch(err => console.error('Error stopping SignalR connection:', err))
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
        const events = (this as any).__signalEvents

        if (events && Array.isArray(events)) {
            for (const { signalEventName, method } of events) {
                // 'method' is the name of the method to call.
                const methodFn = (this as any)[method].bind(this)
                this.on(signalEventName, methodFn)
            }
        }
    }

    private removeAllListeners(): void {
        if (this.connection) {
            this.eventHandlers.forEach((_, eventName) => this.connection?.off(eventName))
            this.eventHandlers.clear()
        }
    }
}
