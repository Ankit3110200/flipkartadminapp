import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Header from "../Header/index"
import "./style.css" 
const Layout =(props)=> {
   

    return (
        <>
          <Header/> 
          {
            props.sidebar?
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">
                       <ul>
                        <li>
                            <NavLink exact to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/page'>Page</NavLink>
                        </li>
                        <li>   <NavLink to='/products'>products</NavLink></li>
                        <li>   <NavLink to='/orders'>orders</NavLink></li>
                        <li>   <NavLink to='/category'>Category</NavLink></li>
                        </ul>
                </Col>
                <Col md={10} style={{ marginLeft: "auto" }}> {props.childern}</Col>
            </Row></Container>
            :
            props.childern
          }
          
         
          
        </>
    )
}

export default Layout