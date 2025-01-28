import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface ActionButtonProps {
    detailRoute: string
    editRoute: string
    deleteAction?: () => void
    otherAction?: () => void
}

function ActionButtonComponent({ detailRoute, editRoute, deleteAction, otherAction }: ActionButtonProps) {
    const navigate = useNavigate()

    return (
        <>
            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-view'>Details</Tooltip>}>
                <Button variant='primary' className='m-1 btn-sm' onClick={() => navigate(detailRoute)}>
                    <FontAwesomeIcon icon={faEye} />
                </Button>
            </OverlayTrigger>

            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-edit'>Edit </Tooltip>}>
                <Button variant='info' className='m-1 btn-sm' onClick={() => navigate(editRoute)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </OverlayTrigger>

            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-delete'>Delete </Tooltip>}>
                <Button variant='danger' className='m-1 btn-sm' onClick={deleteAction}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </OverlayTrigger>

            <OverlayTrigger
                placement='top'
                overlay={<Tooltip id='tooltip-another-action'>Another Action</Tooltip>}
            >
                <Button variant='danger' className='m-1 btn-sm' onClick={otherAction}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </OverlayTrigger>
        </>
    )
}

export default memo(ActionButtonComponent)
