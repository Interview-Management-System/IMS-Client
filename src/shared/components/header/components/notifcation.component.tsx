/* eslint-disable jsx-a11y/anchor-is-valid */
import { faBell, faCheck, faDesktop, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NotificationComponent() {
    return (
        <>
            <a
                href='#'
                className='nav-link dropdown-toggle'
                id='alertsDropdown'
                role='button'
                data-bs-toggle='dropdown'
            >
                <FontAwesomeIcon icon={faBell} size='lg' />
                {/* <!-- Counter - Alerts --> */}
                <span
                    className='badge badge-danger badge-counter'
                    style={{
                        fontSize: '0.8rem', // Increase font size
                        padding: '0.4em 0.6em', // Increase padding for a larger badge
                        borderRadius: '50%' // Keep it circular
                    }}
                >
                    <span style={{ fontSize: '15px' }}>3</span>
                </span>
            </a>

            <div className='dropdown-list dropdown-menu dropdown-menu-end shadow custom-dropdown'>
                {/* Header */}
                <div
                    className='n-header d-flex justify-content-between align-items-center px-3 py-2'
                    style={{ backgroundColor: '#4e73df', color: 'white' }}
                >
                    <h6 className='notification-header m-0'>Notifications</h6>

                    <div className='icon-container'>
                        <FontAwesomeIcon icon={faEllipsis} className='custom-fa-ellipsis' />
                    </div>
                </div>

                {/* Options Menu */}
                <div className='options-menu px-3 py-2'>
                    <ul className='list-unstyled mb-0'>
                        <li className='mb-1'>
                            <FontAwesomeIcon icon={faCheck} className='me-2' />
                            Mark all as read
                        </li>

                        <li>
                            <FontAwesomeIcon icon={faDesktop} className='me-2' />
                            Open in new window
                        </li>
                    </ul>
                </div>

                {/* Tabs: All / Unread */}
                {/* <div className='dropdown-actions d-flex justify-content-around border-top pt-2'>
                    <p className='notification-tab mb-0' style={{ color: '#000' }}>
                        All
                    </p>
                    <p className='notification-tab mb-0' style={{ color: '#000' }}>
                        Unread
                    </p>
                </div> */}

                {/* Notification Content */}
                {/* <div className='notification-container px-3 py-2'>
                    <a
                        href='#'
                        className='dropdown-item d-flex align-items-center border-none p-0'
                        style={{ cursor: 'pointer' }}
                    >
                        <div className='me-3'>
                            <div className='icon-circle bg-success'>
                                <FontAwesomeIcon icon={faCheck} className='text-white' />
                            </div>
                        </div>
                        <div>
                            <div className='small text-gray-500'>January 1, 2023, 12:00:00 PM</div>
                            <span className='fw-bold' style={{ color: '#000' }}>
                                Notification Title
                            </span>
                            <div style={{ color: '#000' }}>Notification content goes here...</div>
                            <div className='unread-indicator' />
                        </div>
                    </a>

                    <div className='sub-icon-container mt-2'>
                        <FontAwesomeIcon icon={faEllipsisVertical} className='custom-fa-ellipsis' />
                    </div>
                    <div className='sub-option-menu mt-1'>
                        <a href='#'>
                            <FontAwesomeIcon icon={faCheck} className='me-2' />
                            Mark as Read
                        </a>
                        <a href='#'>
                            <FontAwesomeIcon icon={faBackspace} className='me-2' style={{ color: '#000' }} />
                            Delete
                        </a>
                    </div>
                </div> */}

                {/* Additional Examples (Optional) */}
                <div className='list-group list-group-flush'>
                    <a href='#' className='list-group-item list-group-item-action px-3 py-2'>
                        <div className='d-flex align-items-center'>
                            <div>
                                <div className='small text-gray-500'>December 12, 2019</div>A new monthly
                                report is ready to download!
                            </div>
                        </div>
                    </a>

                    <a href='#' className='list-group-item list-group-item-action px-3 py-2'>
                        <div className='d-flex align-items-center'>
                            <div>
                                <div className='small text-gray-500'>December 7, 2019</div>
                                $290.29 has been deposited into your account!
                            </div>
                        </div>
                    </a>

                    <a href='#' className='list-group-item list-group-item-action px-3 py-2'>
                        <div className='d-flex align-items-center'>
                            <div>
                                <div className='small text-gray-500'>December 2, 2019</div>
                                Spending Alert: We’ve noticed unusually high spending for your account.
                            </div>
                        </div>
                    </a>
                </div>

                <p className='text-center my-2'>You have no notification</p>
            </div>
        </>
    )
}

export default NotificationComponent
