import { RouteObject } from 'react-router-dom'
import AuthLayout from '../../site/auth/layouts/auth-layout'
import CandidateListComponent from '../../site/management/pages/candidate/candidate-list/candidate-list.component'

const userRouters: RouteObject[] = [
    {
        path: '/candidate',
        children: [
            { path: 'list', element: <CandidateListComponent /> },
            { path: 'detail', element: <CandidateListComponent /> }
        ]
    },
    {
        path: '/user',
        element: <AuthLayout />
    }
]

export default userRouters
