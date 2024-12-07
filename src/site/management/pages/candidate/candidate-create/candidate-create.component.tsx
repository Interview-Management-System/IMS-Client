import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import ControlledInput from '../../../../../shared/components/form/form-input.component'
import ControlledMultiSelection from '../../../../../shared/components/form/form-multi-selection.component'
import ControlledSelection from '../../../../../shared/components/form/form-selection.component'
import ControlledTextArea from '../../../../../shared/components/form/form-text-area.component'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import { HighestLevelEnum, PositionEnum, RoleIdEnum } from '../../../../../shared/enums/master-data.enum'
import { EnumList } from '../../../../../shared/helpers/enums/enum-list.helper'
import { createCandidateValidationSchema } from '../../../../../shared/helpers/form/validations/validation-schemas.builder'
import { CreateCandidateRequest } from '../../../../../shared/models/candidate.model'
import tokenUtils from '../../../../../shared/utils/tokens/token.utils'

function onSubmit(formData: CreateCandidateRequest) {
    // service here
    formData.roleId = RoleIdEnum.Candidate
    formData.createdBy = tokenUtils.getCurrentUserIdFromCookie() // get guid from jwt
    formData.positionId = +(formData.positionId as PositionEnum)
    formData.highestLevelId = +(formData.highestLevelId as HighestLevelEnum)

    if (typeof formData.gender === 'string') {
        formData.gender = (formData.gender as string) === '1'
    }

    console.log(formData)
}

function CandidateCreateComponent() {
    const navigate = useNavigate()

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
        createCandidateForm.setValue('recruiterId', '65t4r3')
    }

    // For modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    return (
        <>
            <ModalConfirmComponent
                show={show}
                handleConfirm={createCandidateForm.handleSubmit(onSubmit)}
                handleClose={handleClose}
                buttonText='Create'
                modalTitle='Create confirm'
                modalConfirmQuestion='Do you want to create candidate ?'
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
                                            type='number'
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

                                {/* DOB */}
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

                                <div className='form-group row'>
                                    <label className='col-lg-4 col-form-label '>
                                        Gender <span className='text-danger'>*</span>
                                    </label>

                                    <div className='col-lg-6'>
                                        <ControlledSelection<CreateCandidateRequest>
                                            name='gender'
                                            form={createCandidateForm}
                                            optionList={EnumList.genderList}
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

                                {/* Skills */}
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
                                <Button className='me-2' variant='primary' type='submit'>
                                    Submit
                                </Button>

                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={() => setShow(true)}
                                >
                                    test
                                </button>

                                <button
                                    type='reset'
                                    className='btn btn-info ms-2'
                                    onClick={() => createCandidateForm.reset()}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CandidateCreateComponent
