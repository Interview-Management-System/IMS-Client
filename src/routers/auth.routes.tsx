import { RouteObject } from 'react-router-dom'
import AuthLayout from 'site/auth/layouts/auth-layout'
import ForgotPasswordComponent from 'site/auth/pages/forgot-password/forgot-password.component'
import LoginComponent from 'site/auth/pages/login/login.component'

const authRouters: RouteObject[] = [
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginComponent />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordComponent />
            }
        ]
    }
]

export default authRouters
