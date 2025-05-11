import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HeaderComponent from '../../../shared/components/layout/header/header.component'
import SideBarComponent from '../../../shared/components/layout/sidebar/sidebar.component'
import TableActionComponent from '../../../shared/components/table/components/table-action/table-action.component'

function MainLayout() {
    return (
        <div id='wrapper' className='d-flex vh-100'>
            <SideBarComponent />

            <div id='content-wrapper' className='d-flex flex-column'>
                <HeaderComponent />

                <div id='content' className='d-flex flex-column flex-grow-1' style={{ minHeight: 0 }}>
                    <div className='container-fluid'>
                        <div id='contentPage'>
                            <Routes>
                                <Route path='/' element={<Navigate replace to='/dashboard' />} />
                            </Routes>

                            <Outlet />
                        </div>
                    </div>
                </div>

                <TableActionComponent />
            </div>
        </div>
    )
}

export default MainLayout
