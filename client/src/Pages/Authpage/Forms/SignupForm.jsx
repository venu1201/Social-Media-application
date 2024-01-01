import React, { useEffect, useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Google, Login } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginSocialGoogle } from "reactjs-social-login";
import LoadingSpinner from '../../../components/Spinner/Spinner';
import { google_authentication, signup } from '../../../actions/Authentication';
const initialdata = { username: '', firstname: '', lastname: '', email: '', password: '', confirmpassword: '', picture: '' }
const SignupForm = () => {

    // declarations..........................................................................
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // states...................................................................................
    const [formdata, setformdata] = useState(initialdata);
    const [loading, setloading] = useState(false);

    // useeffects.............................................................................
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


    const handlesubmit = (e) => {
        e.preventDefault();
        setloading(true);

        if (!formdata.username || !formdata.firstname || !formdata.lastname || !formdata.email || !formdata.password || !formdata.confirmpassword) {
            ToastFunction("Please fill all the Required fields.");
            setloading(false);

            return;
        }

        if (!isValidEmail(formdata.email)) {
            ToastFunction("Please Enter a Valid Email address");
            setloading(false);

            return;
        }

        if (!isValidPassword(formdata.password)) {
            ToastFunction("Password must contain atlease 8 characters , Including 1 Capital letter and 1 Special character");
            setloading(false);

            return;
        }

        if (formdata.password !== formdata.confirmpassword) {
            ToastFunction("Passwords do not match...")
            setloading(false);
            return;
        }
        dispatch(signup(formdata,navigate,ToastFunction)).then(() => {
            setloading(false);
        });

    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };


    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
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
                                Sign Up
                            </div>
                        </h3>

                        <form className='duration-300 ease-in-out'>
                            <div className='flex flex-col p-2 gap-2'>
                                <input name='username' onChange={handlechange} type="text" className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Username*' />

                                <div className='flex gap-2 flex-1'>
                                    <input name='firstname' onChange={handlechange} type="text" required={true} className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='First Name*' />
                                    <input name='lastname' onChange={handlechange} type="text" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Last Name*' />
                                </div>
                                <div>

                                    <input name='email' onChange={handlechange} type="email" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Email*' />

                                </div>
                                <div className='flex flex-col gap-2'>
                                    <input name='password' onChange={handlechange} type="password" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Password*' />
                                    <input name='confirmpassword' onChange={handlechange} type="password" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Confirm Password*' />

                                </div>

                            </div>
                        </form>

                        <div className='p-2 flex flex-col'>
                            <button onClick={handlesubmit} className='w-full h-[60px] bg-blue-900 text-[24px] mt-2'>
                                {loading === true ? (
                                    <div className='flex justify-center'>
                                        <LoadingSpinner />
                                    </div>
                                ) : (
                                    <div>
                                        Sign Up
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
                                    <Google style={{ marginRight: '8px' }} /> Sign Up with Google
                                </button>
                            </LoginSocialGoogle>
                        </div>
                        <div className='flex justify-end p-2 '>
                            <button onClick={() => navigate('/Auth/Signin')} className='bg-none outline-none border-none' >
                                <div className='flex gap-1'>
                                    <p className='text-dimWhite'>Already have an account ?</p>
                                    <p>Sign In</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>


            </div>



        </div>
    )
}

export default SignupForm