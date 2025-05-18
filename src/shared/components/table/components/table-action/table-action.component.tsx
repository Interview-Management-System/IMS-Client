import { observer } from 'mobx-react-lite'
import { Button, Container, Navbar } from 'react-bootstrap'
import tableActionStore from '../../../../stores/table-action.store'

function TableActionComponent() {
    const buttonInfos = tableActionStore.buttonInfos

    return (
        (buttonInfos.length === 0 && <></>) || (
            <Navbar
                className='navbar navbar-expand navbar-light bg-white static-top shadow'
                style={{ paddingTop: '10px', paddingBottom: '10px' }}
            >
                <Container className='justify-content-end'>
                    {buttonInfos.map((action, index) => (
                        <Button
                            key={index}
                            onClick={action.onClick}
                            disabled={!action.isDisable}
                            variant={action.variant ?? 'primary'}
                            className={
                                buttonInfos.length === index + 1 ? 'rounded-5 px-4' : 'me-4 rounded-5 px-4'
                            }
                        >
                            {action.label}
                        </Button>
                    ))}
                </Container>
            </Navbar>
        )
    )
}

export default observer(TableActionComponent)
