import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createPage } from '../../actions'

import Layout from '../../components/Layout'
import Input from '../../components/UI/input'
import linearcategorylist from '../../helper/linearcategorylist'
const Newpage = (props) => {
    const [createmodal,setcreatemodal]=useState(false)
    const [title,settitle]=useState("")
    const [categories,setcategories]=useState([]);
    const [categoryid,setcategoryid]=useState('')
    const [desc,setdesc]=useState("")
    const [type,settype]=useState()
    const [banners,setbanners]=useState([])
    const [products,setproducts]=useState([])

    

    const category=useSelector(state=>state.category)

    
    const page=useSelector(state=>state.page)
    const dispatch=useDispatch()
    useEffect(()=>{
        setcategories(linearcategorylist(category.categories))
    },[category])
    useEffect(()=>{
        if(!page.loading){
            setcreatemodal(false)
            settitle("")
            setdesc("")
            setbanners([])
            setproducts([])
            setcategoryid('')
        }
    },[page])
    const handlebannerimg=(e)=>{
        console.log(e)
        setbanners([...banners,e.target.files[0]])
    }
    const handleproductimg=(e)=>{
        console.log(e)
        setproducts([...products,e.target.files[0]])
    }
    const oncategorychange =(e)=>{
       
        const category=categories.find(category=>category.value==e.target.value)
        setcategoryid(e.target.value)
        
        settype(category.type)

    }
    const onproductchange=(e)=>{
        console.log(e.target.value)
    }

    const submitpageform=(e)=>{

        if(title===""){
            alert("title is required")

            setcreatemodal(false)
            return
        }
        const form=new FormData()
        form.append('title',title)
        form.append('description',desc)
        form.append('category',categoryid)
        form.append('type',type)
        for(let banner of banners){
            form.append("banners",banner)
            console.log(banner)
        }
        products.forEach((product,index)=>{
            form.append("products",product)
            console.log(product)
        })
        dispatch(createPage(form))
        setcreatemodal(false)
        // console.log({title,desc,categoryid,type,banners,products})
    }

    const rendercreatepagemodal=()=>{
        return (
            <Modal show={createmodal} onHide={()=>setcreatemodal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>create new page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                        <Col>
                        <Input
                            type="select"
                            value={categoryid}
                            onChange={oncategorychange}
                            options={categories}
                            placeholder="select category"
                        />
                        {/* <select
                        className="form-control"
                        value={categoryid}
                        onChange={oncategorychange}
                        >
                        <option>select category</option>
                        
                        {
                            
                            categories.map(cat=>
                                <option key={cat.value} value={cat.value}>{cat.name}</option>
                            )
                        }
                        </select> */}
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                        <Input
                        value={title}
                        onChange={(e)=>settitle(e.target.value)}
                        placeholder="Page Title"
                        className="form-control"
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Input
                        value={desc}
                        onChange={(e)=>setdesc(e.target.value)}
                        placeholder="Page Description"
                        className="form-control"
                        />
                        </Col>
                    </Row>
                    {
                        banners.length>0?
                        banners.map((banner,index)=>
                        <Row key={index}>
                            <Col>
                                {banner.name}
                            </Col>
                        </Row>
                        ):null
                    }
                    <Row>
                        <Col>
                        <Input
                        type="file"
                        name="Banners"
                        className="form-control"
                        onChange={handlebannerimg}
                        />
                        </Col>
                    </Row>
                    {
                       products.length>0?
                       products.map((product,index)=>
                        <Row key={index}>
                            <Col>
                                {product.name}
                            </Col>
                        </Row>
                        ):null
                    }
                    <Row>
                    
                        <Col>
                        <Input
                        type="file"
                        name="products"
                        className="form-control"
                        onChange={handleproductimg}
                        />
                        </Col>
                    </Row>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-sm" style={{ backgroundColor: "#333" }} variant="primary" onClick={submitpageform}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
        )
    }
    return (
        <>
            <Layout sidebar />
            <Container style={{ marginLeft: "20%", paddingTop: "60px" }}>
            {
                page.loading?
                <>
                    <h6>Please wait...</h6>
                </>
                :
                <>
                {
                  rendercreatepagemodal()
              }  
              <button onClick={()=>setcreatemodal(true)}>Create Page</button>
                </>
            }
              

            </Container>
        </>
    )
}


export default Newpage
