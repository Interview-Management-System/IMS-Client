import {
    faBriefcase,
    faFile,
    faLaughWink,
    faPeopleGroup,
    faRocket,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'
import { NavLink } from 'react-router-dom'
import './sidebar.scss'

function SideBarComponent() {
    const navLinkClasses = 'nav-link d-flex align-items-center gap-3'

    return (
        <ul
            id='accordionSidebar'
            className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion h-100'
        >
            <div className='sidebar-brand d-flex align-items-center justify-content-center'>
                <div className='sidebar-brand-icon rotate-n-15'>
                    <FontAwesomeIcon size='2xl' icon={faLaughWink} />
                </div>

                <div className='sidebar-brand-text mx-3'>IMS Dashboard</div>
            </div>

            <hr className='sidebar-divider my-0' />

            <li className='nav-item'>
                <NavLink className={navLinkClasses} to='candidate/list'>
                    <FontAwesomeIcon size='lg' icon={faPeopleGroup} />
                    <span className='text-white'>Candidate Management </span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink className={navLinkClasses} to='main'>
                    <FontAwesomeIcon size='lg' icon={faBriefcase} />
                    <span className='text-white'> Job Management </span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink className={navLinkClasses} to='sub'>
                    <FontAwesomeIcon size='lg' icon={faRocket} />
                    <span className='text-white'> Interview Management </span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink className={navLinkClasses} to='/'>
                    <FontAwesomeIcon size='lg' icon={faFile} />
                    <span className='text-white'>Offer Management</span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink className={navLinkClasses} to='/'>
                    <FontAwesomeIcon size='lg' icon={faUser} />
                    <span className='text-white'>User Management</span>
                </NavLink>
            </li>

            <hr className='sidebar-divider d-none d-md-block' />

            <div className='text-center d-none d-md-inline'>
                <button className='rounded-circle border-0' id='sidebarToggle'></button>
            </div>
        </ul>
    )
}

export default SideBarComponent
