import React, { useEffect, useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from '../../../actions/Authentication';
import LoadingSpinner from '../../../components/Spinner/Spinner';
const initialdata = { username: '', firstname: '', lastname: '', email: '', password: '', confirmpassword: '', picture: '' }

const GoogleSignupForm = () => {

    // declarations..........................................................................
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const actualform = useSelector((state) => state.FormData);

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

    // functions........................................................................................

    const handlesubmit = (e) => {
        e.preventDefault();
        setloading(true);
        console.log(formdata);
        if (!formdata.username || !formdata.firstname || !formdata.lastname || !formdata.email || !formdata.password || !formdata.confirmpassword) {
            ToastFunction("Please Fill all the Required fields.");
            setloading(false);

            return;
        }

        if (!isValidEmail(formdata.email)) {
            ToastFunction("Please Enter a Valid Email address");
            setloading(false);

            return;
        }

        if (!isValidPassword(formdata.password)) {
            ToastFunction("Password must contain atlease 8 characters , Including 1 Capital letter and 1 special character.");
            setloading(false);

            return;
        }

        if (formdata.password !== formdata.confirmpassword) {
            ToastFunction("Passwords do not match.");
            setloading(false);

            return;
        }
        dispatch(signup(formdata, navigate,ToastFunction)).then(() => {
            setloading(false);

        });

    };

    // Validation functions
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };



    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value, firstname: actualform.firstname, lastname: actualform.lastname, email: actualform.email, picture: actualform.picture });

    }


    return (
        <div className='h-screen  transition ease-in-out duration-1000 w-screen flex flex-col font-poppins   '>
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

            <div className='flex Small:w-[40%] w-full h-full justify-center items-center'>
                <div className='flex flex-col p-2 gap-2'>
                    <h3 className='flex justify-center text-[35px] m-5 font-poppins font-bold'>
                        <div className=' w-[30px] h-full'>
                            <LockOpenIcon className='scale-125' />
                        </div>
                        Create User
                    </h3>
                    <input name='username' onChange={handlechange} type="text" className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Username*' />
                    <input name='password' onChange={handlechange} type="password" className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Password*' />
                    <input name='confirmpassword' onChange={handlechange} type="password" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Confirm Password*' />
                    <button onClick={handlesubmit} className='w-full h-[60px] rounded-lg bg-blue-900 text-[24px] mt-2'>
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

                </div>
            </div>


        </div>
    )
}

export default GoogleSignupForm