import { useState } from 'react'

export default function useModal() {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    return { show, handleClose, setShow }
}
