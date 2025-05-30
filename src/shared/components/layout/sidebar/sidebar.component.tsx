import {
    faBriefcase,
    faChevronLeft,
    faChevronRight,
    faFile,
    faGauge,
    faLaughWink,
    faPeopleGroup,
    faRocket,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'
import { useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import './sidebar.scss'

function SideBarComponent() {
    const location = useLocation()
    const isRouteMatched = (route: string) => location.pathname.startsWith(route)

    // Define navigation links
    const navLinks = [
        { to: 'dashboard', icon: faGauge, label: 'Dashboard', route: '/dashboard' },
        { to: 'candidate/list', icon: faPeopleGroup, label: 'Candidate Management', route: '/candidate' },
        { to: 'job/list', icon: faBriefcase, label: 'Job Management', route: '/job' },
        {
            to: 'interview-schedule/list',
            icon: faRocket,
            label: 'Interview Management',
            route: '/interview-schedule'
        },
        { to: 'offer/list', icon: faFile, label: 'Offer Management', route: '/offer' },
        { to: 'user/list', icon: faUser, label: 'User Management', route: '/user' }
    ]

    // Side bar toggle
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleSidebar = () => setIsCollapsed(!isCollapsed)

    return (
        <ul
            id='accordionSidebar'
            className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
                isCollapsed ? 'toggled' : ''
            }`}
        >
            <div className='sidebar-brand d-flex align-items-center justify-content-center'>
                <div className='sidebar-brand-icon rotate-n-15'>
                    <FontAwesomeIcon size='2xl' icon={faLaughWink} />
                </div>
                <div className='sidebar-brand-text mx-3'>Interview Management</div>
            </div>

            <hr className='sidebar-divider my-0' />

            {/* Map through navLinks */}
            {navLinks.map(link => {
                const isActive = isRouteMatched(link.route)
                const navLinkClasses = `nav-link d-flex align-items-center gap-3 ${isActive ? 'active' : ''}`

                const tooltip = <Tooltip id={`tooltip-${link.label}`}>{link.label}</Tooltip>

                return (
                    <li className='nav-item' key={link.to}>
                        {isCollapsed ? (
                            <OverlayTrigger placement='right' overlay={tooltip}>
                                <NavLink to={link.to} className={navLinkClasses}>
                                    <FontAwesomeIcon size='lg' icon={link.icon} />
                                </NavLink>
                            </OverlayTrigger>
                        ) : (
                            <NavLink to={link.to} className={navLinkClasses}>
                                <FontAwesomeIcon size='lg' icon={link.icon} />
                                <span className='text-white'>{link.label}</span>
                            </NavLink>
                        )}
                    </li>
                )
            })}

            <hr className='sidebar-divider d-none d-md-block' />

            <div className='text-center d-none d-md-inline'>
                <Button className='rounded-circle border-0' id='sidebarToggle' onClick={toggleSidebar}>
                    <FontAwesomeIcon color='white' icon={isCollapsed ? faChevronRight : faChevronLeft} />
                </Button>
            </div>
        </ul>
    )
}

export default SideBarComponent
