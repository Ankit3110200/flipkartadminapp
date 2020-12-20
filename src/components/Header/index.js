import React from 'react'
import { Navbar,Nav, Container } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink,Link } from 'react-router-dom'
import { signout } from '../../actions'

const Header =(props)=> {
    const auth=useSelector(state=>state.auth)
    const dispatch=useDispatch();
    const logout= () =>{
        dispatch(signout())
    }
    const renderloginlinks=()=>{
        return (
            <Nav>
            <li className='nav-item'>
            <span className="nav-link" onClick={logout} >Sign out</span>
            </li>
            </Nav>);
    }
    const rendernonloglinks =()=>{
        return(<Nav>
            <li className="nav-item">
            <NavLink to="signin" className="nav-link" >Sign in</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="signup" className="nav-link">Sign Up</NavLink>
            </li>
             {/* <Nav.Link eventKey={2} href="#memes">
                 Dank memes
             </Nav.Link> */}
             </Nav>);
    }

    return (
        <>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:"1"}}>
            <Container fluid>
            <Link to="/" className="navbar-brand">Admin Dashboard</Link>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
            
                </Nav>
                {auth.authenticate ?renderloginlinks():rendernonloglinks()}
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}


export default Header
