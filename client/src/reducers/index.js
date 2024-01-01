// import { combineReducers } from 'redux';
// import authReducer from './auth.js'
// import Posts from './Posts.js';
// export const reducers = combineReducers({authReducer,Posts });

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  authData: null,
  FormData:null,
  users: [],
  googleuser: { check: 0 },
  userdetails:null,
  box:false,
  posts: [],
  profileData:null,
  mode: "light",
  user: null,
  token: null,
  posts: [],
  tags:[],
  tagquery:'',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    profile_data:(state,action)=>{
        console.log("hmmmm",action.payload)
        state.profileData=action.payload.result;
    },
    setForm :(state,action)=>{
        state.FormData=action.payload;
    },
    remove_profile_data:(state)=>{
        state.profile_data=null;
    },
    signin_error:(state,action)=>{
        state.error=action.payload;
    },
    signup_error:(state,action)=>{
        state.error=action.payload;
    },
    user_details:(state,action)=>{
        state.userdetails=action.data.result;
    },
    clear_google:(state)=>{
        localStorage.removeItem('profile');
          state.googleuser.check=0;
          state.error=null;
          state.authData=null;
          state.token=null;
    },
    reset_state:(state)=>{
        console.log('hmm')
        state.googleuser.check=0;
        // delete state.googleuser.authData;
        
    },
    google_verify:(state,action)=>{
        state.googleuser.check= action?.payload.check;
        console.log(action.payload)
        if(state.googleuser.check==1)
        {
            // const res={result:action?.payload.result,token:action?.payload.token};
            localStorage.setItem('profile', JSON.stringify(action?.payload.result));

            state.authData=action.payload.result;     
        }
        else
        {
            state.googleuser.check=2;

        }
        // state.googleuser=action?.payload.check;
    },
    cleartagquery:(state,action)=>{
        state.tagquery='';
    },
    settagquery:(state,action)=>{
        state.tagquery=action.payload;
    },
    settags:(state,action)=>{
        state.tags=action.payload;
    },
    box:(state,action)=>{
        state.box=action?.data;
    },
    google_signup:(state,action)=>{
        console.log(action)
        state.googleuser.check=0;
        state.error= null;
        state.authData= action?.data;
    },
    update_authData:(state,action)=>{
        state.authData=action?.payload.result;
    },
    auth_success:(state,action)=>{
        state.FormData=null;
        localStorage.setItem('profile', JSON.stringify(action?.payload.result));
        state.token=action.payload.token;
        state.error= null;
        state.authData= action?.payload.result;
    },
    fetch_users:(state,action)=>{
        state.users= action.payload.result1;
    },
    all_posts:(state,action)=>{
        state.posts= [action.data];
    },
  },
});

export const {settagquery,cleartagquery,settags, signin_error,update_authData,setForm,profile_data,remove_profile_data,reset_state,signup_error,user_details,all_posts,fetch_users,auth_success,google_signup,google_verify,box,clear_google } =
  authSlice.actions;
export default authSlice.reducer;