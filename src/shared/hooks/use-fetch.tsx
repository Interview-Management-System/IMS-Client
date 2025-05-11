import React, { useEffect, useMemo } from 'react'
import { AbortSignalManager } from '../../api/abort-signal-manager'
import axiosClient from '../../api/axios/axios-config'

export function useFetch() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const callBackApi = useCallback(callBack, [])

    useEffect(() => {
        AbortSignalManager.initialize()
        // callBackApi()

        return () => AbortSignalManager.abort()
    }, [])
}

export function cancellable<P extends React.ComponentProps<C>, C extends React.ComponentType<any>>(
    WrappedComponent: C
): C {
    return class extends React.Component<P> {
        private controller = new AbortController()
        private interceptorId = axiosClient.interceptors.request.use(config => {
            // Inject the signal into every request
            return { ...config, signal: this.controller.signal }
        })

        componentWillUnmount() {
            // Cancel all in-flight requests
            this.controller.abort()
            // Clean up interceptor to avoid cross-component leakage
            axiosClient.interceptors.request.eject(this.interceptorId)
        }

        render() {
            // Render the wrapped component with original props
            return <WrappedComponent {...(this.props as P)} />
        }
    } as unknown as C
}

export function withCancellable<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
    return function CancellableComponent(props: P) {
        // Memoize a single controller instance per mount
        const controller = useMemo(() => new AbortController(), [])
        // Install interceptor once
        const interceptorId = useMemo(() => {
            return axiosClient.interceptors.request.use(config => {
                config.signal = controller.signal // inject signal :contentReference[oaicite:5]{index=5}
                return config
            })
        }, [controller])

        // On unmount: abort all requests & eject interceptor
        useEffect(() => {
            return () => {
                controller.abort() // cancel in-flight
                axiosClient.interceptors.request.eject(interceptorId) // clean up :contentReference[oaicite:6]{index=6}
            }
        }, [controller, interceptorId])

        return <WrappedComponent {...(props as P & React.Attributes)} />
    }
}
