import { RouteObject } from 'react-router-dom'
import DashboardComponnet from '../../site/management/pages/dashboard/dashboard.component'

const dashboardRouters: RouteObject[] = [
    {
        path: '/dashboard',
        element: <DashboardComponnet />
    }
]

export default dashboardRouters
