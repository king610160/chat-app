import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'

const NavBar = () => {
    // const { user } = useContext(AuthContext)
    return ( 
        <Navbar bg='dark' className='mb-4' style={{ height: '3.75rem' }}>
            <Container>
                <h5>
                    <Link to='/' className='link-light text-decoration-none'>Chat_App</Link>
                </h5>
                <span className='text-warning'>Logged in as Ken</span>
                <Nav>
                    <Stack direction='horizontal' gap={3}>
                        <h5>
                            <Link to='/login' className='link-light text-decoration-none'>Login</Link>
                        </h5>
                        <h5>
                            <Link to='/register' className='link-light text-decoration-none'>Register</Link>
                        </h5>
                    </Stack>
                </Nav>
            </Container>
        </Navbar> 
    );
}
 
export default NavBar;