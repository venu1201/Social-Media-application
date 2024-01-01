import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { avatar } from '../../assets';
import { DeletePost, SavePost, addNetwork, getPostbyId, likeandcomment } from '../../api';
import LoadingSpinner from '../../components/Spinner/Spinner';
import { update_authData } from '../../reducers';
import { ToastContainer, toast } from 'react-toastify';
import del from '../../assets/icons/delete.svg'
import send from '../../assets/icons/send2.svg'
import save from '../../assets/icons/save.svg'
import comment from '../../assets/icons/comment2.svg'
import like from '../../assets/icons/like.svg'
import liked from '../../assets/icons/liked.svg'
import saved from '../../assets/icons/saved.svg'

const initialform = { like: false, comment: { user: { username: null, profilepicture: null }, message: '' } };
const Postpage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false);
    const [postdata, setpostdata] = useState(null);
    const authData = useSelector((state) => state.authData);
    const [relatedPosts, setrelatedPosts] = useState(null);
    const [networkLoading, setnetworkLoading] = useState(false);
    const [networkvalue, setnetworkvalue] = useState(null);
    const [form, setform] = useState(initialform);
    const [saveicon, setsaveicon] = useState(save);
    // const forceupdate=useForceUpdate();
    const navigatefunction = (id) => {
        // forceupdate();
        navigate(`/Post/${id}`);
    }
    useEffect(() => {
        const fetchpost = async () => {
            setloading(true);
            try {
                const response = await getPostbyId(id);
                setpostdata(response.data.result);
                setuser(response.data.user);
                setrelatedPosts(response.data.relatedposts);
                setform({ like: false, comment: { user: { username: authData.username, profilepicture: authData.profilepicture }, message: '' } })
                if (authData.following.includes(response.data.user.username)) {
                    setnetworkvalue("following");
                }
                else {
                    setnetworkvalue("Add");
                }

            } catch (error) {
                console.log(error);
            }
            finally {
                setloading(false);
            }
        }
        fetchpost();
    }, [id])
    const deletepost = async () => {
        try {
            const response = await DeletePost(id);
            ToastFunction(response.data.message);
        } catch (error) {
            console.log(error);
        }
        finally {
            navigate(`/Profile/${user.username}`);
        }
    }
    const dispatch = useDispatch();
    const func2 = async (username) => {
        const p = { user: authData.username, touser: username };
        setnetworkLoading(true);
        try {
            const { data } = await addNetwork(p);
            dispatch(update_authData(data));
            if (data.result.following.includes(user.username)) {
                setnetworkvalue("following");
            }
            else {
                setnetworkvalue("Add");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setnetworkLoading(false);
        }
    }
    function timeAgoFormatter(isoDateString) {
        const currentTime = new Date();
        const createdAt = new Date(isoDateString);

        const seconds = Math.floor((currentTime - createdAt) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);

            if (interval > 1) {
                return `${interval} ${unit}s ago`;
            }
            if (interval === 1) {
                return `1 ${unit} ago`;
            }
        }

        return 'just now';
    }
    const [load, setload] = useState(false);
    const [load3,setload3]=useState(false);
    const handlelikeandcomment = async (liked) => {
        try {
            if (liked === false) {
                setload(true);
                const response = await likeandcomment(form, id);
                setpostdata(response.data.result);
            }
            else {
                setload3(true);
                const response = await likeandcomment({ ...form, like: liked }, id);
                setpostdata(response.data.result);
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setload(false);
            setload3(false);
            setform({ like: false, comment: { user: { username: authData.username, profilepicture: authData.profilepicture }, message: '' } })
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
    const tagsTostring = (tags) => {
        if (tags.length === 0)
            return;
        let str = '#' + tags[0];
        for (let i = 1; i < tags.length; i++) {
            str += ' #' + tags[i]
        }
        return str;
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: { user: { username: authData.username, profilepicture: authData.profilepicture }, message: e.target.value } });
    }
    const [load2, setload2] = useState(false);
    const handleSaveButton = async () => {
        setload2(true);
        try {
            const response = await SavePost(authData.username, id);
            dispatch(update_authData(response.data));
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setload2(false);
        }
    }
    return (
        <div className=' h-full w-full overflow-scroll font-poppins  '>
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
            {(postdata === null || loading === true) ? (
                <div className='h-full w-full flex-col px-5 pt-5'>
                    <div className='w-full  flex  gap-5   '>
                        <div className='h-[420px] bg-blue-950 animate-pulse  w-[400px]'>
                        </div>
                        <div className='h-full mt-2 w-[calc(100%-400px)]'>
                            <div className='w-full flex justify-between'>
                                <div className='flex gap-3'>
                                    <div className='w-[70px] h-[70px] bg-blue-950 animate-pulse'>
                                    </div>
                                    <div className='flex bg-blue-950 animate-pulse flex-col gap-2 justify-center items-center'>

                                    </div>
                                </div>

                                <div className='flex justify-center items-center gap-3 px-3'>
                                    <button className=' px-3 bg-blue-950 animate-pulse h-[40px] rounded-lg w-full' onClick={() => deletepost()}>
                                    </button>
                                </div>

                            </div>

                            <div className='h-[185px] bg-blue-950 animate-pulse overflow-scroll mt-2 '>

                            </div>
                            <div className='flex bg-blue-950 animate-pulse  pr-10 justify-between text-[18px] mt-3 pt-3 w-full'>

                            </div>
                            <div className='flex h-[55px] bg-blue-950 animate-pulse items-center mt-3 w-full'>

                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div className='h-full w-full flex-col xlarge:px-5 medium:px-3 pt-5'>
                    <div className='w-full  flex  xlarge:flex-row flex-col   gap-5    bg-slate-950'>
                        <div className='h-[440px] xlarge:w-[350px] xlarge:py-0 py-2 w-full xlarge:justify-normal flex justify-center '>
                            <img src={postdata.selectedfile} className='h-[440px] medium:w-[400px] w-[95%] xlarge:w-full object-fill' alt="" />
                        </div>
                        <div className='h-full mt-2 xlarge:w-[calc(100%-350px)] w-full xlarge:pb-0 pb-2 xlarge:px-0 px-3'>
                            <div className='w-full flex justify-between'>
                                <div onClick={() => navigate(`/Profile/${user.username}`)} className='flex gap-3'>
                                    <div className='w-[70px] h-[70px]'>
                                        <img className='h-full w-full rounded-full' src={user.profilepicture} alt="" />
                                    </div>
                                    <div className='flex flex-col gap-2 justify-center items-center'>
                                        <div className='w-full text-[24px]'>
                                            {"@" + user.username}
                                        </div>
                                        <div className='text-[16px] text-slate-400'>
                                            {timeAgoFormatter(postdata.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                {
                                    authData.username === user.username ? (
                                        <div className='flex justify-center items-center gap-3 px-3'>
                                            <button className=' px-3 h-[40px] rounded-lg w-full' onClick={() => deletepost()}>
                                                <img className='w-full h-[80%]' src={del} alt="" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex text-white justify-center items-center gap-3 px-3'>

                                            <button onClick={() => func2(user.username)} className={`text-[22px] ${networkvalue === "Add" ? "bg-orange-500" : "bg-orange-400"} w-[130px] rounded-lg h-[45px]`}>
                                                {networkLoading === true ? (
                                                    <span className='h-full w-full flex justify-center items-center'>
                                                        <LoadingSpinner />
                                                    </span>
                                                ) : (
                                                    <span className={`h-full w-full flex justify-center items-center `}>
                                                        {networkvalue}
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='w-full h-[35px] overflow-scroll mt-3'>

                                {postdata.description}
                                <span className='text-slate-400'> {tagsTostring(postdata.tags)}</span>
                            </div>
                            <div className='h-[185px] overflow-scroll mt-2 border-t-2 border-slate-500'>
                                {postdata.Comments.length === 0 ? (
                                    <div className='w-full flex justify-center text-cyan-600 text-[20px] items-center h-full '>
                                        No Comments yet
                                    </div>
                                ) : (
                                    <div className='w-full h-full overflow-scroll mt-2 flex gap-2 flex-col'>
                                        {postdata.Comments.map((item, index) => (
                                            <div key={item._id} className='h-[60px] flex gap-2 xlarge:px-2 '>
                                                <div onClick={() => navigate(`/Profile/${item.username}`)} className='min-w-[60px] h-[60px]'>
                                                    <img className='w-[60px] object-fill h-[60px] rounded-full' src={item.profilepicture || avatar} alt="" />

                                                </div>
                                                <div className='flex w-full h-full overflow-scroll gap-2 pt-2'>
                                                    <span className='pt-[1px] text-[17px]'>
                                                        <span onClick={() => navigate(`/Profile/${item.username}`)} className='text-[20px] text-cyan-500 mr-3'>{`@${item.username} `}</span> {` ${item.comment} `}
                                                    </span></div>
                                                <div className='text-[10px] min-w-[100px]  text-slate-300 flex justify-center items-center'>
                                                    {timeAgoFormatter(item.createdAt)}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='flex  pr-10 justify-between text-[18px] mt-3 pt-3 w-full'>
                                <div className='flex gap-5'>
                                    <div className='flex justify-center items-center gap-4'>
                                        <span>{postdata.likeCount.length}</span>
                                        <button className={`h-[30px] w-full ${postdata.likeCount.includes(authData.username) === true ? "" : ""}  `} onClick={() => handlelikeandcomment(true)}>
                                            {postdata.likeCount.includes(authData.username)===true?(
                                            <img className={`h-full w-full ${load3===true?"animate-spin":"animate-none"}`} src={liked} alt="" />

                                            ):(
                                            <img className={`h-full w-full ${load3===true?"animate-spin":"animate-none"}`} src={like} alt="" />

                                            )}
                                        </button>
                                    </div>
                                    <button className='flex justify-center items-center gap-4'>
                                        <span>{postdata.Comments.length}</span>
                                        <img className='h-[28px] w-[28px]' src={comment} alt="" />
                                    </button>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button onClick={()=>handleSaveButton()} className='flex justify-center items-center'>
                                        {authData.savedposts.includes(id) === true ? (
                                            <img className={`h-[25px] ${load2===true?"animate-spin":"animate-none"} w-[25px] `} src={saved} alt="" />

                                        ) : (
                                            <img className={`h-[25px] ${load2===true?"animate-spin":"animate-none"}  w-[25px]`} src={saveicon} alt="" />

                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className='flex items-center mt-3 w-full'>
                                <img className='h-[55px] w-[55px] rounded-full' src={authData.profilepicture} alt="" />
                                <input onChange={handlechange} name='comment' className='h-[35px] text-[20px] border-none outline-none px-2 py-1 text-black ml-2 w-[calc(100%-85px)]' type="text" />
                                <button value={form.comment} onClick={() => handlelikeandcomment(false)} className='w-[40px] h-full flex justify-center cursor-pointer  items-center'>
                                    {load === true ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <img className='h-[80%] w-[55%]' src={send} alt="sent" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center px-2 gap-3 pb-2 w-full mt-10'>
                        <h3 className='text-[27px] w-full '>
                            # Most Related Posts
                        </h3>
                        <div className='w-full flex flex-wrap justify-center gap-3'>
                            {relatedPosts.map((item, index) => (
                                <div onClick={() => navigatefunction(item._id)} key={item._id} className={`Large:w-[24%] xSmall:w-[31%] medium:w-[48%] w-[85%] ${item.selectedfile === null ? "hidden" : ""} Large:h-[300px] medium:h-[240px] h-[300px]`}>
                                    <img className='h-full w-full' src={item.selectedfile} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Postpage