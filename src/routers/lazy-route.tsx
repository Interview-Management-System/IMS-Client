import { lazy, Suspense } from 'react'

interface LazyRouteProps {
    element: Promise<any>
}

const LazyRoute: React.FC<LazyRouteProps> = ({ element }) => {
    const LazyComponent = lazy(async () => await element)

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    )
}

export default LazyRoute
export type { LazyRouteProps }
