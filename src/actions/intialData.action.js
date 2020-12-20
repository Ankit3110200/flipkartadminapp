import { catconstants, intialDataconstants,orderConstants,productconstants } from "./constant"
import axios from "../helper/axios"
export const getintialData=()=>{
    return async dispatch=>{
        const res=await axios.post('./intialdata')
        if(res.status===200){
            const {categories,products,orders}=res.data
            dispatch({
                type: catconstants.GET_ALL_CATEGORY_SUCCESS,
                payload:{categories}
            })
            dispatch({
                type: productconstants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products}
            })
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload:{orders}
            })
        }
        console.log(res.data)
    }
}