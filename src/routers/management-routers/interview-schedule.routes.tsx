import { RouteObject } from 'react-router-dom'
import LazyRoute from '../lazy-route'

const InterviewListComponent = import('site/management/pages/interview/interview-list.component')

const interviewRouters: RouteObject[] = [
    {
        path: '/interview-schedule',
        children: [
            {
                path: 'list',
                element: <LazyRoute element={InterviewListComponent} />
            }
        ]
    }
]

export default interviewRouters
