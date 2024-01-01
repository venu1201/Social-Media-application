// In your Redux actions file (authActions.js)
import { client,urlFor } from '../Client.js';
import * as api from '../api/index.js';
import { auth_success, fetch_users, google_signup, google_verify, profile_data, signin_error, signup_error, user_details } from '../reducers/index.js';

export const getuserbyid = (username,setpeopledata,bool)=>async(dispatch)=>{
  try {
   

    const {data}=await api.getuserbyid(username);
    if(data)
    setpeopledata(data?.result);
    if(bool)
    {
      dispatch(profile_data(data?.result));
    }
  } catch (error) {
    console.log(error);
  }
}
export const getselfdata = (username)=>async(dispatch)=>{
  try {
    const {data}=await api.getselfdata(username);
    console.log(data);
    dispatch(auth_success(data));
  } catch (error) {
    console.log(error);
  }
}


export const signin = (formdata, navigate) => async (dispatch) => {

  try {
   
    const { data } = await api.signin(formdata);

    // dispatch({ type: 'AUTH_SUCCESS', data });
    console.log("the data",data);
    dispatch(auth_success(data));
    navigate('/');
  } catch (error) {
    // dispatch({ type: 'SIGNIN_ERROR', payload: errorMessage });
    console.log("heloooooooooooooooooo",error);
    }
};
export const googlesignup = (formdata, navigate) => async (dispatch) => {
  try {

    const { data } = await api.signup(formdata);
    const doc = {
      _id: data?.result?.username,
      _type: 'user',
      username: data?.result?.username,
      //  Image:'hmmm'

    }
    client.createIfNotExists(doc).then(() => {
      console.log('added');
    });
    dispatch(auth_success(data));
    // dispatch({ type: 'GOOGLE_SIGNUP', data });
    localStorage.setItem('profile', JSON.stringify(data));

    navigate('/');
  } catch (error) {
    const errorMessage = error.response;
    dispatch(signup_error(errorMessage));
    // dispatch({ type: 'SIGNUP_ERROR', payload: errorMessage });
  }
}
export const signup = (formdata, setisSignin, isSignin) => async (dispatch) => {
  try {
    const { data } = await api.signup(formdata);
    console.log(data);
    const doc = {
      _id: data?.result?.username,
      _type: 'user',
      username: data?.result?.username,
    }
    client.createIfNotExists(doc).then(() => {
      console.log('added');
    })
    console.log("hmmmmmmm",data)
    dispatch(auth_success(data));
    // dispatch({ type: 'AUTH_SUCCESS', data });
    setisSignin(!isSignin)
  } catch (error) {
    console.log(error);
  }
};
export const getgoogleuser = (email) => async (dispatch) => {
  try {
    const { data } = await api.getgoogleuser(email);
    dispatch(google_verify(data));
    // dispatch({ type: 'GOOGLE_VERIFY', data });

  } catch (error) {
    console.log(error)
  }
}
export const getuserdetails = (setuserdetails, username,type) => async (dispatch) => {
  try {

    const { data } = await api.getuserdetails(username);
    if(type)
    {
      console.log(data?.result?.followers);
      if(type==='followers')
      setuserdetails(data?.result?.followers);
      if(type==='following')
      setuserdetails(data?.result?.following);
    }
    else
      setuserdetails(data?.result);
    dispatch(user_details(data));
  } catch (error) {
    console.log(error)
  }
}
export const getallpendingusers = (setuserdetails, pending) => async (dispatch) => {

  try {

    const { data } = await api.getallpendingusers(pending);
    setuserdetails(data?.result);

  } catch (error) {
    console.log(error)
  }
}
export const acceptanddeleteuser = (obj, username) => async (dispatch) => {
  try {
    const { data } = await api.acceptanddeleteuser(obj, username);
    console.log(data);
    dispatch(auth_success(data));
  } catch (error) {

  }
}

export const updateuserdetails = (editdata, username) => async (dispatch) => {
  try {  
    console.log("hmmmmmmmmmmm",username)
    if(editdata.selectedfile)
    {
      const doc = {
        _type: 'user',
        _id:'64c63453d31f1a67685cee5b',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: editdata?.selectedfile?._id,
          },
        },
      };
      const updatedDoc = await client.patch(doc._id).set(doc).commit();
      console.log(updatedDoc.image)
      console.log(
        "hmm",urlFor(updatedDoc.image).url())
        const { data } = await api.updateuserdetails({...editdata,selectedfile:urlFor(updatedDoc.image).url()}, username);
        dispatch(profile_data(data.result[0]));
        dispatch(auth_success({result:data.result[0]}));


    }
    else
    {
        const { data } = await api.updateuserdetails(editdata, username);
        console.log({result:data.result[0]});
        dispatch(profile_data(data.result[0]));
        dispatch(auth_success({result:data.result[0]}));
    }
  } catch (error) {
    console.log(error)
  }
};


// export const fetchtopheadlines = (category) => async (dispatch) => {
//   try {
//       if(category)
//       {
//           const { data } = await api.fetchTopHeadlines(category);
//           console.log(data)
//       }
//       else
//       {
//           const { data } = await api.fetchTopHeadlines();
//           console.log(data);

//       }
//   //   setisSignin(!isSignin)
//   } catch (error) {
//     const errorMessage = error;
//     console.log(errorMessage);
//   }
// };


