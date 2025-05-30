export interface SignalEventMeta {
    signalEventName: string
    methodName: string
}

export interface AutoInvokeMeta {
    signalMethod: string
    methodName: string
}

/**
 * A method decorator for registering one or more SignalR event names.
 *
 * When applied to a class method, this decorator records the specified event names along with the method name
 * in a metadata property (`__signalEvents`) on the target (typically the class prototype). Later, the SignalR service
 * can read this metadata to automatically wire up the decorated methods as event listeners for the corresponding events.
 *
 * @param {...string[]} signalEventNames - One or more event names that this method should listen to.
 *
 * @example
 * // Register a method to listen for the 'any signalR events.
 * @SignalEvent('loadData', 'updateData')
 * async handleData() {
 *   // Method logic here
 * }
 */
export function SignalEvent(...signalEventNames: string[]) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        if (!target._signalEvents) {
            target._signalEvents = [] as SignalEventMeta[]
        }

        // Add the signal event names and method name to the __signalEvents array
        signalEventNames.forEach(signalEventName => {
            ;(target._signalEvents as SignalEventMeta[]).push({ signalEventName, methodName: methodName })
        })
    }
}

/**
 * Decorator that marks a class method to be automatically invoked for specified SignalR methods.
 * This is useful for methods that should be called automatically when the corresponding SignalR event occurs,
 * without needing to manually register them in the SignalR service.
 * Currently, this decorator is used when the SignalR service is initialized (start connection) for load data when access a page.
 *
 * @param signalMethods - The names of the SignalR methods to associate with the decorated method.
 * @returns A method decorator that registers the method for auto-invocation.
 *
 * @example
 * ```typescript
 * class MyHubHandler {
 *   @AutoInvoke('ReceiveMessage', 'UpdateStatus')
 *   handleSignal(data: any) {
 *     // handle incoming signal
 *   }
 * }
 */
export function AutoInvoke(...signalMethods: string[]) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        if (!target._autoInvokes) {
            target._autoInvokes = [] as AutoInvokeMeta[]
        }

        for (const method of signalMethods) {
            target._autoInvokes.push({ signalMethod: method, methodName })
        }
    }
}
