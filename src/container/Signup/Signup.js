import React, { useState } from 'react'
import { Container, Row,Form,Col,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/input'

function Signup(props) {
    const [lastname,setlast]=useState('');
    const [firstname,setfirst]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    
    const auth=useSelector(state=>state.auth)
    const user1=useSelector(state=>state.user)
    
    const dispatch=useDispatch()
    
    const usersignup=(event)=>{
        event.preventDefault();
        const user={
            firstname,lastname,email,password
        }
        dispatch(signup(user))
    }
   
    if(auth.authenticate){
        return <Redirect to={"/"}/>
    }
   
    if(user1.loading){
        return <p>Loading...</p>
    }
    return (
        <>
            <Layout/>
            <Container>
            {user1.message}
                <Row style={{marginTop:"50px"}}>
                    <Col md={{ spam: 6, offset: 2 }}>
                        <Form onSubmit={usersignup}>
                            <Row>
                                <Col md={6}>
                                <Input
                                    label="First Name"
                                    placeholder="First Name"
                                    value={firstname}
                                    type="text"
                                    onChange={(e) => setfirst(e.target.value)}
                                />
                                </Col>
                                <Col md={6}>
                                <Input
                                    label="Last Name"
                                    placeholder="Last Name"
                                    value={lastname}
                                    type="text"
                                    onChange={(e) => setlast(e.target.value)}
                                />
                                </Col>
                            </Row>
                            <Input
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="text"
                                    onChange={(e) => setemail(e.target.value)}
                                />

                                <Input
                                    label="Password"
                                    placeholder="password"
                                    value={password}
                                    type="password"
                                    onChange={(e) => setpassword(e.target.value)}
                                />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default Signup
