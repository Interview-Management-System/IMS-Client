import { Button, Modal } from 'react-bootstrap'
import './modal-confirm.scss'

interface ModalConfirm {
    buttonText?: string
    modalTitle?: string
    modalConfirmQuestion?: string
    show: boolean
    handleClose: () => void
    handleConfirm: () => void
}

function ModalConfirmComponent({
    buttonText,
    modalTitle,
    modalConfirmQuestion,
    show,
    handleClose,
    handleConfirm
}: ModalConfirm) {
    return (
        <>
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
                        variant='primary'
                        onClick={() => {
                            handleClose()
                            handleConfirm()
                        }}
                    >
                        {buttonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirmComponent
