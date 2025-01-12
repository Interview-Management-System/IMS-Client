import { createBrowserRouter } from 'react-router-dom'
import App from '../app/App'
import MainLayout from '../site/management/layouts/main-layout'
import authRouters from './auth.routes'
import userRouters from './management-routers/user.routes'

export const basename = '/interview-management-system'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '',
                    element: <MainLayout />,
                    children: [...userRouters]
                }
            ]
        },
        ...authRouters
    ]
    // { basename: basename }
)

export default router
