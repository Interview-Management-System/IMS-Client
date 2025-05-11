/* eslint-disable jsx-a11y/anchor-is-valid */

import { Button, Navbar } from 'react-bootstrap'
import { ButtonColor } from '../../../enums/button.enum'
import useModal from '../../../hooks/use-modal'
import ModalConfirmComponent from '../../modals/modal-confirm/modal-confirm.component'
import NotificationComponent from './components/notifcation.component'

function HeaderComponent() {
    const { show, closeModal, modalTitle, modalConfirmQuestion, modalConfirmHandler, confirm } = useModal()

    function logout() {
        confirm('Logout confirmation', 'Are you sure you want to logout ?', () => {
            // call logout api
        })
    }

    return (
        <>
            {/* Logout popup */}
            <ModalConfirmComponent
                show={show}
                modalTitle={modalTitle}
                handleClose={closeModal}
                buttonColor={ButtonColor.Danger}
                handleConfirm={modalConfirmHandler}
                modalConfirmQuestion={modalConfirmQuestion}
            />

            {/* <!-- Topbar --> */}
            <Navbar className='navbar navbar-expand navbar-light bg-white topbar static-top shadow mb-4 p-0'>
                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <Button
                    id='sidebarToggleTop'
                    className='btn btn-link d-md-none rounded-circle mr-3 sidebar-toggler'
                >
                    <i className='fa fa-bars'></i>
                </Button>

                {/* <!-- Topbar Navbar --> */}
                <ul className='navbar-nav ml-auto'>
                    {/* <!-- Login Link --> */}
                    <li className='nav-item dropdown no-arrow'>
                        <a className='nav-link dropdown-toggle' href='/auth/login'>
                            <span className='mr-2 d-none d-lg-inline text-gray-600'>Login</span>
                        </a>
                    </li>

                    {/* <!-- Notification Bell --> */}
                    <li className='nav-item dropdown no-arrow mx-1'>
                        <NotificationComponent />
                    </li>

                    {/* <!-- User Information --> */}
                    <li className='nav-item dropdown no-arrow'>
                        <a
                            href='#'
                            className='nav-link dropdown-toggle'
                            id='userDropdown'
                            role='button'
                            data-bs-toggle='dropdown'
                        >
                            <span className='mr-2 d-none d-lg-inline text-gray-600'>User Name</span>

                            <img
                                id='headerImage'
                                className='img-profile rounded-circle'
                                // src='../../../../assets/default-avatar.png'
                                src='https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
                                alt=''
                            />
                        </a>
                        {/* <!-- Dropdown - User Information --> */}
                        <div className='dropdown-menu dropdown-menu-end shadow animated--grow-in'>
                            {/* <a className='dropdown-item' href='/public/user/my-profile'>
                                <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i> Profile
                            </a>

                            <a className='dropdown-item' href='/public/user/my-request'>
                                <i className='fa-solid fa-book fa-sm fa-fw mr-2 text-gray-400'></i> My Request
                            </a> */}

                            {/* <div className='dropdown-divider'></div> */}

                            <Button className='dropdown-item' onClick={logout}>
                                <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i> Logout
                            </Button>
                        </div>
                    </li>
                </ul>
            </Navbar>
        </>
    )
}

export default HeaderComponent
