import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ForgetPasswordRequest } from '../../../../modules/auth/models/authentication.model'
import ControlledInput from '../../../../shared/components/form/form-input.component'
import AuthSchemaValidation from '../../../../shared/helpers/form/validations/schemas/auth-schemas.validation'

function onSubmit(formData: ForgetPasswordRequest) {
    // service here
    console.log(formData)
}

function ForgotPasswordComponent() {
    const forgotPasswordForm = useForm<ForgetPasswordRequest>({
        resolver: yupResolver(AuthSchemaValidation.forgotPasswordSchemaValidation)
    })

    return (
        <div>
            <div className='text-center'>
                <h1 className='h4 text-gray-900 mb-2'>Forgot Your Password ?</h1>
                <p className='mb-4'>
                    We get it, stuff happens. Just enter your email address below and we'll send you a link to
                    reset your password!
                </p>
            </div>

            <form className='user' onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <ControlledInput<ForgetPasswordRequest>
                        name='email'
                        type='email'
                        form={forgotPasswordForm}
                        placeholder='Enter Email Address...'
                    />
                </div>

                <Button className='btn-user btn-block' variant='primary' type='submit'>
                    Reset Password
                </Button>
            </form>

            <hr />

            <div className='text-center'>
                <Link to='/auth/login'>Already have an account ? Back to login</Link>
            </div>
        </div>
    )
}

export default ForgotPasswordComponent
