import React, { useEffect, useState } from 'react'
import WeatherApp from '../../../components/featuresection/weatherapp/App'
import { getTrendingTags } from '../../../api';
import { useDispatch } from 'react-redux';
import { settagquery, settags } from '../../../reducers';
import { useNavigate } from 'react-router-dom';

const Features = () => {
    const [Toptags, setToptags] = useState(null);
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchtags = async () => {
            try {
                const response = await getTrendingTags();
                setToptags(response.data.result);
                dispatch(settags(response.data.result));
            } catch (error) {
                console.log(error);
            }
        }
        fetchtags()
    }, [])
    const navigate=useNavigate();
    const handletagbutton=(q)=>{
        dispatch(settagquery(q));
        navigate('/Explore')
    }
    console.log(Toptags)
    return (
        <div className='w-full flex pt-10 flex-col gap-10 h-full overflow-scroll'>
            <div className='w-full xlarge:flex hidden' >
                <WeatherApp />
            </div>
            <div className='w-full Large:pl-0 pl-3 flex flex-col gap-7'>
                <h2 className='w-full font-serif Large:text-[33px] text-[28px]'># Trending HashTags</h2>
                    {Toptags !== null ? (
                        <div className='w-full flex flex-col  gap-5'>
                            {Toptags.map((item, index) => (
                                <div onClick={()=>handletagbutton(item._id)} className='text-[22px] cursor-pointer text-slate-300 flex justify-between' key={index}>
                                        {"#"+item._id}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}

            </div>
            <div>

            </div>
        </div>
    )
}

export default Features