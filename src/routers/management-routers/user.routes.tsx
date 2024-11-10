import { RouteObject } from 'react-router-dom'
import AuthLayout from '../../site/auth/layouts/auth-layout'

const userRouters: RouteObject[] = [
    {
        path: '/user',
        element: <AuthLayout />
    }
]

export default userRouters
