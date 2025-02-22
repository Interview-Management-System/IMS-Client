import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import candidateService from '../../../../../modules/user/services/candidate.service'
import userStore from '../../../../../modules/user/stores/user.store'
import ModalPdfComponent from '../../../../../shared/components/modals/modal-pdf/modal-pdf.component'
import { CandidateStatusEnum } from '../../../../../shared/enums/entity-enums/candidate.enum'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import { DateUtility } from '../../../../../shared/utils/date.util'
import './candidate-detail.scss'

function CandidateDetailComponent() {
    const { id } = useParams()
    const navigate = useNavigate()

    const candidateDetail = userStore.candidateDetail
    const [isModalOpen, setIsModalOpen] = useState(false)

    useFetch(() => candidateService.getCandidateById(id!))

    return (
        <>
            {candidateDetail.attachmentLink && (
                <ModalPdfComponent
                    fileName={'adsfasdfafsddasaasdfsdaf'}
                    isOpen={isModalOpen}
                    pdfUrl={candidateDetail.attachmentLink}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}

            <div className='card shadow mb-3'>
                <div className='card-header py-3 d-flex justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>
                        <span>Candidate Detail</span>
                    </h6>

                    <h6 className='m-0'>
                        <span>
                            Created on{' '}
                            {DateUtility.formatDate(candidateDetail.auditInformation?.createAt, 'dd/mm/yyyy')}
                            , last updated at{' '}
                            {DateUtility.formatDate(candidateDetail.auditInformation?.updateAt, 'dd/mm/yyyy')}{' '}
                            by {candidateDetail.auditInformation?.updateBy ?? ''},{' '}
                            {DateUtility.formatRelativeDate(candidateDetail.auditInformation?.updateAt)}
                        </span>
                    </h6>
                </div>

                <div className='card-body'>
                    <b style={{ paddingLeft: 12 }}>I. Personal Information</b>

                    {/* 1st row */}
                    <div className='d-flex flex-wrap'>
                        {/* 1st column */}
                        <div className='col-lg-6 col-md-6 col-12'>
                            {/* Full name */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Full Name</label>

                                <div className='col-lg-6 col-form-label'>
                                    {candidateDetail.personalInformation?.username}
                                </div>
                            </div>

                            {/* DOB */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>D.O.B</label>

                                <div className='col-lg-6 col-form-label'>
                                    {DateUtility.formatDate(
                                        candidateDetail.personalInformation?.dob!,
                                        'dd/mm/yyyy'
                                    )}
                                </div>
                            </div>

                            {/* Phone number */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Phone Number</label>

                                <div className='col-lg-6 col-form-label'>
                                    {candidateDetail.personalInformation?.phoneNumber}
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-12'>
                            {/* Email */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Email</label>

                                <div className='col-lg-6 col-form-label'>
                                    {candidateDetail.personalInformation?.email}
                                </div>
                            </div>

                            {/* Address */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Address</label>

                                <div className='col-lg-6 col-form-label'>
                                    {candidateDetail.personalInformation?.address}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Gender</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.gender}</div>
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
                                <label className='col-lg-4 col-form-label fw-semibold '>CV Attachment</label>

                                <div className='col-lg-6 col-form-label d-flex'>
                                    {candidateDetail.attachmentLink && (
                                        <>
                                            <span
                                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                                            >
                                                {`CV-${candidateDetail.personalInformation?.username}`}
                                                <FontAwesomeIcon icon={faPaperclip} />
                                            </span>

                                            <Button
                                                variant='warning'
                                                size='sm'
                                                className='ms-2'
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                View
                                            </Button>
                                        </>
                                    )}

                                    {!candidateDetail.attachmentLink && <>Not available</>}
                                </div>
                            </div>

                            {/* Current position */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold '>
                                    Current Position
                                </label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.position}</div>
                            </div>

                            {/* Skills */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold '>Skills</label>

                                <div className='col-lg-8 col-form-label skills-container'>
                                    {candidateDetail.skills?.map((skill, index) => (
                                        <span key={index} className='badge bg-secondary me-2 skill-tag'>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Recruiter */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold '>Recruiter</label>

                                {/* <div className='col-lg-6 col-form-label'>{candidateDetail.recruiterName}</div> */}
                            </div>
                        </div>

                        {/* 2nd column */}
                        <div className='col-lg-6 col-md-6 col-12'>
                            {/* Status */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold '>Status</label>

                                <div className='col-lg-6 col-form-label'>
                                    {candidateDetail.candidateStatus}
                                </div>
                            </div>

                            {/* Year of Experience */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold '>
                                    Year of Experience
                                </label>

                                <div className='col-lg-6 col-form-label'>
                                    {candidateDetail.professionalInformation?.yearsOfExperience}
                                </div>
                            </div>

                            {/* Highest Level */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold '>Highest Level</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.highestLevel}</div>
                            </div>

                            {/* Note */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold '>Note</label>

                                <div className='col-lg-6 col-form-label'>
                                    {!candidateDetail.note ? 'N/A' : candidateDetail.note}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='form-group row'>
                        <div className='col-lg-12 d-flex justify-content-center'>
                            <Button
                                className='me-2'
                                variant='info'
                                type='button'
                                onClick={() => navigate(`/candidate/edit/${candidateDetail.id}`)}
                            >
                                Edit
                            </Button>

                            {candidateDetail.professionalInformation?.candidateStatusId !==
                                CandidateStatusEnum.Banned && (
                                <Button className='me-2' variant='danger' type='button' onClick={() => {}}>
                                    Ban Candidate
                                </Button>
                            )}

                            <Button variant='secondary' type='button' onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(CandidateDetailComponent)
