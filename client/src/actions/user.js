import * as api from '../api/index.js';
import { box, profile_data, update_authData } from '../reducers/index.js';
import { getuserbyid } from './Auth.js';

export const updateUser=(formdata,setformdata,setloading,tf)=>async(dispatch)=>{
  try {
    const {data}=await api.updateUser(formdata);
    setformdata(data.result);
    dispatch(update_authData(data));
    setloading(false);
    tf("Update Success")
  } catch (error) {
    setloading(false);
    console.log(error);

  }
}











export const requesting = (username,user) => async (dispatch) => {
    try {
      const { data } = await api.requesting(username,user);
      console.log(data);
        // const {result}=data;
        // const {pending}=result;

        // for(let i=0;i<pending.length;i++)
        // {
        //     if(pending[i]===user.username)
        //     {
        //         dispatch({type:'BOX',data:true})
        //     }
        // }    
    //   setisSignin(!isSignin)
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
    }
  };
  export const remove=(type,username,touser,setuserdetails)=>async(dispatch)=>{
    try {
      const {data}=await api.remove(type,username,touser);
      // setuserdetails(data.user);
      dispatch(profile_data(data.user));
    } catch (error) {
      console.log(error);
    }
  }
  export const removeascompletefriend=(username,touser)=>async(dispatch)=>{
    try {
      const {data}=await api.removeascompletefriend(username,touser);
    } catch (error) {
      console.log(error);
    }
  }
  export const removeasfollower=(username,touser)=>async(dispatch)=>{
    try {
      const {data}=await api.removeasfollower(username,touser);
    } catch (error) {
      console.log(error);
    }
  }
  export const removeasfollowing=(username,touser)=>async(dispatch)=>{
    try {
      const {data}=await api.removeascompletefriend(username,touser);
    } catch (error) {
      console.log(error);
    }
  }