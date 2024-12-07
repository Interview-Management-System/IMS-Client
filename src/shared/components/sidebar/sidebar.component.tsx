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
import { NavLink, useLocation } from 'react-router-dom'
import './sidebar.scss'

function SideBarComponent() {
    const location = useLocation()

    const isRouteCandidateMatched = location.pathname.startsWith('/candidate')
    const isRouteJobMatched = location.pathname.startsWith('/job')
    const isRouteInterviewMatched = location.pathname.startsWith('/interview')
    const isRouteOfferMatched = location.pathname.startsWith('/offer')
    const isRouteUserMatched = location.pathname.startsWith('/user')

    const navLinkClasses = 'nav-link d-flex align-items-center gap-3'

    const candidateNavLinkStyle = isRouteCandidateMatched ? `${navLinkClasses} active` : `${navLinkClasses}`
    const jobNavLinkStyle = isRouteJobMatched ? `${navLinkClasses} active` : `${navLinkClasses}`
    const interviewNavLinkStyle = isRouteInterviewMatched ? `${navLinkClasses} active` : `${navLinkClasses}`
    const offerNavLinkStyle = isRouteOfferMatched ? `${navLinkClasses} active` : `${navLinkClasses}`
    const userNavLinkStyle = isRouteUserMatched ? `${navLinkClasses} active` : `${navLinkClasses}`

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
                <NavLink to='candidate/list' className={candidateNavLinkStyle}>
                    <FontAwesomeIcon size='lg' icon={faPeopleGroup} />
                    <span className='text-white'>Candidate Management </span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink to='main' className={jobNavLinkStyle}>
                    <FontAwesomeIcon size='lg' icon={faBriefcase} />
                    <span className='text-white'> Job Management </span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink to='sub' className={interviewNavLinkStyle}>
                    <FontAwesomeIcon size='lg' icon={faRocket} />
                    <span className='text-white'> Interview Management </span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink to='/' className={offerNavLinkStyle}>
                    <FontAwesomeIcon size='lg' icon={faFile} />
                    <span className='text-white'>Offer Management</span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink to='/' className={userNavLinkStyle}>
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
