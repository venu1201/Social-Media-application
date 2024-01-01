import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addNetwork, getNetwork, getuserbyId, removeNetwork } from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { update_authData } from '../../../reducers';
import Networkbox from '../Components/Networkbox';

const Network = () => {
    const navigate = useNavigate();
//   const username = JSON.parse(localStorage.getItem('profile')).username;
//   console.log(username);
    const username = useSelector((state) => state.authData.username);
    // const state=useSelector((state)=>state);
    // console.log(state);
    const params = useParams();
    const [data, setdata] = useState(null);
    // const [loading, setloading] = useState(false);
    const [value, setvalue] = useState("following");
    const [user,setuser]=useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getNetwork(params);
                // console.log(user.username);
                const res=await getuserbyId(username);
                setuser(res.data.result);
                setdata(response.data.result);
            } catch (error) {
                console.log(error)
            } finally {
                // setloading(false);
            }
        };

        fetchUser();
    }, []);
    const func1 = async(username)=>{
        const p = { user: params.user, type: params.type, touser: username };
        // setloading(true);
        try {
            await removeNetwork(p);
            if (params.type === "Followers") {
                const res = await getNetwork(params);
                setdata(res.data.result);
            }
            else {
                const res = await getNetwork(params);
                setdata(res.data.result);
            }
            if (params.type === "Followers") {
                ToastFunction(`${p.touser} has been Removed`);
            }
            else {
                ToastFunction(`${p.touser} has been unFollowed`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setloading(false);
        }
    }
    const dispatch=useDispatch();
    
    const func2=async(username)=>{
        const p = { user: user.username, touser: username };
        // setloading(true);
        try {
            const {data}=await addNetwork(p);
            
            dispatch(update_authData(data));
            setuser(data.result);
        } catch (error) {
            console.log(error);
        } finally {
            // setloading(false);
        }
    }
    const handlebutton = async (username,setloading) => {
        setloading(true);
        if(user.username===params.user)
        {
            await func1(username);
            setloading(false);
        }
        else
        {
            await func2(username);
            setloading(false);

        }
    }
    const ToastFunction = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "colored",
        });
    }
    return (
        <div className='h-full overflow-scroll font-poppins w-full flex justify-center items-center'>
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
            {data === null ? (
                <div className='w-[90%] flex flex-col gap-10 pt-[40px] h-full '>
                    <h3 className='text-[40px] flex gap-3'>
                        <button className='text-[40px]  cursor-pointer'>{"<"}</button>
                        <span>{params.type}</span>
                    </h3>
                    <div className=' gap-[5px] mt-3 w-full '>
                        <div className=' w-full flex flex-wrap gap-2'>
                            {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                <div key={item} className='w-[269px] h-[290px] pt-4 flex flex-col gap-3   bg-blue-900 animate-pulse'>

                                </div>
                            ))}


                        </div>

                    </div>
                </div>
            ) : (
                <div className='w-[95%] flex flex-col gap-10 pt-[40px] h-full '>
                    <h3 className='text-[40px] flex gap-3'>
                        <button onClick={() => navigate(`/Profile/${params.user}`)} className='text-[40px]'>{"<"}</button>
                        <span>{params.type}</span>
                    </h3>
                    <div className=' gap-[5px] mt-3 w-full '>
                        <div className=' w-full justify-center flex flex-wrap gap-2'>
                            {data.length === 0 && (
                                <div className='w-full'>
                                    {params.type === "Followers" ? (
                                        <h3 className='flex text-green-500 w-full text-[24px] justify-center items-center'>
                                            Your Follower count is currently zero. Be the first to connect!

                                        </h3>
                                    ) : (
                                        <h3 className='flex text-green-500 w-full text-[24px] justify-center items-center'>
                                            You're currently not Following anyone. Start building your network!

                                        </h3>
                                    )}
                                </div>
                            )}

                            {data.map((item, index) => (
                                <Networkbox key={index} value={value} item={item} user={user} handlebutton={handlebutton} params={params}  />
                                // <div key={item} className='w-[269px] rounded-lg h-[290px] pt-4 flex flex-col gap-3   bg-slate-950'>

                                //     <div onClick={() => navigate(`/Profile/${item.username}`)} className='flex justify-center'>
                                //         <img src={item.profilepicture || avatar} className='w-[140px] h-[140px] rounded-full' alt="" />
                                //     </div>
                                //     <div onClick={() => navigate(`/Profile/${item.username}`)} className='flex justify-center'>
                                //         <span className='text-[30px]'>
                                //             {"@" + item.username}
                                //         </span>
                                //     </div>
                                //     {
                                //         user.username === params.user ? (
                                //             <div className='flex mt-3 justify-center'>
                                //                 {params.type === "Followers" ? (
                                //                     <button onClick={() => handlebutton(item.username)} className='text-[22px] bg-red-400 w-[120px] rounded-lg h-[45px]'>
                                //                         {loading === true ? (
                                //                             <span className='h-full w-full flex justify-center items-center'>
                                //                                 <LoadingSpinner />
                                //                             </span>
                                //                         ) : (
                                //                             <span className='h-full w-full flex justify-center items-center'>Remove</span>
                                //                         )}
                                //                     </button>
                                //                 ) : (
                                //                     <button onClick={() => handlebutton(item.username)} className='text-[22px] bg-orange-500 w-[130px] rounded-lg h-[45px]'>
                                //                         {loading === true ? (
                                //                             <span className='h-full w-full flex justify-center items-center'>
                                //                                 <LoadingSpinner />
                                //                             </span>
                                //                         ) : (
                                //                             <span className='h-full w-full flex justify-center items-center'>
                                //                                 {value}
                                //                             </span>
                                //                         )}
                                //                     </button>
                                //                 )}
                                //             </div>
                                //         ) : (
                                //             <div className={`flex ${user.username === item.username ? "hidden" : ""} mt-3 justify-center`}>
                                //                 <div className='text-[22px] bg-orange-500 w-[130px] rounded-lg h-[45px]'>
                                //                     {user.following.includes(item.username) ? (
                                //                         <button onClick={()=>handlebutton(item.username)}  className='text-[22px] bg-red-400 w-[120px] rounded-lg h-[45px]'>
                                //                             {loading === true ? (
                                //                                 <span className='h-full w-full flex justify-center items-center'>
                                //                                     <LoadingSpinner />
                                //                                 </span>
                                //                             ) : (
                                //                                 <span className='h-full w-full flex justify-center items-center'>following</span>
                                //                             )}
                                //                         </button>
                                //                     ) : (
                                //                         <button onClick={()=>handlebutton(item.username)} className='text-[22px] bg-orange-500 w-[130px] rounded-lg h-[45px]'>
                                //                             {loading === true ? (
                                //                                 <span className='h-full w-full flex justify-center items-center'>
                                //                                     <LoadingSpinner />
                                //                                 </span>
                                //                             ) : (
                                //                                 <span className='h-full w-full flex justify-center items-center'>
                                //                                     Add
                                //                                 </span>
                                //                             )}
                                //                         </button>
                                //                     )}
                                //                 </div>
                                //             </div>
                                //         )
                                //     }

                                // </div>
                            ))}


                        </div>

                    </div>
                </div>
            )}


        </div>
    )
}

export default Network