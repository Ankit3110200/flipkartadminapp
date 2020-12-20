import React, { useEffect } from "react"

import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Signin from "./container/Signin/Signin";
import Signup from "./container/Signup/Signup";
import Home from "./container/Home";
import PrivateRoute from "./HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isuserlogin,getintialData, getAllcategory } from "./actions";
import Products from "./container/Products/products";
import Orders from "./container/Orders/orders";
import Category from "./container/Category/category";
import Newpage from "./container/NewPage/NewPage";


function App() {
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth)

 useEffect(()=>{
    if(!auth.authenticate) { dispatch(isuserlogin())}
    if(auth.authenticate){
      dispatch(getintialData())
    }
    
  },[auth.authenticate])  
  return (
    <>
    <div className="App">
    
       <Switch>
         <PrivateRoute path="/" exact component={Home} />
         <PrivateRoute path="/page" exact component={Newpage} />
         <PrivateRoute path="/products" exact component={Products} />
         <PrivateRoute path="/orders" exact component={Orders} />
         <PrivateRoute path="/category" exact component={Category} />
         <Route path="/signin" component={Signin}/>
         <Route path="/signup" component={Signup}/>
       </Switch>
     
    </div>
    </>
  );
}

export default App;
