import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { CookiesProvider } from 'react-cookie'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NavigationUtil from 'shared/utils/navigation.utils'
import './App.scss'

function App() {
    NavigationUtil.navigate = useNavigate()
    console.log(
        `%cRunning React App in ${process.env.NODE_ENV.toUpperCase()} mode`,
        'color: #6adbb2; font-weight: bold;'
    )

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
