import React from 'react'
import Layout from '../../components/Layout'
import "./style.css"
function Home(props) {
    return (
        <>
            <Layout sidebar />
            <p style={{marginLeft:"20%" , paddingTop:"60px"}}>THIS IS HOME PAGE</p>
            
                {/* <Jumbotron style={{margin:"5rem"}} className="text-center">
                    <h1>Welcome to Admin Dashboard</h1>
                </Jumbotron> */}
           
        </>
    )
}


export default Home
