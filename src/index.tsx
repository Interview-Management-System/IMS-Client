import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import router from './routers/index.routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <RouterProvider router={router} />

    // <React.StrictMode>
    // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

console.log(
    `%cRunning React App in ${process.env.NODE_ENV.toUpperCase()} mode`,
    'color: #6adbb2; font-weight: bold;'
)
