import { productconstants } from "../actions/constant";
const intialstate={
    products:[]
}

export default (state=intialstate,action)=>{
    switch(action.type){
        case productconstants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products
            }
        break;
    }
    return state
}