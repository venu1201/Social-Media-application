// In your Redux actions file (authActions.js)
import { client,urlFor } from '../Client.js';
import * as api from '../api/index.js';
import { auth_success,setForm, fetch_users, google_signup, google_verify, profile_data, signin_error, signup_error, user_details } from '../reducers/index.js';

export const signin = (formdata, navigate,ToastFunction) => async (dispatch) => {

  try {
    const { data } = await api.signin(formdata);
    dispatch(auth_success(data));
    navigate('/');
  } catch (error) {
    ToastFunction(error.response.data.message);
    }
};
export const google_authentication = (formdata, navigate,ToastFunction) => async (dispatch) => {
  try {

    const { data } = await api.google_auth(formdata);
    if(data.result)
    {
        dispatch(auth_success(data));
        navigate('/');
    }
    else
    {
        dispatch(setForm(formdata));
        navigate('/Auth/google_auth');
    }
  } catch (error) {
    ToastFunction(error.response.data.message);
  }
}
export const signup = (formdata, navigate,ToastFunction) => async (dispatch) => {
  try {
    const { data } = await api.signup(formdata);
    console.log(data);
    dispatch(auth_success(data));
    navigate('/')
  } catch (error) {
    ToastFunction(error.response.data.message);
  }
};







