import React, { useEffect, useState } from 'react'
import search from '../../assets/icons/search.svg'
import { getPopularPosts, getPostsByQuery } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleartagquery } from '../../reducers';
import Layout from './Components/Layout';
const Explore = () => {
    const q = useSelector((state) => state.tagquery);

    const [posts, setposts] = useState([]);
    const [query, setquery] = useState(q);
    const [value, setvalue] = useState('Popular Posts');
    const tags = useSelector((state) => state.tags);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fecthPopular = async () => {
            setloading(true);
            try {
                const response = await getPopularPosts();
                setvalue('Popular Posts');

                setposts(response.data.result)
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        }
        if (query.length > 0) {
            handlesearch();

        }
        else
            fecthPopular();
    }, [])
    const state = useSelector((state) => state);
    const fecthPopular = async () => {
        setloading(true);
        try {
            const response = await getPopularPosts();
            setvalue('Popular Posts');
            setposts(response.data.result)
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }
    const handlesearch = async (str) => {
        try {
            if (str) {
                setloading(true);
                if (str.length === 0) {
                    await fecthPopular();
                    return;
                }

                const response = await getPostsByQuery(str);
                setvalue(`Search for "${str}"`);
                dispatch(cleartagquery());

                setposts(response.data);
            }
            else {
                setloading(true);
                if (query.length === 0) {
                    await fecthPopular();
                    return;
                }

                const response = await getPostsByQuery(query);
                setvalue(`Search for "${query}"`);
                dispatch(cleartagquery());

                setposts(response.data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }
    return (
        <div className='w-full overflow-scroll font-serif h-full'>
            <div className='w-full flex  flex-col gap-7 mt-10'>
                <h2 className='w-full flex justify-center text-[25px]'>Explore the Social Verse </h2>
                <div className='w-full flex justify-center'>
                    <div className='xmedium:w-[60%] w-[80%] flex gap-1 h-[35px] bg-white rounded-md'>
                        <div onClick={() => handlesearch()} className='h-full rounded-l-md w-[35px] border-r-[1px] border-slate-800'>
                            <img src={search} className=' border-2 rounded-l-md h-full w-full' alt="" />

                        </div>
                        <input value={query} onChange={(e) => setquery(e.target.value)} type="text" className='w-full outline-none border-none px-1 text-[22px] text-black rounded-r-md' />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='flex justify-evenly xmedium:w-[60%] w-[100%]'>
                        {tags.map((item, index) => (
                            <div onClick={() => handlesearch(item._id)} className={`${index > 4 ? "hidden" : "flex"}`} key={index}>{"#"+item._id}</div>
                        ))}
                    </div>

                </div>
                {loading === true ? (

                    <div className='w-full flex flex-col gap-5 font-mono px-10 '>
                        <h2 className='text-[20px] h-[20px] w-[150px] bg-blue-950 animate-pulse'>

                        </h2>
                        <Layout loading={true}/>
                        <div className='min-h-[10px]'>

                        </div>
                    </div>
                ) : (


                    <div className='w-full flex flex-col gap-5 font-mono  px-3 '>
                        <h2 className='text-[25px]'>{value}</h2>
                        <div className=' w-full'>
                            {posts.length === 0 && (
                                <div className='w-full text-cyan-600 flex justify-center items-center h-full'>
                                    No Results Found with "{query}"
                                </div>
                            )}
                            <Layout posts={posts} loading={false}/>
                            {/* {posts.map((item, index) => (
                                <div key={index} onClick={() => navigate(`/Post/${item._id}`)} className={`w-[200px] h-[200px]`}>
                                    <img className='w-full h-full object-fill' src={item.selectedfile} alt="" />
                                </div>
                            ))} */}
                        </div>
                        <div className='min-h-[10px]'>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Explore