import axiosintace from "../helper/axios"
import { userconstants } from "./constant"


  
  export const signup = (user)=>{
    console.log(user)
  
    return async (dispatch) =>{
        dispatch({type:userconstants.USER_REGISTER_REQUEST});
        const res= await axiosintace.post('/admin/signup',{
          ...user
        })
        if(res.status===200){
          const{message}=res.data;
    
          dispatch({
            type:userconstants.USER_REGISTER_SUCCESS,
            payload:{
              message
            }
          })
  
        }else{
          dispatch({
            type:userconstants.USER_REGISTER_FAILURE,
            payload:{error:res.data.error}
          })
        }
    }
  }