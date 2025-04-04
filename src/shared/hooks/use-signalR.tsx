import { useEffect } from 'react'
import SignalRService from '../services/signalR.service'

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
