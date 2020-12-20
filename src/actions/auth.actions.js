import axiosintace from "../helper/axios"
import { authconstants } from "./constant"

export const login = (user)=>{
    console.log(user)

    return async (dispatch) =>{
        dispatch({type:authconstants.LOGIN_REQUEST});
        const res= await axiosintace.post('/admin/signin',{
          ...user
        })
        if(res.status===200){
          const{token,user}=res.data;
          localStorage.setItem('token',token);
          localStorage.setItem('user',JSON.stringify(user));
          dispatch({
            type:authconstants.LOGIN_SUCCESS,
            payload:{
              token,user
            }
          })

        }else{
          dispatch({
            type:authconstants.LOGIN_FAILURE,
            payload:{error:res.data.error}
          })
        }
    }
}
export const isuserlogin=()=>{
  return async dispatch=>{
    const token=localStorage.getItem('token')
    if(token){  
      const user=localStorage.getItem('user')
        dispatch({
          type:authconstants.LOGIN_SUCCESS,
            payload:{
              token,user
            }
        })
    }else{
        dispatch({
          type:authconstants.LOGIN_FAILURE,
            payload:{error:'Failed to log in'}
        })
    }
  }
}

export const signout=()=>{
  return async dispatch=>{
    dispatch({type:authconstants.LOGOUT_REQUEST})
    const res=await axiosintace.post('/admin/signout')
    if(res.status===200){
      localStorage.clear();
      dispatch({
        type:authconstants.LOGOUT_SUCCESS
      })
    }else{
      dispatch({
        type:authconstants.LOGOUT_FAILURE,
        payload:{error:res.data.error}
      })
    }
   
  }
}
