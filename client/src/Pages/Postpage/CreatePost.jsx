import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { client, urlFor } from '../../Client';
import { ToastContainer, toast } from 'react-toastify';

import add from '../../assets/icons/add2.svg'
import del from '../../assets/icons/delete.svg'

import createpostlogo from '../../assets/icons/file-upload.svg'
import LoadingSpinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { TopPosts, createpost } from '../../api';
const CreatePost = () => {

    const [loading, setloading] = useState(false);
    const authData = useSelector((state) => state.authData);
    const [formdata, setformdata] = useState({ selectedfile: null, username: authData.username, description: '', Tags: [] })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comloading, setcomloading] = useState(true);
    const [Topposts, setTopposts] = useState([]);
    const [taglist, settaglist] = useState([]);
    const [tag, settag] = useState('');

    useEffect(() => {
        const fecthtopposts = async () => {
            try {
                setcomloading(true);
                const response = await TopPosts();
                setTopposts(response.data.topPosts);
            } catch (error) {
                console.log(error);
            }
            finally {
                setcomloading(false);
            }
        }
        fecthtopposts();
    }, [])
    const handleDrop = async (acceptedFiles) => {
        // Filter only image files
        setloading(true);
        const imageFiles = acceptedFiles.filter((file) => file.type.startsWith('image/'));
        if (imageFiles[0]) {
            const imageasset = await client.assets.upload('image', imageFiles[0], { contentType: imageFiles[0].type, filename: imageFiles[0].name })
                .catch((err) => {
                    console.log('Upload failed', err.message);
                });
            setformdata({ ...formdata, selectedfile: urlFor({ _type: 'image', asset: { _type: '_reference', _ref: imageasset._id } }).url() });
            // setimage(urlFor({ _type: 'image', asset: { _type: '_reference', _ref: imageasset._id } }).url());
            // setformdata({...formdata,selectedfile:image});
            setloading(false)

        }
        else {
            setloading(false)
        }
    };
    const Post = async () => {
        try {
            if (formdata.selectedfile === null) {
                ToastFail("Select an Image to Post");
                return;
            }
            await createpost({ ...formdata, Tags: taglist });
            setformdata({ selectedfile: null, username: authData.username, description: '' });
            ToastFunction("Successfully Uploaded the Post")
        } catch (error) {
            ToastFail("Failed to Post please try again");
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formdata.selectedfile === null) {
            ToastFail("Select an Image to Post");
        }
        else {
            await Post();
        }
        console.log(formdata)
    };
    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }
    const handletags = (e) => {
        settag(e.target.value);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*', // Only accept image files
        // multiple: true, // Enable selection of multiple images
    });
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
    const ToastFail = (message) => {
        toast.error(message, {
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
    const handleadd = () => {
        settaglist([...taglist, tag]);
    }
    const handleremovetag = (t) => {
        let update = [];
        for (let i = 0; i < taglist.length; i++) {
            if (i !== t) {
                update = [...update, taglist[i]];
            }
        }
        settaglist(update);
    }
    return (
        <div
            className={`font-poppins h-full w-full flex justify-center items-center`}
        >
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
            <div className='xSmall:w-[65%] w-full h-full overflow-scroll flex flex-col justify-center items-center'>
                <div className='h-[90%]  gap-10 flex flex-col w-[90%]'>
                    <h3 className='text-[40px] w-full flex '>
                        Create a Post
                    </h3>
                    <div>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-6' >
                            <div className='flex gap-2 flex-col'>
                                <div className='text-[23px]'>DESCRIPTION</div>
                                <textarea onChange={handlechange} name='description' placeholder='Whats in Your Mind' className='w-[95%]  text-black text-[18px] outline-none border-none p-4 h-[80px] resize-none' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='text-[23px]'>DESCRIPTION</div>
                                <div
                                    {...getRootProps()}
                                    className={`p-4 medium:px-20 px-5 cursor-pointer w-[95%] h-[400px] border-2 border-black flex justify-center items-center bg-white ${(formdata.selectedfile === null && loading === false) ? 'border-blue-500 bg-blue-100' : 'bg-slate-900'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    {formdata.selectedfile === null ? (
                                        <div className="text-black w-full flex justify-center flex-col">
                                            {loading === true ? (
                                                <div className='w-full h-full flex justify-center items-center'>
                                                    <LoadingSpinner />
                                                </div>
                                            ) : (
                                                <div className='w-full h-full flex justify-center flex-col'>
                                                    <div className='w-full flex justify-center'>
                                                        <img className='w-[100px] h-[90px]' src={createpostlogo} alt="" />

                                                    </div>
                                                    <h3 className="text-[25px] flex justify-center  text-slate-900">
                                                        Drag photo here
                                                    </h3>
                                                    <p className="text-black w-full mt-2 flex justify-center text-[20px]">SVG, PNG, JPG</p>
                                                    <div className='w-full flex justify-center mt-4'>
                                                        <button type="button" className=" bg-slate-800 text-white p-3 rounded-md w-[200px]">
                                                            Select from computer
                                                        </button>
                                                    </div>
                                                </div>)}

                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col gap-3 justify-center items-center ">
                                            {loading === true ? (
                                                <div className='w-full h-full flex justify-center items-center'>
                                                    <LoadingSpinner />
                                                </div>
                                            ) : (
                                                <div className='w-full h-full flex flex-col gap-3 justify-center items-center'>

                                                    <div className='w-full h-[350px]'>
                                                        <img className='object-fill w-full h-full' src={formdata.selectedfile} alt="" />

                                                    </div>
                                                    <p className="text-[20px] text-slate-400 w-full flex justify-center h-[50px]">Click or drag photo to replace</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-3'>
                                <div className='text-[23px]'>TAGS</div>
                                <div className='w-full flex gap-3'>
                                    <div className='flex text-black'>
                                        <div className='flex justify-center items-center bg-slate-400 h-[27px] text-[20px] px-2'>#</div>
                                        <input onChange={handletags} className='h-[27px] outline-none px-2 border-none w-[150px] ' type="text" />
                                    </div>
                                    <span onClick={handleadd}>
                                        <img className='h-[27px] w-[30px]' src={add} alt="" />
                                    </span>
                                </div>

                            </div>
                            <div className='flex gap-3 flex-wrap'>
                                {taglist.map((item, index) => (
                                    <span key={index} className='flex gap-2'>
                                        <span>{"#" + item}</span>
                                        <span>
                                            <img src={del} onClick={() => handleremovetag(index)} alt="" />
                                        </span>
                                    </span>
                                ))}
                            </div>
                            <div className='w-[95%] flex gap-4 justify-end'>
                                <button onClick={() => navigate('/')} className='bg-red-600 rounded-md p-3 w-[80px]'>Cancel</button>
                                <button type='submit' className='bg-orange-600 rounded-md p-3 w-[80px]'>Post</button>
                            </div>

                            <div className='h-[10px]'>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <div className='w-[35%] bg-slate-950 px-2 overflow-scroll  xSmall:flex hidden flex-col gap-12 h-full'>
                <div onClick={() => navigate(`/Profile/${authData.username}`)} className='w-full   flex-col flex '>
                    <div className='w-full  mt-12  flex justify-center '>
                        <img className='rounded-full h-[140px] w-[140px]' src={authData.profilepicture} alt="" />

                    </div>
                    <div className='w-full mt-3 text-[30px] flex justify-center'>{"@" + authData.username}</div>
                </div>
                <div>
                    <h2 className='text-[40px] text-cyan-600'># Top Posts</h2>
                </div>
                <div className='w-full'>
                    {comloading === true ? (
                        <div className='w-full flex justify-center gap-4 items-center flex-col'>
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <div key={item} className='w-[300px] h-[320px] bg-blue-950 animate-pulse flex justify-center'>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='w-full flex justify-center flex-col gap-4'>
                            {Topposts.map((item, index) => (
                                <div key={item._id} onClick={() => navigate(`/Post/${item._id}`)} className='w-full flex justify-center'>

                                    <img className='w-[300px] h-[320px] rounded-md object-fill' src={item?.selectedfile} alt="" />
                                </div>
                            ))}
                            <div className='h-[10px]'></div>
                        </div>
                    )}
                </div>
            </div>
            {/*         
      {preview === true ? (
        <div
          className={`w-[600px] bg-gradient-to-r from-[#043d6e] via-[#1928b0] to-[#0f5085] relative z-[9999] bg-[--black3] h-[400px] flex flex-col gap-8 rounded-[10px] shadow-md shadow-[--black] `}
        >
          <h2 className="h-[60px] text-white mt-4 flex justify-center items-center p-4 font-poppins font-bold text-[40px] ">
            Create Post
            <VscChromeClose onClick={() => data2((prev) => !prev)} className='right-5 text-black h-[40px] hover:bg-white rounded-md w-[40px] hover:scale-105 absolute' />
          </h2>
          <form onSubmit={handleSubmit} className='flex text-black flex-col w-full h-full gap-3 px-5'>

            <div className='w-full h-[100px]'>
              <textarea onChange={handlechange} name='description' placeholder='Whats in Your Mind' className='w-full text-[18px] outline-none border-none p-4 h-full resize-none' />
            </div>
            <div
              {...getRootProps()}
              className={`p-4 mt-4 cursor-pointer w-full h-[70px] border-2 border-black flex justify-center items-center bg-white ${isDragActive ? 'border-blue-500 bg-blue-100' : ''
                }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-400">Drop images here...</p>
              ) : (
                <p className="text-[#666]">Drag 'n' drop images or click to select</p>
              )}
            </div>
            <button
              type="submit"
              className="text-[20px] font-bold text-white bg-gradient h-[50px]"
            >
              {next === true ? (
                <span>Preview</span>
              ) : (
                <span>
                  Wait...
                </span>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div
          className={`w-[600px] bg-gradient-to-r from-[#043d6e] via-[#1928b0] to-[#0f5085] relative z-[9999] bg-[--black3] h-[500px] flex flex-col rounded-[10px] justify-between shadow-md shadow-[--black] `}
        >
          <div className='p-4 flex flex-col gap-2'>
            {createdpost?.selectedfile && (
              <div>
                <img className='h-[350px]' src={createdpost?.selectedfile} alt="" />
              </div>
            )}
            {createdpost?.description.length > 0 && (
              <div className='text-[20px]'>
                {createdpost?.description}
              </div>
            )}
          </div>

          <div className='flex w-full'>
            <button
              onClick={()=>setpreview((prev)=>!prev)}
              className="text-[20px] w-full font-bold text-white bg-gradient h-[50px]"
            >
              Back
            </button>
            <button
              onClick={handlepost}
              className="text-[20px] w-full font-bold text-white bg-gradient h-[50px]"
            >
              Post
            </button>
          </div>

        </div>
      )} */}
        </div>
    );
};

export default CreatePost;
