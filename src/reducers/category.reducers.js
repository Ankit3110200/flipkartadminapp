import { catconstants } from "../actions/constant"

const intialstate={
    categories: [],
    loading: false,
    error: null
}
const buildnewcategories= (parentid,categories,category) =>{ 
    let mycategories=[]
    if(parentid==undefined){
        return[
            ...categories,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                type:category.type,
                childern:[]
            }
        ]
    }
    for(let cat of categories){
        if(cat._id==parentid){
            const newcategory={
                _id:category._id,
                    name:category.name,
                    slug:category.slug,
                    parentid:category.parentid,
                    type:category.type,
                    childern:[]
            }
            mycategories.push({
                ...cat,
                childern:cat.childern.length>0?[...cat.childern,newcategory]:[newcategory]

            })
        }else{
            mycategories.push({
                ...cat,
                childern:cat.childern?buildnewcategories(parentid,cat.childern,category):[]
        })
    }
    }
    return mycategories
}

export default (state=intialstate,action)=>{
    switch(action.type){
        case catconstants.GET_ALL_CATEGORY_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
        break;
        case catconstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
               loading:true
            }
        break;
        case catconstants.ADD_NEW_CATEGORY_SUCCESS:
            const category=action.payload.category
            console.log(category);
            const updatedcategories=buildnewcategories(category.parentid,state.categories,category)
            console.log(updatedcategories)
            state={
                ...state,
                categories:updatedcategories,
                loading:false
            }
        break;
        case catconstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...intialstate,
                loading:false,
                error:action.payload.error            
            }
        break;
        case catconstants.UPDATE_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true               
            }
        break;
        case catconstants.UPDATE_CATEGORY_SUCCESS:
            state={
                ...state,
                loading:false               
            }
        break;
        case catconstants.UPDATE_CATEGORY_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false               
            }
        break;
        case catconstants.DELETE_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true               
            }
        break;
        case catconstants.DELETE_CATEGORY_SUCCESS:
            state={
                ...state,
                loading:false               
            }
        break;
        case catconstants.DELETE_CATEGORY_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false               
            }
        break;
    }
    return state
}

