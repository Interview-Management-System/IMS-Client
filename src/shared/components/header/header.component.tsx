function HeaderComponent() {
    return (
        <>
            {/* <!-- Topbar --> */}
            <nav className='navbar navbar-expand navbar-light bg-white topbar static-top shadow mb-3'>
                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button
                    id='sidebarToggleTop'
                    className='btn btn-link d-md-none rounded-circle mr-3 sidebar-toggler'
                >
                    <i className='fa fa-bars'></i>
                </button>

                {/* <!-- Home page and Search links --> */}
                <span>
                    <a href='/public/home' className='ms-lg-5 nav-link' style={{ color: '#5858ec' }}>
                        Home page
                    </a>
                </span>
                <span>
                    <a href='school/list-school' className='ms-lg-5 nav-link' style={{ color: '#5858ec' }}>
                        Search for school
                    </a>
                </span>

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
                        <a
                            className='nav-link dropdown-toggle'
                            id='alertsDropdown'
                            role='button'
                            data-bs-toggle='dropdown'
                        >
                            <i className='fas fa-bell fa-fw'></i>
                            {/* <!-- Counter - Alerts --> */}
                            <span className='badge badge-danger badge-counter'>3</span>
                        </a>
                        {/* <!-- Dropdown - Alerts --> */}
                        <div className='dropdown-list dropdown-menu dropdown-menu-right shadow custom-dropdown'>
                            <div className='n-header'>
                                <h6 className='notification-header'>Notifications</h6>
                                <div className='icon-container'>
                                    <i className='fa-solid fa-ellipsis custom-fa-ellipsis'></i>
                                </div>
                            </div>
                            <div className='options-menu'>
                                <ul>
                                    <li>
                                        <i className='fa-solid fa-check mr-2'></i> Mark all as read
                                    </li>
                                    <li>
                                        <i className='fa-solid fa-computer mr-1'></i> Open in new window
                                    </li>
                                </ul>
                            </div>
                            <div className='dropdown-actions'>
                                <p className='notification-tab' style={{ color: '#000' }}>
                                    All
                                </p>
                                <p className='notification-tab' style={{ color: '#000' }}>
                                    Unread
                                </p>
                            </div>
                            {/* <!-- Notification Content --> */}
                            <div className='notification-container'>
                                <a
                                    href='s'
                                    className='dropdown-item d-flex align-items-center border-none'
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className='mr-3'>
                                        <div className='icon-circle bg-success'>
                                            <i className='fa-solid fa-check text-white'></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='small text-gray-500'>
                                            January 1, 2023, 12:00:00 PM
                                        </div>
                                        <span className='font-weight-bold' style={{ color: '#000' }}>
                                            Notification Title
                                        </span>
                                        <div style={{ color: '#000' }}>Notification content goes here...</div>
                                        <div className='unread-indicator'></div>
                                    </div>
                                </a>
                                <div className='sub-icon-container'>
                                    <i className='fa-solid fa-ellipsis-vertical custom-fa-ellipsis'></i>
                                </div>
                                <div className='sub-option-menu'>
                                    <a>
                                        <i className='fa-solid fa-check mr-2'></i> Mark as Read
                                    </a>
                                    <a>
                                        <i
                                            className='fa-solid fa-delete-left mr-2'
                                            style={{ color: '#000000' }}
                                        ></i>{' '}
                                        Delete
                                    </a>
                                </div>
                            </div>
                            <p className='text-center'>You have no notification</p>
                        </div>
                    </li>

                    {/* <!-- User Information --> */}
                    <li className='nav-item dropdown no-arrow'>
                        <a
                            className='nav-link dropdown-toggle'
                            id='userDropdown'
                            role='button'
                            data-bs-toggle='dropdown'
                        >
                            <span className='mr-2 d-none d-lg-inline text-gray-600'>User Name</span>
                            <img
                                id='headerImage'
                                className='img-profile rounded-circle'
                                src='profile_image_url.jpg'
                            />
                        </a>
                        {/* <!-- Dropdown - User Information --> */}
                        <div className='dropdown-menu dropdown-menu-right shadow animated--grow-in'>
                            <a className='dropdown-item' href='/public/user/my-profile'>
                                <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i> Profile
                            </a>
                            <a className='dropdown-item' href='/public/user/my-request'>
                                <i className='fa-solid fa-book fa-sm fa-fw mr-2 text-gray-400'></i> My Request
                            </a>
                            <div className='dropdown-divider'></div>
                            <button
                                className='dropdown-item'
                                data-bs-toggle='modal'
                                data-bs-target='#logoutModal'
                            >
                                <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i> Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default HeaderComponent
