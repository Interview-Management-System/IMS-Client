import { Button, Container, Navbar } from 'react-bootstrap'
import './bottom-bar.scss'

function BottomBarComponent() {
    return (
        <div className='position-sticky bottom-0 start-0 end-0' style={{ zIndex: 3 }}>
            <Navbar className='navbar navbar-expand navbar-light bg-white topbar static-top shadow p-0'>
                <Container className='justify-content-end'>
                    <Button variant='primary' className='me-2'>
                        Home
                    </Button>

                    <Button variant='outline-secondary' className='me-2'>
                        Search
                    </Button>

                    <Button variant='outline-success'>Profile</Button>
                </Container>
            </Navbar>
        </div>
    )
}

export default BottomBarComponent
