import axios from 'axios'
import { api } from '../urlConfig'
import store from '../store'
import { authconstants } from '../actions/constant'

const token = window.localStorage.getItem('token')
const axiosintace = axios.create({
    baseURL: api,
    headers:{
        "Authorization": token?`Bearer ${token}`:''
    }
})
axiosintace.interceptors.request.use((req)=>{
    const {auth}=store.getState()
    if(auth.token){
        req.headers.Authorization=`Bearer ${auth.token}`
    }
 return req
})
axiosintace.interceptors.response.use((res)=>{
    return res
   },(error)=>{
       console.log(error.response)
       const {status}=error.response
       if(status===500){
           localStorage.clear()
            store.dispatch({type:authconstants.LOGOUT_SUCCESS})
       }
       return Promise.reject(error)
   })
export default axiosintace