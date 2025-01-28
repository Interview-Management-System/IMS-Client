import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import userService from '../../../../../modules/user/services/user.service'
import userStore from '../../../../../modules/user/stores/user.store'
import ModalConfirmComponent from '../../../../../shared/components/modals/modal-confirm/modal-confirm.component'
import { ButtonVariant } from '../../../../../shared/enums/button-variant.enum'
import { useFetch } from '../../../../../shared/hooks/use-fetch'
import useModal from '../../../../../shared/hooks/useModal'
import { DateUtility } from '../../../../../shared/utils/date.util'
import './user-detail.scss'

function UserDetailComponent() {
    const modal = useModal()
    const { id } = useParams()
    const navigate = useNavigate()

    const userDetail = userStore.userDetail
    useFetch(() => userService.getUserById(id ?? ''))

    const [, setUserIdToDelete] = useState('')
    const [, setUserIdToActivate] = useState('')
    const [, setUserIdToDeActivate] = useState('')

    // Modal states
    const [modalTitle, setModalTitle] = useState('')
    const [modalConfirmQuestion, setModalConfirmQuestion] = useState('')
    const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => {})

    // Activate
    function confirmActivateUser(userId: string) {
        modal.showModal()
        setUserIdToActivate(userId)
        setModalTitle('Active confirmation')
        setModalConfirmQuestion('Are you sure you want to activate ?')
        setModalConfirmHandler(() => () => userService.activateUser(userId))
    }

    // De-Activate
    function confirmDeActivateUser(userId: string) {
        modal.showModal()
        setUserIdToDeActivate(userId)
        setModalTitle('De-activate confirmation')
        setModalConfirmQuestion('Are you sure you want to de-activate ?')
        setModalConfirmHandler(() => () => userService.deActivateUser(userId))
    }

    return (
        <>
            <ModalConfirmComponent
                show={modal.show}
                buttonVariant={ButtonVariant.Danger}
                modalTitle={modalTitle}
                handleClose={modal.closeModal}
                modalConfirmQuestion={modalConfirmQuestion}
                handleConfirm={modalConfirmHandler}
            />

            <div className='card shadow mb-3'>
                <div className='card-header py-3 d-flex justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>
                        <span>Candidate Detail</span>
                    </h6>

                    <h6 className='m-0'>
                        {userDetail.isActive && (
                            <Button
                                variant={ButtonVariant.Danger}
                                type='button'
                                size='sm'
                                onClick={() => confirmDeActivateUser(userDetail.id)}
                            >
                                De-activate user
                            </Button>
                        )}

                        {!userDetail.isActive && (
                            <Button
                                variant={ButtonVariant.Success}
                                type='button'
                                size='sm'
                                onClick={() => confirmActivateUser(userDetail.id)}
                            >
                                Activate user
                            </Button>
                        )}
                    </h6>
                </div>

                <div className='card-body'>
                    <div className='d-flex flex-wrap'>
                        <div className='col-lg-6 col-md-6 col-12'>
                            {/* Full name */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Full Name</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.username}</div>
                            </div>

                            {/* DOB */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>D.O.B</label>

                                <div className='col-lg-6 col-form-label'>
                                    {DateUtility.formatDate(userDetail.dob, 'dd/mm/yyyy')}
                                </div>
                            </div>

                            {/* Phone number */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Phone Number</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.phoneNumber}</div>
                            </div>

                            {/* Role */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Role</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.role}</div>
                            </div>

                            {/* Status */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Status</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.statusText}</div>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-12'>
                            {/* Email */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Email</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.email}</div>
                            </div>

                            {/* Address */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Address</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.address}</div>
                            </div>

                            {/* Gender */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Gender</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.gender}</div>
                            </div>

                            {/* Department */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Department</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.department}</div>
                            </div>

                            {/* Note */}
                            <div className='form-group row'>
                                <label className='col-lg-4 col-form-label fw-semibold'>Note</label>

                                <div className='col-lg-6 col-form-label'>{userDetail.note}</div>
                            </div>
                        </div>
                    </div>

                    <div className='form-group row'>
                        <div className='col-lg-12 d-flex justify-content-center'>
                            <Button
                                className='me-2'
                                variant='info'
                                type='button'
                                onClick={() => navigate(`/user/edit/${userDetail.id}`)}
                            >
                                Edit
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

export default observer(UserDetailComponent)
