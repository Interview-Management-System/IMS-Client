import { RouteObject } from 'react-router-dom'
import LazyRoute from '../lazy-route'

const DashboardComponent = import('../../site/management/pages/dashboard/dashboard.component')

const dashboardRouters: RouteObject[] = [
    {
        path: '/dashboard',
        element: <LazyRoute element={DashboardComponent} />
    }
]

export default dashboardRouters
