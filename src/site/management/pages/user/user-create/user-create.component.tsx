import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserForCreateDTO } from '../../../../../modules/user/models/user.model'
import ControlledInput from '../../../../../shared/components/form/form-input.component'
import ControlledSelection from '../../../../../shared/components/form/form-selection.component'
import ControlledTextArea from '../../../../../shared/components/form/form-text-area.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { GenderEnum, StatusEnum } from '../../../../../shared/enums/entity-enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { createUserCreateValidationSchema } from '../../../../../shared/helpers/form/validations/schemas/user-schemas.validation'
import useModal from '../../../../../shared/hooks/useModal'

function UserCreateComponent() {
    const navigate = useNavigate()
    const modal = useModal()

    const userCreateForm = useForm<UserForCreateDTO>({
        resolver: yupResolver(createUserCreateValidationSchema())
    })

    // Check for validation errors before showing the modal
    async function handleSubmitWithModal() {
        const isValid = await userCreateForm.trigger()

        if (isValid) {
            modal.showModal()
        }
    }

    function handleCreateUser(formData: UserForCreateDTO) {
        // formData.createdBy = CookieService.getCurrentUserIdFromCookie()
        // userService.createUser(formData, navigate)
        console.log(formData)
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                modalTitle='Create confirm'
                buttonVariant={ButtonVariant.Primary}
                handleClose={modal.closeModal}
                modalConfirmQuestion='Do you want to create new user ?'
                handleConfirm={userCreateForm.handleSubmit(handleCreateUser)}
            />

            <div className='card shadow mb-3'>
                <div className='card-header py-3'>
                    <h6 className='m-0 font-weight-bold text-primary'>Create User</h6>
                </div>

                <div className='card-body'>
                    <form>
                        {/* 1st row */}
                        <div className='d-flex flex-wrap'>
                            {/* 1st column */}
                            <div className='col-lg-6 col-md-6 col-12'>
                                {/* Full name */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        Full Name <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<UserForCreateDTO>
                                            name='username'
                                            type='text'
                                            form={userCreateForm}
                                            placeholder='Enter full name'
                                        />
                                    </div>
                                </div>

                                {/* DOB */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        D.O.B <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<UserForCreateDTO>
                                            name='dob'
                                            type='date'
                                            form={userCreateForm}
                                        />
                                    </div>
                                </div>

                                {/* Phone number */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold'>
                                        Phone Number <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<UserForCreateDTO>
                                            name='phoneNumber'
                                            type='tel'
                                            form={userCreateForm}
                                            placeholder='Type a number'
                                        />
                                    </div>
                                </div>

                                {/* Role */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold'>
                                        Role <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<UserForCreateDTO>
                                            name='roleId'
                                            form={userCreateForm}
                                            optionList={EnumList.roleIdList}
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold'>
                                        Status <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<UserForCreateDTO>
                                            name='isActive'
                                            form={userCreateForm}
                                            optionList={EnumList.statusList}
                                            registerOptions={{
                                                setValueAs: value => {
                                                    if (value) {
                                                        return value === StatusEnum.Active.toString()
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-6 col-12'>
                                {/* Email */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        Email <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<UserForCreateDTO>
                                            name='email'
                                            type='email'
                                            form={userCreateForm}
                                            placeholder='Enter Email address'
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        Address <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-lg-6'>
                                        <ControlledInput<UserForCreateDTO>
                                            name='address'
                                            type='text'
                                            form={userCreateForm}
                                            placeholder='Enter address'
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        Gender <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<UserForCreateDTO>
                                            name='gender'
                                            form={userCreateForm}
                                            optionList={EnumList.genderList}
                                            registerOptions={{
                                                setValueAs: value => {
                                                    if (value) {
                                                        return value !== GenderEnum.Female.toString()
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Department */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        Department <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<UserForCreateDTO>
                                            name='departmentId'
                                            form={userCreateForm}
                                            optionList={EnumList.departmentList}
                                            registerOptions={{ valueAsNumber: true }}
                                        />
                                    </div>
                                </div>

                                {/* Department */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        Note <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledTextArea
                                            form={userCreateForm}
                                            name='note'
                                            className='form-control'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-lg-12 d-flex justify-content-center'>
                                <Button
                                    className='me-2'
                                    variant='primary'
                                    type='button'
                                    onClick={handleSubmitWithModal}
                                >
                                    Submit
                                </Button>

                                <Button variant='secondary' type='button' onClick={() => navigate(-1)}>
                                    Cancel
                                </Button>

                                <Button
                                    className='ms-2'
                                    variant='info'
                                    type='button'
                                    onClick={() => userCreateForm.reset()}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserCreateComponent
