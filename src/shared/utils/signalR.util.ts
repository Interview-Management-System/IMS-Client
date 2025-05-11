export interface SignalEventMeta {
    signalEventName: string
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
        if (!target.__signalEvents) {
            target.__signalEvents = [] as SignalEventMeta[]
        }

        // Add the signal event names and method name to the __signalEvents array
        signalEventNames.forEach(signalEventName => {
            ;(target.__signalEvents as SignalEventMeta[]).push({ signalEventName, methodName: methodName })
        })
    }
}
