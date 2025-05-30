import '@schedule-x/theme-default/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { CookiesProvider } from 'react-cookie'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NavigationUtil from 'shared/utils/navigation.utils'
import './App.scss'

function App() {
    NavigationUtil.navigate = useNavigate()

    return (
        <>
            <CookiesProvider>
                <ToastContainer />
                <Outlet />
            </CookiesProvider>
        </>
    )
}

export default App
