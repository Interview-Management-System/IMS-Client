import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import authRouters from './auth.routes'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: []
        },
        ...authRouters
    ]
    // { basename: '/interview-management-system' }
)

export default router
