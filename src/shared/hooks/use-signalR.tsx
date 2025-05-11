import { useEffect } from 'react'
import SignalRService from '../services/signalR.service'
/**
 * This hook is use for SignalR connection.
 * It will build the connection and start it when the component mounts.
 * It will also stop the connection when the component unmounts.
 * @param signalRService - The SignalR service instance to use for the connection.
 * It should be an instance of a class that extends SignalRService.
 * This hook is useful for components that need to establish a SignalR connection and listen for events.
 */
function useSignalR(signalRService: SignalRService) {
    useEffect(() => {
        signalRService.buildConnection()
        signalRService.startConnection()

        return () => {
            signalRService.stopConnection()
        }
    }, [signalRService])
}

export default useSignalR
