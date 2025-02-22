import { memo, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FileUtils } from '../../../utils/file.utils'

interface ShowPdfModalProps {
    isOpen: boolean
    pdfUrl?: string
    fileName: string
    closeModal: () => void
}

function ModalPdfComponent({ pdfUrl, fileName, isOpen = false, closeModal }: ShowPdfModalProps) {
    const [newPdfUrl, setNewPdfUrl] = useState('')

    console.log('render')

    useEffect(() => {
        async function loadPdf() {
            if (pdfUrl) {
                const url = await FileUtils.fetchFileUrl(pdfUrl)
                setNewPdfUrl(url!)
            }
        }

        loadPdf()

        return () => window.URL.revokeObjectURL(newPdfUrl)
    }, [pdfUrl])

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
                                <embed
                                    src={newPdfUrl}
                                    width='100%'
                                    height='500px'
                                    title={fileName}
                                    type='application/pdf'
                                />
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

export default memo(ModalPdfComponent)
