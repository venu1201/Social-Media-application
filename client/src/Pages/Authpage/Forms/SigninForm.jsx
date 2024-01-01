import React, { useEffect, useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Google, Login } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginSocialGoogle } from "reactjs-social-login";
import { google_authentication, signin } from '../../../actions/Authentication';
import LoadingSpinner from '../../../components/Spinner/Spinner';
const initialdata = { username: '', firstname: '', lastname: '', email: '', password: '', confirmpassword: '', picture: '' }
const SigninForm = () => {

    // declarations..........................................................................
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // states...................................................................................
    const [formdata, setformdata] = useState(initialdata);
    const [loading, setloading] = useState(false);    
    const ToastFunction=(message)=>{
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "colored",
        });
    }
    // functions........................................................................................
    const handlesubmit = (e) => {
        e.preventDefault();
        setloading(true);

        if (!formdata.username || !formdata.password) {
            ToastFunction("Please Enter username and password.");
            // setError({ message: 'Please enter username and password.' });
            setloading(false);
            return;
        }
        // console.log("formdataaaaaaaaaaa",formdata)
    
        dispatch(signin(formdata, navigate,ToastFunction)).then(() => {
            setloading(false);
        });

    };
    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const forgotpassword = (e) => {
        e.preventDefault();
    }
 
    return (
        <div className='h-screen transition ease-in-out duration-1000 w-screen flex flex-col font-poppins  items-center '>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className='flex w-full  justify-between h-full  '>
                <div className='flex justify-center items-center Small:w-[40%] w-full'>
                    <div className='  px-5 pb-5 shadow-sm    w-[500px]'>

                        <h3 className='flex text-white justify-center text-[35px] m-2 mt-5 font-poppins font-bold'>
                            <div className=' w-[30px] h-full'>
                                <LockOpenIcon className='scale-125' />
                            </div>
                            <div className='font-poppins'>
                                Sign In
                            </div>
                        </h3>

                        <div className=''>
                            <form className='transition-all  duration-300 ease-in-out'>
                                <div className='flex  flex-col p-2 gap-2'>

                                    <input value={formdata.username} name='username' onChange={handlechange} type="text" className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Username*' />
                                    <input value={formdata.password} name='password' onChange={handlechange} type="password" className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Password*' />

                                </div>
                            </form>
                            <div className='mt-1  text-green-500 pr-3 w-full flex justify-end'>
                                <button onClick={() => forgotpassword()} className='hover:scale-105'>Forgot Password</button>
                            </div>
                        </div>

                        <div className='p-2 flex flex-col'>
                            <button onClick={handlesubmit} className='w-full h-[60px] bg-blue-900 text-[24px] mt-2'>
                                {loading === true ? (
                                    <div className='flex justify-center'>
                                        <LoadingSpinner />
                                    </div>
                                ) : (
                                    <div>
                                        Sign In
                                    </div>
                                )}


                            </button>
                            <LoginSocialGoogle
                                client_id={"615136400415-4s3dtmu7pj9ppi40gccmh6e555eaf7ce.apps.googleusercontent.com"}
                                scope="openid profile email"
                                discoveryDocs="claims_supported"
                                access_type="offline"
                                onResolve={async ({ data }) => {
                                    const { email } = await data;
                                    const { given_name, family_name, picture } = data;
                                    formdata.email = email;
                                    formdata.firstname = given_name;
                                    formdata.lastname = family_name;
                                    formdata.picture = picture;                                  
                                    dispatch(google_authentication(formdata, navigate))

                                }}
                                onReject={(err) => {
                                    console.log(err);
                                }}
                            >
                                <button

                                    className="w-full h-[60px] bg-red-500 text-[24px] mt-2 flex items-center justify-center"
                                // style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Google style={{ marginRight: '8px' }} /> Sign In with Google
                                </button>
                            </LoginSocialGoogle>
                        </div>
                        <div className='flex justify-end p-2 '>
                            <button className='bg-none outline-none border-none'>

                                <div onClick={() => navigate('/Auth/Signup')} className='flex gap-1'>
                                    <p className='text-dimWhite'>Dont have an account ?</p>
                                    <p>Sign Up</p>
                                </div>


                            </button>
                        </div>
                    </div>
                </div>


            </div>



        </div>
    )
}

export default SigninForm