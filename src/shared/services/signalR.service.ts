import * as signalR from '@microsoft/signalr'

export default class SignalRService {
    private connection: signalR.HubConnection | null = null

    constructor(private hubUrl: string) {
        this.setupConnection()
        this.startConnection()
    }

    private setupConnection() {
        if (this.hubUrl) {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(`https://localhost:7139${this.hubUrl}`, {
                    skipNegotiation: true, // skipNegotiation as we specify WebSockets
                    transport: signalR.HttpTransportType.WebSockets // force WebSocket transport
                })
                // .configureLogging(signalR.LogLevel.Information)
                .withAutomaticReconnect()
                .build()
        }
    }

    private startConnection() {
        this.connection
            ?.start()
            .then(() => console.log('Connected to SignalR hub.'))
            .catch((err: any) => console.error('SignalR connection error:', err))

        this.connection?.onclose(error => {
            console.error('Connection closed:', error)
        })
    }

    // Register a listener for a specific event
    on(eventName: string, callback: (...args: any[]) => void) {
        this.connection?.on(eventName, callback)
    }

    // Remove a listener for a specific event
    off(eventName: string) {
        this.connection?.off(eventName)
    }

    // Send a message to the server
    public async send(eventName: string, ...args: any[]): Promise<void> {
        if (!this.connection) throw new Error('Connection is not established.')

        try {
            await this.connection.send(eventName, ...args)
        } catch (err) {
            console.error(`Error sending message to ${eventName}:`, err)
        }
    }

    // Stop the connection
    stopConnection() {
        if (this.connection) {
            this.connection
                .stop()
                .then(() => {
                    this.connection = null
                    console.log('SignalR connection stopped.')
                })
                .catch(err => console.error('Error stopping SignalR connection:', err))
        }
    }

    registerSignalHandlers(handlers: { [key: string]: () => void }) {
        Object.keys(handlers).forEach(eventName => this.on(eventName, handlers[eventName]))
    }
}
