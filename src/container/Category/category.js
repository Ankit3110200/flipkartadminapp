import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckboxTree from 'react-checkbox-tree'
import { addcategory, getAllcategory, updatecategories,deletecategories as deletecategoryaction } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/input'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import './style.css'


function Category(props) {
    const [categoryname, setcategoryname] = useState('')
    const [parentcategoryid, setparentcategoryid] = useState('')
    const [categoryimage, setcategoryimage] = useState('')
    const [show, setShow] = useState(false)
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([])
    const [checkedarray, setCheckedarray] = useState([]);
    const [expandedarray, setExpandedarray] = useState([]);
    const [updatecategorymodal, setUpdatecategorymodal] = useState(false);
    const [deletecategorymodal, setdeletecategorymodal] = useState(false)
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
       if(!category.loading){
           setShow(false)
       }
    }, [category.loading])

    const handleClose = () => {
        const form = new FormData();
        if(categoryname===""){
            alert("Name is required")
            setShow(false)
        }
        form.append("name", categoryname)
        form.append("parentid", parentcategoryid)
        form.append("categoryimage", categoryimage)
        dispatch(addcategory(form))
        setcategoryname('');
        setparentcategoryid('');
        // console.log(cat)

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const rendercategories = (categories) => {
        const mycategories = [];
        for (const cat of categories) {
            mycategories.push(
                {
                    label: cat.name,
                    value: cat._id,
                    children: cat.childern.length > 0 && rendercategories(cat.childern)
                }
            )
        }
        return mycategories;
    }

    const createcategorylist = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                 name: category.name, 
                 parentid: category.parentid,
                 type:category.type
            })
            if (category.childern.length > 0) {
                createcategorylist(category.childern, options)
            }
        }
        return options
    }

    const handlecategoryimage = (e) => {
        setcategoryimage(e.target.files[0])
    }

    const updatecategory = () => {
        updateandexpandedcategory();
        setUpdatecategorymodal(true)
        
 
    }
    const updateandexpandedcategory=()=>{
        const categories = createcategorylist(category.categories)
        const checkedarray = []
        const expandedarray = []
        checked.length > 0 && checked.forEach((categoryid, index) => {
            const category = categories.find((category, _index) => categoryid == category.value)
            category && checkedarray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryid, index) => {
            const category = categories.find((category, _index) => categoryid == category.value)
            category && expandedarray.push(category)
        })
        setCheckedarray(checkedarray);
        setExpandedarray(expandedarray);
        console.log({ categories, checked, expanded, checkedarray, expandedarray })
    }
    const handlecategoryinput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedcheckedarray = checkedarray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedarray(updatedcheckedarray)
        } else if (type == "expanded") {
            const updatedexpandedarray = expandedarray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedarray(updatedexpandedarray)
        }
    }

    const updatecategoriesform = () => {
        const form = new FormData()
        expandedarray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentid', item.parentid ? item.parentid : "")
            form.append('type', item.type)
        })
        checkedarray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentid', item.parentid ? item.parentid : "")
            form.append('type', item.type)
        })
        dispatch(updatecategories(form))

        setUpdatecategorymodal(false)
    }
    const renderupdatecategoriesmodal = () => {
        return (

            <Modal size="lg" show={updatecategorymodal} onHide={()=>setUpdatecategorymodal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title >Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            expanded
                        </Col>
                    </Row>
                    {
                        expandedarray.length > 0 &&
                        expandedarray.map((item, index) =>
                            <Row>
                                <Col>
                                    <Input value={item.name}

                                        placeholder={'category name'}

                                        onChange={(e) => handlecategoryinput('name', e.target.value, index, 'expanded')}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control"
                                        value={item.parentid}
                                        onChange={(e) => handlecategoryinput('parentid', e.target.value, index, 'expanded')}>
                                        <option>
                                            select Category
                            </option>

                                        {createcategorylist(category.categories).map(opt =>
                                            <option key={opt.value} value={opt.value}>{opt.name}</option>)}

                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control" 
                                    value={item.type}
                                    onChange={(e) => handlecategoryinput('type', e.target.value, index, 'expanded')}
                                    >
                                        <option value=''>Select Type</option>
                                        <option value='store'>Store</option>
                                        <option value='product'>Product</option>
                                        <option value='page'>Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                    <h6>chechked categories</h6>
                    {
                        checkedarray.length > 0 &&
                        checkedarray.map((item, index) =>
                            <Row>
                                <Col>
                                    <Input value={item.name}

                                        placeholder={'category name'}

                                        onChange={(e) => handlecategoryinput('name', e.target.value, index, 'checked')}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control"
                                        value={item.parentid}
                                        onChange={(e) => handlecategoryinput('parentid', e.target.value, index, 'checked')}>
                                        <option>
                                            select Category
                            </option>

                                        {createcategorylist(category.categories).map(opt =>
                                            <option key={opt.value} value={opt.value}>{opt.name}</option>)}

                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control" 
                                     value={item.type}
                                    onChange={(e) => handlecategoryinput('type', e.target.value, index, 'checked')}
                                    >
                                        <option value=''>Select Type</option>
                                        <option value='store'>Store</option>
                                        <option value='product'>Product</option>
                                        <option value='page'>Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }



                    <input type="file" name="categoryimage" onChange={handlecategoryimage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={updatecategoriesform}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>

        )
    }
    const renderaddcategorymodal = () => {
        return (
            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={categoryname}
                        placeholder={'category name'}
                        onChange={(e) => { setcategoryname(e.target.value) }}
                    />
                    <select className="form-control"
                        value={parentcategoryid}
                        onChange={(e) => setparentcategoryid(e.target.value)}>
                        <option>
                            select Category
                            </option>

                        {createcategorylist(category.categories).map(opt =>
                            <option key={opt.value} value={opt.value}>{opt.name}</option>)}

                    </select>
                    <input type="file" name="categoryimage" onChange={handlecategoryimage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-sm"  style={{backgroundColor:"#333"}} variant="primary" onClick={handleClose}>
                        Save
          </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    const deletecategory=()=>{
        updateandexpandedcategory();
        setdeletecategorymodal(true)
    }
    const deletecategories=()=>{
        const chehckedidarray=checkedarray.map((item,index)=>({_id:item.value}))
        const expandedidarray=expandedarray.map((item,index)=>({_id:item.value}))
        const idsarray=expandedidarray.concat(chehckedidarray)
        if(chehckedidarray.length>0){
            dispatch(deletecategoryaction(chehckedidarray))
            .then(result=>{
                if(result){
                    dispatch(getAllcategory())
                    setdeletecategorymodal(false)
                }
            })
        }
        setdeletecategorymodal(false)
        
    }
    const renderdeletecategorymodal = () => {
        console.log("delete",checkedarray)
        return (
            <Modal show={deletecategorymodal} onHide={()=>setdeletecategorymodal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                   <h5>Expanded</h5>
                {
                    expandedarray.map((item,index)=><span key={index}>{item.name}</span>)
                }
                <h5>Checked</h5>
                {
                    checkedarray.map((item,index)=><span key={index}>{item.name}</span>)
                }

                </Modal.Body>
                <Modal.Footer>
                    
                    <Button label='No' variant="primary" onClick={()=>alert('No')}>
                        No
                    </Button>
                    <Button label='Yes' variant="danger" onClick={deletecategories}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <>
            <Layout sidebar />
            <Container style={{ marginLeft: "20%", paddingTop: "60px" }}>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Category</h3>
                            <div className="actionbtns">
                            <span>Actions:</span>
                            <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
                            <button onClick={deletecategory}><IoIosTrash/><span>Delete</span></button>
                        <button onClick={updatecategory}><IoIosCloudUpload/><span>Edit</span></button>
                        </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            <CheckboxTree
                                nodes={rendercategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />
                                }}
                            />
                        </ul>
                    </Col>
                </Row>
                
                {
                    renderaddcategorymodal()
                }
                {
                    renderupdatecategoriesmodal()
                }
                {
                    renderdeletecategorymodal()
                }
            </Container>

        </>
    )
}


export default Category
