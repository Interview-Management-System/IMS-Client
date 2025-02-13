import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CandidateForUpdateDTO } from '../../../../../modules/user/models/candidate.model'
import userStore from '../../../../../modules/user/stores/user.store'
import ControlledDateInput from '../../../../../shared/components/form/form-date-input.component'
import ControlledInput from '../../../../../shared/components/form/form-input.component'
import ControlledSelection from '../../../../../shared/components/form/form-selection.component'
import ControlledTextArea from '../../../../../shared/components/form/form-text-area.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import useModal from '../../../../../shared/hooks/useModal'

function handleEditCandidate(formData: CandidateForUpdateDTO) {
    console.log(formData)
}

function CandidateEditComponent() {
    const modal = useModal()
    const navigate = useNavigate()
    const candidateUpdateForm = useForm<CandidateForUpdateDTO>({
        defaultValues: userStore.candidateDetail as any
        // resolver: yupResolver(createCandidateValidationSchema())
    })

    async function handleSubmitWithModal() {
        const isValid = await candidateUpdateForm.trigger()

        if (isValid) {
            modal.showModal()
        }
    }

    function assignToMe() {
        // get user guid from jwt here
        const currentUserId = '65t4r3'
        candidateUpdateForm.setValue('recruiterId', currentUserId)
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                modalTitle='Edit confirm'
                buttonVariant={ButtonVariant.Primary}
                handleClose={modal.closeModal}
                modalConfirmQuestion='Do you want to edit candidate ?'
                handleConfirm={candidateUpdateForm.handleSubmit(handleEditCandidate)}
            />
            <div className='card shadow mb-3'>
                <div className='card-header py-3'>
                    <h6 className='m-0 font-weight-bold text-primary'>Create Candidate</h6>
                </div>

                <div className='card-body'>
                    <form encType='multipart/form-data'>
                        <b style={{ paddingLeft: 12 }}>I. Personal Information</b>

                        {/* 1st row */}
                        <div className='d-flex flex-wrap'>
                            {/* 1st column */}
                            <div className='col-lg-6 col-md-6 col-12'>
                                {/* Full name */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Full Name <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CandidateForUpdateDTO>
                                            name='username'
                                            form={candidateUpdateForm}
                                            placeholder='Enter full name'
                                        />
                                    </div>
                                </div>

                                {/* DOB */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        D.O.B <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledDateInput<CandidateForUpdateDTO>
                                            name='dob'
                                            form={candidateUpdateForm}
                                        />
                                    </div>
                                </div>

                                {/* Phone number */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold'>
                                        Phone Number <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CandidateForUpdateDTO>
                                            name='phoneNumber'
                                            type='tel'
                                            form={candidateUpdateForm}
                                            placeholder='Type a number'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-6 col-12'>
                                {/* Email */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Email <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CandidateForUpdateDTO>
                                            name='email'
                                            type='email'
                                            form={candidateUpdateForm}
                                            placeholder='Enter Email address'
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Address <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-lg-6'>
                                        <ControlledInput<CandidateForUpdateDTO>
                                            name='address'
                                            type='text'
                                            form={candidateUpdateForm}
                                            placeholder='Enter address'
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Gender <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CandidateForUpdateDTO>
                                            name='gender'
                                            form={candidateUpdateForm}
                                            options={EnumList.genderList}
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
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        CV Attachment
                                    </label>

                                    <div className='col-lg-6'>
                                        <input
                                            type='file'
                                            className='form-control'
                                            accept='application/pdf'
                                            {...candidateUpdateForm.register('attachment')}
                                        />
                                        <p></p>
                                    </div>
                                </div>

                                {/* Current position */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Current Position <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CandidateForUpdateDTO>
                                            name='positionId'
                                            form={candidateUpdateForm}
                                            options={EnumList.positionList}
                                        />
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Skills <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CandidateForUpdateDTO>
                                            isMulti
                                            name='skillId'
                                            closeMenuOnSelect={false}
                                            form={candidateUpdateForm}
                                            options={EnumList.skillList}
                                        />
                                    </div>
                                </div>

                                {/* Recruiter */}
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Recruiter <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CandidateForUpdateDTO>
                                            name='recruiterId'
                                            form={candidateUpdateForm}
                                            options={userStore.recruiterlist}
                                        />

                                        <Button
                                            size='sm'
                                            variant={ButtonVariant.Success}
                                            onClick={assignToMe}
                                        >
                                            Assign to me
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* 2nd column */}
                            <div className='col-lg-6 col-md-6 col-12'>
                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Year of Experience <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledInput<CandidateForUpdateDTO>
                                            type='number'
                                            name='yearsOfExperience'
                                            form={candidateUpdateForm}
                                            placeholder='Type a number'
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Highest Level <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CandidateForUpdateDTO>
                                            name='highestLevelId'
                                            form={candidateUpdateForm}
                                            options={EnumList.highestLevelList}
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label fw-semibold '>
                                        Note <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledTextArea
                                            form={candidateUpdateForm}
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
                                    onClick={() => candidateUpdateForm.reset()}
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

export default CandidateEditComponent
