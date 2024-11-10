import { Link } from 'react-router-dom'

function MainLayout() {
    return (
        <div>
            <Link to={'/auth/login'}>to page</Link>
            <br />
            asas
            <Link to={'/check'}>to check</Link>
        </div>
    )
}

export default MainLayout
