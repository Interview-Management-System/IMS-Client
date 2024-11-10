import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <div className='bg-gradient-primary vh-100'>
            <div className='container'>
                <div className='row justify-content-center my-style'>
                    <div className='col-xl-8 col-lg-8 col-md-6'>
                        <div className='card o-hidden border-0 shadow-lg my-5'>
                            <div className='card-body p-0'>
                                <div className='row'>
                                    <div className='p-5'>
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
