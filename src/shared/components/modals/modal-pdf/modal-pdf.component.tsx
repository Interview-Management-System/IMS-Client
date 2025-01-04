import { Button } from 'react-bootstrap'

interface ShowPdfModalProps {
    isOpen: boolean
    closeModal: () => void
    pdfUrl: string
    fileName: string
}

function ModalPdfComponent({ pdfUrl, fileName, isOpen, closeModal }: ShowPdfModalProps) {
    if (!isOpen) return null

    return (
        <>
            {isOpen && (
                <div
                    className='modal fade show d-block'
                    tabIndex={-1}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className='modal-dialog modal-xl modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Candidate CV</h5>
                                <button
                                    type='button'
                                    className='btn-close'
                                    aria-label='Close'
                                    onClick={closeModal}
                                ></button>
                            </div>

                            {/* PDF Viewer */}
                            <div className='modal-body' style={{ height: '70vh', overflow: 'auto' }}>
                                <embed src={pdfUrl} type='application/pdf' width='100%' height='500px' />
                            </div>

                            <div className='modal-footer'>
                                <Button variant='secondary' onClick={closeModal}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalPdfComponent
