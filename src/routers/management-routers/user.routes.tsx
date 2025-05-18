import { RouteObject } from 'react-router-dom'
import LazyRoute from '../lazy-route'

const CandidateCreateComponent = import(
    'site/management/pages/candidate/candidate-create/candidate-create.component'
)
const CandidateDetailComponent = import(
    'site/management/pages/candidate/candidate-detail/candidate-detail.component'
)
const CandidateEditComponent = import(
    'site/management/pages/candidate/candidate-edit/candidate-edit.component'
)
const CandidateListComponent = import(
    'site/management/pages/candidate/candidate-list/candidate-list.component'
)
const UserCreateComponent = import('site/management/pages/user/user-create.component')
const UserDetailComponent = import('site/management/pages/user/user-detail.component')
const UserListComponent = import('site/management/pages/user/user-list.component')

const userRouters: RouteObject[] = [
    {
        path: '/candidate',
        children: [
            {
                path: 'list',
                element: <LazyRoute element={CandidateListComponent} />
            },
            {
                path: 'detail/:id',
                element: <LazyRoute element={CandidateDetailComponent} />
            },
            {
                path: 'create',
                element: <LazyRoute element={CandidateCreateComponent} />
            },
            {
                path: 'edit/:id',
                element: <LazyRoute element={CandidateEditComponent} />
            }
        ]
    },
    {
        path: '/user',
        children: [
            {
                path: 'list',
                element: <LazyRoute element={UserListComponent} />
            },
            {
                path: 'detail/:id',
                element: <LazyRoute element={UserDetailComponent} />
            },
            {
                path: 'create',
                element: <LazyRoute element={UserCreateComponent} />
            },
            {
                path: 'edit/:id',
                element: <LazyRoute element={CandidateCreateComponent} />
            }
        ]
    }
]

export default userRouters
