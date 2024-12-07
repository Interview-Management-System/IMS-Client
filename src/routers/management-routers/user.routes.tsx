import { RouteObject } from 'react-router-dom'
import AuthLayout from '../../site/auth/layouts/auth-layout'
import CandidateCreateComponent from '../../site/management/pages/candidate/candidate-create/candidate-create.component'
import CandidateDetailComponent from '../../site/management/pages/candidate/candidate-detail/candidate-detail'
import CandidateListComponent from '../../site/management/pages/candidate/candidate-list/candidate-list.component'

const userRouters: RouteObject[] = [
    {
        path: '/candidate',
        children: [
            { path: 'list', element: <CandidateListComponent /> },
            { path: 'detail', element: <CandidateDetailComponent /> },
            { path: 'create', element: <CandidateCreateComponent /> }
        ]
    },
    {
        path: '/user',
        element: <AuthLayout />
    }
]

export default userRouters
