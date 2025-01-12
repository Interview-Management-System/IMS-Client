import { useCallback, useEffect } from 'react'
import { AbortSignalManager } from '../../api/abort-signal-manager'

export function useFetch(callBack: () => void) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callBackApi = useCallback(callBack, [])

    useEffect(() => {
        AbortSignalManager.initialize()
        callBackApi()

        return () => AbortSignalManager.abort()
    }, [callBackApi])
}
