import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Modal, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/input'
import { addproduct,deleteProductById } from '../../actions'
import './style.css'
import {generatepublicimgUrl} from '../../urlConfig' 

function Products(props) {
    const [name, setname] = useState("")
    const [quantity, setquantity] = useState("")
    const [price, setprice] = useState("")
    const [categoryid, setcategoryid] = useState("")
    const [description, setdescription] = useState("")
    const [productpicture, setproductpicture] = useState([])
    const [show, setShow] = useState(false)
    const [productdetail,setproductdetail]=useState(null)
    const [productdetailmodal,setproductdetailmodal]=useState(false)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)

    const handleClose = () => {
        const form = new FormData();


        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryid);
        for (let pic of productpicture) {
            form.append("productpicture", pic)
        }
        // console.log(form.FormData)
        dispatch(addproduct(form))
        const product={
            name,
            quantity,
            price,
            description,
            categoryid   
        }
        console.log(product);

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleproductpicture = (e) => {

        setproductpicture([
            ...productpicture,
            e.target.files[0]
        ])
    }
    const createcategorylist=(categories,options=[])=>{
        for(let category of categories){
            options.push ({
                value:category._id,name:category.name
            })
            if(category.childern.length>0){
                createcategorylist(category.childern,options)
            }
        }
        return options
    }

    const rendertable = () => {
        return (
            <Table style={{fontSize:"12"}} responsive="sm">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product,index) =>
                                <tr key={product._id} onClick={()=>showproductdetailmodal(product)}  >
                                    <td>{index+1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                    <button onClick={() => showproductdetailmodal(product)}>
                      info
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                                </tr>
                                ):null
    }

                </tbody>
            </Table>
        )
    }
    const rederproduct=()=>{
        return(
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            lable="name"
                            value={name}
                            placeholder={"product name"}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <Input
                            lable="Quantity"
                            value={quantity}
                            placeholder={"Quantity of Product"}
                            onChange={(e) => setquantity(e.target.value)}
                        />
                        <Input
                            lable="Description"
                            value={description}
                            placeholder={"Description of Product"}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <Input
                            lable="price"
                            value={price}
                            placeholder={"price of Product"}
                            onChange={(e) => setprice(e.target.value)}
                        />
                        {
                            productpicture.length > 0 ?
                                productpicture.map((pic, index) => <div key={index}>{JSON.stringify(pic.name)}</div>) : null
                        }
                        <input
                            type="file"
                            name="productpicture"
                            onChange={handleproductpicture}
                        />
                        <select className="form-control"
                            value={categoryid}
                            onChange={(e) => setcategoryid(e.target.value)}>
                            <option>
                                select Category
                            </option>

                            {createcategorylist(category.categories).map(opt =>
                                <option key={opt.value} value={opt.value}>{opt.name}</option>)}

                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>
        )
    }
    const handlecloseproductdetailmodal=()=>{
        setproductdetailmodal(false)
    }
    const showproductdetailmodal=(product)=>{
        setproductdetail(product)
        setproductdetailmodal(true)
        // console.log(product)
        
    }
    const renderproductdetailmodal=()=>{
        if(!productdetail){
            return null
        }
        return(
            <Modal size="lg" show={productdetailmodal} onHide={handlecloseproductdetailmodal}>
                    <Modal.Header closeButton>
                        <Modal.Title>product detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <lable className="key">Name</lable>
                            <p className="value">{productdetail.name}</p>
                        </Col>
                        
                        <Col md={6}>
                            <lable className="key">Price</lable>
                            <p className="value">{productdetail.price}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <lable className="key">Quantity</lable>
                            <p className="value">{productdetail.quantity}</p>
                        </Col>
                        
                        <Col md={6}>
                            <lable className="key">Category</lable>
                            <p className="value">{productdetail.category.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <lable className="key">Description</lable>
                            <p className="value">{productdetail.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <label className="key">Productpicture</label>
                        <div>
                            {productdetail.productpicture.map(picture=>
                            <div className="productimg">
                                <img src={generatepublicimgUrl(picture.img)}/>
                            </div>)}
                        </div>
                        </Col>
                    </Row>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handlecloseproductdetailmodal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
        )
    }
    return (
        <>
            <Layout sidebar /> 
            <Container style={{ marginLeft: "20%", paddingTop: "60px" }}>
            {/* producz.... */}
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {rendertable()}
                    </Col>
                </Row>
                {
                    rederproduct()
                }  
                {
                    renderproductdetailmodal()
                }              
            </Container>
        </>
    )
}

export default Products
