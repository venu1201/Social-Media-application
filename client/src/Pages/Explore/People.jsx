import React, { useEffect, useState } from 'react'
import search from '../../assets/icons/search.svg'
import { addNetwork, getNetworkByQuery, getPopularPosts, getPostsByQuery, getTopCreators } from '../../api';
import { useNavigate } from 'react-router-dom';
import { update_authData } from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import Networkbox from './Components/Networkbox';
const People = () => {
    const [posts, setposts] = useState([]);
    const [query, setquery] = useState('');
    const [value, setvalue] = useState('Top Creators');
    const [loading, setloading] = useState(false);
    const authData=useSelector((state)=>state.authData);
    const navigate=useNavigate();
    useEffect(() => {
        const fecthPopular = async () => {
            setloading(true);
            try {
                const response = await getTopCreators();
                setvalue('Top Creators');
                console.log(response.data.result);
                setposts(response.data.result)
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        }
        fecthPopular();
    }, [])
    
    const fecthPopular = async () => {
        setloading(true);
        try {
            const response = await getTopCreators();
            setvalue('Top Creators');
            setposts(response.data.result)
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }
    const handlesearch = async () => {
        try {
            setloading(true);
            if (query.length === 0) {
                await fecthPopular();
                return;
            }

            const response = await getNetworkByQuery(query);
            setvalue(`Search for "${query}"`);

            setposts(response.data.result);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }
    const [networkLoading, setnetworkLoading] = useState(false);
    const [networkvalue, setnetworkvalue] = useState(null);

    const dispatch=useDispatch();
    const func2 = async (username,sl,sv) => {
        const p = { user: authData.username, touser: username };
        sl(true);
        try {
            const { data } = await addNetwork(p);
            dispatch(update_authData(data));
            // if (data.result.following.includes(username)) {
            //     // sv("following");
            // }
            // else {
            //     sv("Add");
            // }

        } catch (error) {
            console.log(error);
        } finally {
            sl(false);
        }
    }
    return (
        <div className='w-full overflow-scroll font-serif h-full'>
            <div className='w-full flex  flex-col gap-7 mt-10'>
                <h2 className='w-full flex justify-center text-[25px]'>Find Your Friend </h2>
                <div className='w-full flex justify-center'>
                    <div className='xmedium:w-[50%] w-[80%] flex gap-1 h-[35px] bg-white rounded-md'>
                        <div onClick={() => handlesearch()} className='h-full rounded-l-md w-[35px] border-r-[1px] border-slate-800'>
                            <img src={search} className=' border-2 rounded-l-md h-full w-full' alt="" />

                        </div>
                        <input value={query} onChange={(e) => setquery(e.target.value)} type="text" className='w-full outline-none border-none px-1 text-[22px] text-black rounded-r-md' />
                    </div>
                </div>
                {loading === true ? (

                    <div className='w-full flex flex-col gap-5 font-mono px-10 '>
                        <h2 className='text-[20px] h-[20px] w-[150px] bg-blue-950 animate-pulse'>

                        </h2>
                        <div className='flex w-full justify-center flex-wrap gap-3'>
                            {[1,2,3,4,5,6,7,8,9,10].map((item, index) => (
                                <div key={index} className={`w-[270px] h-[290px] bg-blue-950 animate-pulse`}>
                                </div>
                            ))}
                        </div>
                        <div className='min-h-[10px]'>

                        </div>
                    </div>
                ) : (


                    <div className='w-full flex flex-col gap-5 font-mono px-5 '>
                        <h2 className='text-[25px]'>{value}</h2>
                        <div className='flex w-full justify-center flex-wrap gap-2'>
                            {posts.length===0 && (
                                <div className='w-full text-cyan-600 flex justify-center items-center h-full'>
                                    No Results Found with "{query}"
                                </div>
                            )}
                            {posts.map((item, index) => (
                                <Networkbox handlebutton={func2} item={item} key={index}/>
                                // <div key={index} onClick={()=>navigate(`/Post/${item._id}`)} className={`w-[200px] h-[200px]`}>
                                //     <img className='w-full h-full object-fill' src={item.profilepicture || avatar} alt="" />
                                // </div>
                            ))}
                        </div>
                        <div className='min-h-[10px]'>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default People