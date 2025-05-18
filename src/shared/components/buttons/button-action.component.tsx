import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ButtonVariant } from 'react-bootstrap/esm/types'

interface ActionButtonProps {
    action: () => void
    buttonColor: ButtonVariant
    tooltipName: string
    icon: IconDefinition
}

/**
 * Button element with action, color, tooltip and icon. Button also contains tooltip
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
                <ButtonActionComponent
                    icon={faEye}
                    tooltipName='Details'
                    buttonColor={ButtonColor.Primary}
                    action={() => navigate(`/job/detail/${user.id}`)}
                />
 *   );
 * }
 */
function ButtonActionComponent({ buttonColor, tooltipName, icon, action }: ActionButtonProps) {
    return (
        <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-view'>{tooltipName}</Tooltip>}>
            <Button variant={buttonColor} className='m-1 btn-sm' onClick={action}>
                <FontAwesomeIcon icon={icon} />
            </Button>
        </OverlayTrigger>
    )
}

export default memo(ButtonActionComponent)
