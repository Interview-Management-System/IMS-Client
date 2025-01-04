import { useCallback, useEffect } from 'react'
import { AbortSignalManager } from '../../api/abort-signal-manager'
/*
export function useFetch(a: Promise<void>[]) {
    // const callBackApi = useCallback(() => {}, [])

    // useEffect(() => {
    //     AbortSignalManager.initialize()
    //     callBackApi()
    //     return () => AbortSignalManager.abort()
    // }, [callBackApi])
}
*/

export function useFetch2(callBack: any[]) {
    const callBackApi = useCallback(() => {
        for (const element of callBack) {
            element as Promise<void>
        }
    }, [])

    useEffect(() => {
        AbortSignalManager.initialize()
        callBackApi()
        return () => AbortSignalManager.abort()
    }, [callBackApi])
}

// work
export function useFetch(callBack: () => void) {
    const callBackApi = useCallback(callBack, [])

    useEffect(() => {
        AbortSignalManager.initialize()
        callBackApi()
        return () => AbortSignalManager.abort()
    }, [callBackApi])
}

export function useFetch1(callbacks: Promise<void>) {
    const callBackApi = useCallback(async () => {
        AbortSignalManager.initialize()

        try {
            await callbacks // Ensure we await the promise here
        } catch (error) {
            console.error('Request failed', error)
        }

        return () => AbortSignalManager.abort()
    }, [callbacks])

    useEffect(() => {
        const abortCleanup = callBackApi()

        callBackApi()

        return () => {
            if (abortCleanup) {
                abortCleanup.then()
            }
        }
    }, [callBackApi])
}

export function useFetch3(callbacks: Promise<void>[]) {
    const callBackApis = useCallback(() => {}, [])

    useEffect(() => {
        AbortSignalManager.initialize()
        // callBackApis()
        return () => AbortSignalManager.abort()
    }, [])
}
