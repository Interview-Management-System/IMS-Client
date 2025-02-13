import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HeaderComponent from '../../../shared/components/header/header.component'
import SideBarComponent from '../../../shared/components/sidebar/sidebar.component'

function MainLayout() {
    return (
        <div id='wrapper'>
            <SideBarComponent />

            <div id='content-wrapper' className='d-flex flex-column'>
                <div id='content'>
                    <HeaderComponent />

                    <div className='container-fluid'>
                        <div id='contentPage'>
                            <Routes>
                                <Route path='/' element={<Navigate replace to='/dashboard' />} />
                            </Routes>

                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
