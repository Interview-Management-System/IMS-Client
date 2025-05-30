import { UserCreateDTO } from 'modules/user/models/user.model'
import userService from 'modules/user/services/user.service'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ControlledDateInput from 'shared/components/form/form-date-input.component'
import ControlledInput from 'shared/components/form/form-input.component'
import ControlledSelection from 'shared/components/form/form-selection.component'
import ControlledTextArea from 'shared/components/form/form-text-area.component'
import ModalConfirmComponent from 'shared/components/modals/modal-confirm/modal-confirm.component'
import { EnumList } from 'shared/helpers/enums/enum-list.helper'
import useModal from 'shared/hooks/use-modal'

function UserCreateComponent() {
    const modal = useModal()
    const navigate = useNavigate()

    const userCreateForm = useForm<UserCreateDTO>({
        // resolver: yupResolver(UserSchemaValidation.userCreateSchemaValidation)
    })

    // Check for validation errors before showing the modal
    async function handleSubmitWithModal() {
        const isValid = await userCreateForm.trigger()

        if (isValid) {
            modal.showModal()
        }
    }

    function handleCreateUser(formData: UserCreateDTO) {
        // formData.createdBy = CookieService.getCurrentUserIdFromCookie()
        userService.createUser(formData)
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                modalTitle='Create confirm'
                buttonColor='primary'
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
                                        <ControlledInput<UserCreateDTO>
                                            name='personalInformation.username'
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
                                        <ControlledDateInput<UserCreateDTO>
                                            name='personalInformation.dob'
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
                                        <ControlledInput<UserCreateDTO>
                                            name='personalInformation.phoneNumber'
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
                                        <ControlledSelection<UserCreateDTO>
                                            name='roleId'
                                            form={userCreateForm}
                                            options={EnumList.roleIdList}
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold'>
                                        Status <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<UserCreateDTO>
                                            name='isActive'
                                            form={userCreateForm}
                                            options={EnumList.statusList}
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
                                        <ControlledInput<UserCreateDTO>
                                            name='personalInformation.email'
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
                                        <ControlledInput<UserCreateDTO>
                                            name='personalInformation.address'
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
                                        <ControlledSelection<UserCreateDTO>
                                            name='personalInformation.gender'
                                            form={userCreateForm}
                                            options={EnumList.genderList}
                                        />
                                    </div>
                                </div>

                                {/* Department */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label  fw-semibold '>
                                        Department <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<UserCreateDTO>
                                            name='departmentId'
                                            form={userCreateForm}
                                            options={EnumList.departmentList}
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
