import { RouteObject } from 'react-router-dom'
import LazyRoute from '../lazy-route'

const JobListComponent = import('../../site/management/pages/job/job-list/job-list.component')

const jobRouters: RouteObject[] = [
    {
        path: '/job',
        children: [
            {
                path: 'list',
                element: <LazyRoute element={JobListComponent} />
            }
        ]
    }
]

export default jobRouters
