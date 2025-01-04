import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { pdfBytes } from '../../../../../data/test/test'
import { candidateDetailTestData } from '../../../../../data/test/user-data.test'
import ModalPdfComponent from '../../../../../shared/components/modals/modal-pdf/modal-pdf.component'
import { DateUtility } from '../../../../../shared/utils/date.util'
import { FileUtils } from '../../../../../shared/utils/file.utils'
import './candidate-detail.scss'

function CandidateDetailComponent() {
    const navigate = useNavigate()
    const candidateDetail = candidateDetailTestData

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pdfUrl, setPdfUrl] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')

    useEffect(() => {
        const pdfUrl = FileUtils.createPdfUrlFromBytes(pdfBytes)

        setFileName('asdfasfasdf')
        setPdfUrl(pdfUrl)

        // Cleanup function to revoke the Blob URL when the component unmounts
        return () => URL.revokeObjectURL(pdfUrl)
    }, [])

    return (
        <>
            <ModalPdfComponent
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                fileName={fileName}
                pdfUrl={pdfUrl}
            />

            <div className='card shadow mb-3'>
                <div className='card-header py-3 d-flex justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>
                        <span>Candidate Detail</span>
                    </h6>

                    <h6 className='m-0'>
                        <span>
                            Created on {DateUtility.formatDate(candidateDetail.createAt!, 'dd/mm/yyyy')}, last
                            updated by {candidateDetail.updatedBy}
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
                                <label className='col-lg-4 col-form-label'>Full Name</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.username}</div>
                            </div>

                            {/* DOB */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label'>D.O.B</label>

                                <div className='col-lg-6 col-form-label'>
                                    {DateUtility.formatDate(candidateDetail.dob!, 'dd/mm/yyyy')}
                                </div>
                            </div>

                            {/* Phone number */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label'>Phone Number</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.phoneNumber}</div>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-12'>
                            {/* Email */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label'>Email</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.email}</div>
                            </div>

                            {/* Address */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label'>Address</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.address}</div>
                            </div>

                            {/* Gender */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label'>Gender</label>

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
                                <label className='col-lg-4 col-form-label '>CV Attachment</label>

                                <div className='col-lg-6 col-form-label d-flex'>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {fileName}
                                        <FontAwesomeIcon icon={faPaperclip} />
                                    </span>

                                    <Button
                                        variant='warning'
                                        size='sm'
                                        className='ms-2'
                                        onClick={() => {
                                            setPdfUrl(pdfUrl)
                                            setFileName(fileName)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>

                            {/* Current position */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label '>Current Position</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.position}</div>
                            </div>

                            {/* Skills */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label '>Skills</label>

                                <div className='col-lg-8 col-form-label skills-container'>
                                    {candidateDetail.skills!.map((skill, index) => (
                                        <span key={index} className='badge bg-secondary me-2 skill-tag'>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Recruiter */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label '>Recruiter</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.recruiterName}</div>
                            </div>
                        </div>

                        {/* 2nd column */}
                        <div className='col-lg-6 col-md-6 col-12'>
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label '>Status</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.status}</div>
                            </div>

                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label '>Year of Experience</label>

                                <div className='col-lg-6 col-form-label'>
                                    {candidateDetail.yearsOfExperience}
                                </div>
                            </div>

                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label '>Highest Level</label>

                                <div className='col-lg-6 col-form-label'>{candidateDetail.highestLevel}</div>
                            </div>

                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label '>Note</label>

                                <div className='col-lg-6 col-form-label'>
                                    {!candidateDetail.note?.trim() ? 'N/A' : candidateDetail.note}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='form-group row'>
                        <div className='col-lg-12 d-flex justify-content-center'>
                            <Button className='me-2' variant='info' type='button' onClick={() => {}}>
                                Edit
                            </Button>

                            <Button className='me-2' variant='danger' type='button' onClick={() => {}}>
                                Ban Candidate
                            </Button>

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

export default CandidateDetailComponent
