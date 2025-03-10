import { useState } from 'react'

export default function useModal() {
    // Modal state
    const [show, setShow] = useState(false)
    const showModal = () => setShow(true)
    const closeModal = () => setShow(false)

    // Confirmation state
    const [modalTitle, setModalTitle] = useState('')
    const [modalConfirmQuestion, setModalConfirmQuestion] = useState('')
    const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => {})

    // Combined confirm method that opens modal and sets confirmation details
    const confirm = (title: string, question: string, handler: () => void) => {
        showModal()
        setModalTitle(title)
        setModalConfirmQuestion(question)
        setModalConfirmHandler(() => handler)
    }

    return { show, modalTitle, modalConfirmQuestion, modalConfirmHandler, showModal, closeModal, confirm }
}
