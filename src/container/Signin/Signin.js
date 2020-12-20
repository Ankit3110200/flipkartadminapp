import React, { useState } from 'react'
import { Container, Row,Form,Col,Button } from 'react-bootstrap'
import Input from '../../components/UI/input'
import { login} from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Layout from '../../components/Layout'
function Signin(props) {
    const [email,setemail]=useState('');
    
    const [password,setpassword]=useState('');

    const [error,seterror]=useState('');
    const auth=useSelector(state=>state.auth);
    const dispatch =useDispatch()
   
      
    const userlogin=(event)=>{
       
        event.preventDefault();
                const user ={
                    email,password 
                }       
                dispatch(login(user))
    }
    if(auth.authenticate){
        return <Redirect to="/"/>
    }
    return (
        
        <>
            <Layout/>
            <Container>
                <Row style={{marginTop:"50px"}}>
                    <Col md={{ spam: 6, offset: 2 }}>
                        <Form onSubmit={userlogin}>
                        <Input
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="text"
                                     onChange={(event) => setemail(event.target.value)}
                                />

                                <Input
                                    label="Password"
                                    placeholder="password"
                                    value={password}
                                    type="password"
                                    onChange={(event) => setpassword(event.target.value)}
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


export default Signin
