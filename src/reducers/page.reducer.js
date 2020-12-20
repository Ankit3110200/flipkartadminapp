import { pageconstants } from "../actions/constant"

const intialdata={
    error:null,
    loading:false,
    page:[]
}

export default(state=intialdata,action)=>{
    switch(action.type){
        case pageconstants.CREATE_PAGE_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case pageconstants.CREATE_PAGE_SUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case pageconstants.CREATE_PAGE_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
    }
    return state
}