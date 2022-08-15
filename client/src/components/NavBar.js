import {useSelector, useDispatch} from "react-redux"
import {userLogOut} from '../slices/userSlice'
import {Link} from "react-router-dom"
import styled from "styled-components";
import logo from "../assets/LS_logo_300.png";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Img = styled.img`
  height: 50px;
`

function NavBar() {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.value) 

  return(
    <Navbar sticky="top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Img src={logo} alt="LightShip logo" />
        &emsp; LightShip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
            <Nav.Link as={Link} to="/friends">Friends</Nav.Link>
            <Nav.Link as={Link} to="/tracks">Tracks+Actions</Nav.Link>
            <Nav.Link as={Link} to="/groups">Groups</Nav.Link>
          </Nav>
          
          <Nav>
            <NavDropdown title={`Logged in as ${user.username}`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/user-edit">Edit my info</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/" onClick={()=>dispatch(userLogOut())} >
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavBar;