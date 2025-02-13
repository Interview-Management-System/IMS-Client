import 'bootstrap/dist/css/bootstrap.min.css'
import { CookiesProvider } from 'react-cookie'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.scss'

function App() {
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
