import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { CreateCandidateRequest } from '../../../../../modules/user/models/candidate.model'
import ControlledInput from '../../../../../shared/components/form/form-input.component'
import ControlledMultiSelection from '../../../../../shared/components/form/form-multi-selection.component'
import ControlledSelection from '../../../../../shared/components/form/form-selection.component'
import ControlledTextArea from '../../../../../shared/components/form/form-text-area.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { GenderEnum } from '../../../../../shared/enums/entity-enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { createCandidateValidationSchema } from '../../../../../shared/helpers/form/validations/schemas/user-schemas.validation'
import useModal from '../../../../../shared/hooks/useModal'

function onSubmit(formData: CreateCandidateRequest) {
    // service here

    // formData.createdBy = TokenUtils.getCurrentUserIdFromCookie() // get guid from jwt

    console.log(formData)
}

function CandidateCreateComponent() {
    const navigate = useNavigate()
    const modal = useModal()

    const recruiterList = [
        { id: 'adsfdasf', name: 'ssss' },
        { id: '65t4r3', name: 'k,lio' },
        { id: 'r4f5tghy', name: '4rf' }
    ] as { id: string; name: string }[]

    const createCandidateForm = useForm<CreateCandidateRequest>({
        resolver: yupResolver(createCandidateValidationSchema())
    })

    const assignToMe = () => {
        // get user guid from jwt here
        const currentUserId = '65t4r3'
        createCandidateForm.setValue('recruiterId', currentUserId)
    }

    // Check for validation errors before showing the modal
    const handleSubmitWithModal = async () => {
        const isValid = await createCandidateForm.trigger()

        if (isValid) {
            modal.showModal()
        }
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                modalTitle='Create confirm'
                buttonVariant={ButtonVariant.Primary}
                handleClose={modal.closeModal}
                modalConfirmQuestion='Do you want to create candidate ?'
                handleConfirm={createCandidateForm.handleSubmit(onSubmit)}
            />

            <div className='card shadow mb-3'>
                <div className='card-header py-3'>
                    <h6 className='m-0 font-weight-bold text-primary'>Create Candidate</h6>
                </div>

                <div className='card-body'>
                    <form>
                        <b style={{ paddingLeft: 12 }}>I. Personal Information</b>

                        {/* 1st row */}
                        <div className='d-flex flex-wrap'>
                            {/* 1st column */}
                            <div className='col-lg-6 col-md-6 col-12'>
                                {/* Full name */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Full Name <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CreateCandidateRequest>
                                            name='username'
                                            type='text'
                                            form={createCandidateForm}
                                            placeholder='Enter full name'
                                        />
                                    </div>
                                </div>

                                {/* DOB */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        D.O.B <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CreateCandidateRequest>
                                            name='dob'
                                            type='date'
                                            form={createCandidateForm}
                                        />
                                    </div>
                                </div>

                                {/* Phone number */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label'>
                                        Phone Number <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CreateCandidateRequest>
                                            name='phoneNumber'
                                            type='tel'
                                            form={createCandidateForm}
                                            placeholder='Type a number'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-6 col-12'>
                                {/* Email */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Email <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CreateCandidateRequest>
                                            name='email'
                                            type='email'
                                            form={createCandidateForm}
                                            placeholder='Enter Email address'
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Address <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-lg-6'>
                                        <ControlledInput<CreateCandidateRequest>
                                            name='address'
                                            type='text'
                                            form={createCandidateForm}
                                            placeholder='Enter address'
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Gender <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CreateCandidateRequest>
                                            name='gender'
                                            form={createCandidateForm}
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
                            </div>
                        </div>

                        <b style={{ paddingLeft: 12, marginTop: 10, marginBottom: 10 }}>
                            II. Professional Information
                        </b>

                        {/* 2nd row */}
                        <div className='d-flex flex-wrap'>
                            {/* 1st column */}
                            <div className='col-lg-6 col-md-6 col-12'>
                                {/* CV */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        CV Attachment <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CreateCandidateRequest>
                                            name='attachment'
                                            type='file'
                                            form={createCandidateForm}
                                        />
                                    </div>
                                </div>

                                {/* Current position */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Current Position <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CreateCandidateRequest>
                                            name='positionId'
                                            form={createCandidateForm}
                                            optionList={EnumList.positionList}
                                            registerOptions={{ valueAsNumber: true }}
                                        />
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Skills <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledMultiSelection<CreateCandidateRequest>
                                            form={createCandidateForm}
                                            name='skillId'
                                            optionList={EnumList.skillList}
                                        />
                                    </div>
                                </div>

                                {/* Recruiter */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Recruiter <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CreateCandidateRequest>
                                            name='recruiterId'
                                            form={createCandidateForm}
                                            optionList={recruiterList}
                                        />

                                        <Link to={''} onClick={assignToMe}>
                                            Assign to me
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* 2nd column */}
                            <div className='col-lg-6 col-md-6 col-12'>
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Year of Experience <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CreateCandidateRequest>
                                            name='yearsOfExperience'
                                            type='number'
                                            form={createCandidateForm}
                                            placeholder='Type a number'
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Highest Level <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CreateCandidateRequest>
                                            name='highestLevelId'
                                            form={createCandidateForm}
                                            optionList={EnumList.highestLevelList}
                                            registerOptions={{ valueAsNumber: true }}
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Note <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledTextArea
                                            form={createCandidateForm}
                                            name='note'
                                            rows={3.5}
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
                                    onClick={() => createCandidateForm.reset()}
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

export default CandidateCreateComponent
