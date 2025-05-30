import { yupResolver } from '@hookform/resolvers/yup'
import { UserLoginRequest } from 'modules/auth/models/authentication.model'
import authService from 'modules/auth/services/auth.service'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import ControlledInput from 'shared/components/form/form-input.component'
import AuthSchemaValidation from 'shared/helpers/form/validations/schemas/auth-schemas.validation'

function onSubmit(formData: UserLoginRequest) {
    authService.login(formData)
}

function LoginComponent() {
    const loginForm = useForm<UserLoginRequest>({
        resolver: yupResolver(AuthSchemaValidation.loginSchemaValidation)
    })

    return (
        <>
            <div className='text-center'>
                <h1 className='h4 text-gray-900 mb-4'>Login into your account</h1>
            </div>
            <hr />

            <form className='user' onSubmit={loginForm.handleSubmit(onSubmit)}>
                {/* Email */}
                <div className='form-group'>
                    <label htmlFor='email' className='form-label'>
                        Email Address
                    </label>

                    <ControlledInput<UserLoginRequest>
                        name='email'
                        type='email'
                        form={loginForm}
                        className='form-control form-control-lg'
                        placeholder='Enter Email Address...'
                    />
                </div>

                {/* Password */}
                <div className='form-group'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>

                    <ControlledInput<UserLoginRequest>
                        name='password'
                        type='password'
                        form={loginForm}
                        autoComplete='on'
                        className='form-control form-control-lg'
                        placeholder='Enter Password ...'
                    />
                </div>

                <div className='text-end'>
                    <Link to='/auth/forgot-password'>Forgot Password?</Link>
                </div>

                <hr />

                {/* Actions */}
                <div className='row'>
                    <div className='col-md-6'>
                        <Button className='btn-user btn-block' variant='secondary'>
                            Cancel
                        </Button>
                    </div>

                    <div className='col-md-6'>
                        <Button className='btn-user btn-block' variant='primary' type='submit'>
                            Login
                        </Button>
                    </div>
                </div>
            </form>

            <hr />

            <div className='text-center'>You don't have an account ? Please contact admin for help</div>
        </>
    )
}

export default LoginComponent
