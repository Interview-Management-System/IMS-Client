import { Button, Modal } from 'react-bootstrap'
import { ButtonVariant } from '../../../enums/button-variant.enum'
import './modal-confirm.scss'

interface ModalConfirm {
    show: boolean
    modalTitle?: string
    handleClose: () => void
    handleConfirm: () => void
    modalConfirmQuestion?: string
    buttonVariant?: ButtonVariant
}

function ModalConfirmComponent({
    modalTitle,
    modalConfirmQuestion,
    show,
    buttonVariant,
    handleClose,
    handleConfirm
}: ModalConfirm) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{modalConfirmQuestion}</Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>

                <Button
                    variant={buttonVariant ?? ButtonVariant.Primary}
                    onClick={() => {
                        handleClose()
                        handleConfirm()
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmComponent
