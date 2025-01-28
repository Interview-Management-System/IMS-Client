import { RouteObject } from 'react-router-dom'
import CandidateCreateComponent from '../../site/management/pages/candidate/candidate-create/candidate-create.component'
import CandidateDetailComponent from '../../site/management/pages/candidate/candidate-detail/candidate-detail.component'
import CandidateListComponent from '../../site/management/pages/candidate/candidate-list/candidate-list.component'
import UserCreateComponent from '../../site/management/pages/user/user-create/user-create.component'
import UserDetailComponent from '../../site/management/pages/user/user-detail/user-detail.component'
import UserListComponent from '../../site/management/pages/user/user-list/user-list.component'

const userRouters: RouteObject[] = [
    {
        path: '/candidate',
        children: [
            { path: 'list', element: <CandidateListComponent /> },
            { path: 'detail/:id', element: <CandidateDetailComponent /> },
            { path: 'create', element: <CandidateCreateComponent /> },
            { path: 'edit/:id', element: <CandidateCreateComponent /> }
        ]
    },
    {
        path: '/user',
        children: [
            { path: 'list', element: <UserListComponent /> },
            { path: 'detail/:id', element: <UserDetailComponent /> },
            { path: 'create', element: <UserCreateComponent /> },
            { path: 'edit/:id', element: <CandidateCreateComponent /> }
        ]
    }
]

export default userRouters
