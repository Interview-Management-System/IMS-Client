import App from 'app/App'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from 'site/management/layouts/main-layout'
import authRouters from './auth.routes'
import dashboardRouters from './management-routers/dashboard.routes'
import interviewRouters from './management-routers/interview-schedule.routes'
import jobRouters from './management-routers/job.routes'
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
                    children: [...dashboardRouters, ...userRouters, ...jobRouters, ...interviewRouters]
                }
            ]
        },
        ...authRouters
    ]
    // { basename: basename }
)

export default router
