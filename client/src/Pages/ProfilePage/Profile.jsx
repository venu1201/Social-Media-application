import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { avatar } from '../../assets'
import LoadingSpinner from '../../components/Spinner/Spinner'
import { addNetwork, getProfileData } from '../../api';
import { update_authData } from '../../reducers'
import edit from '../../assets/icons/edit.svg'
import Layout from './Components/Layout'
const Profile = () => {

  // declarations
  const { user } = useParams();
  const authdata = useSelector((state) => state.authData);
  const navigate = useNavigate();
  // states
  const [loading, setloading] = useState(true);
  const [loadingspinner, setloadingspinner] = useState(false);

  const [userposts, setuserposts] = useState([]);
  const [usersavedposts, setusersavedposts] = useState([]);
  const [active, setactive] = useState(0);
  const [userdata, setuserdata] = useState(null);
  const [others, setothers] = useState(false);
  const dispatch = useDispatch();
  //functions 
  console.log(userdata);
  const func2 = async (username) => {
    const p = { user: authdata.username, touser: user };
    setloadingspinner(true);
    try {
      const { data } = await addNetwork(p);

      dispatch(update_authData(data));
      setuserdata(data.touser);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingspinner(false);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      // setLoading(true);
      // setError(null);
      setloading(true);
      try {
        const response = await getProfileData(user);
        console.log(response);
        setuserdata(response.data.result);
        setuserposts(response.data.posts);
        setusersavedposts(response.data.saved);
        if (user === authdata.username) {
          setothers(false);
          dispatch(update_authData(response.data));

        }
        else
          setothers(true);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setloading(false);
      }
    };

    fetchUser();
  }, [location.pathname]);
  return (

    <div className='h-full w-full font-poppins text-white   '>
      {loading === true ? (
        <div className='flex flex-col gap-2 overflow-scroll h-full w-full '>


          <div className='w-full flex  px-4 h-[260px]'>
            <div className='h-full  w-full pt-5 flex   '>

              <div className='w-[200px] pt-1  h-full'>
                <div className='h-[200px] bg-blue-900 animate-pulse w-full '>

                </div>
              </div>
              <div className='w-[calc(100%-200px)] pl-2 flex flex-col gap-2     h-full pt-4 '>
                <h3 className='text-[35px] animate-pulse bg-blue-900 pl-1  flex justify-between w-full'>
                  <span>
                  </span>
                  <span className='  text-dimWhite px-4 h-[50px] flex justify-center items-center w-[140px] '>

                  </span>

                </h3>
                <h3 className='text-[35px] animate-pulse bg-blue-900 pl-1  flex justify-between w-full'>
                  <span>
                  </span>
                  <span className='  text-dimWhite px-4 h-[50px] flex justify-center items-center w-[140px] '>

                  </span>

                </h3>
                <h3 className='text-[35px] animate-pulse bg-blue-900 pl-1  flex justify-between w-full'>
                  <span>
                  </span>
                  <span className='  text-dimWhite px-4 h-[50px] flex justify-center items-center w-[140px] '>

                  </span>

                </h3>


              </div>

            </div>

          </div>
          <div className=' bg-blue-900 animate-pulse w-[80%] mx-auto  pl-4 flex min-h-[62px] justify-center  gap-5 '>
            <div className='w-[330px] h-full flex gap-5 '>

            </div>

            {/* <Switch data={["Posts", "Blogs","saved"]} setshowposts={setshowposts} /> */}

          </div>
          <div className='mt-4 flex flex-wrap  h-full gap-3 w-[90%] mx-auto'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <div key={item} className='w-[300px] bg-blue-900 animate-pulse h-[300px]'>

              </div>
            ))}
          </div>



        </div>
      ) : (
        <div className='flex flex-col gap-2 overflow-scroll h-full w-full '>

          <div className='w-full xsmall:hidden  flex px-4 '>
            <div className='h-full   w-full pt-5 flex flex-col   '>

              <div className='w-full flex  '>
                <div className='xmedium:h-[150px] medium:h-[110px] medium:w-[110px] w-[90px] h-[90px] rounded-full xmedium:w-[150px] '>
                  <img className='h-full rounded-full  w-full' src={userdata?.profilepicture || avatar} alt="" />

                </div>
                <div className='medium:pl-5 pl-2 pt-2'>
                  <div className='text-[28px]'>
                    {"@" + userdata?.username}
                  </div>
                  <div className='mt-4 pl-2 gap-3 text-[15px] flex '>
                    <button onClick={() => navigate(`/Network/${user}/${"Followers"}`)} className='flex flex-col-reverse gap-2 cursor-pointer '>
                      <span className=' '>
                        {userdata?.followers?.length}
                      </span>
                      <span>
                        Followers
                      </span>
                    </button>
                    <div onClick={() => navigate(`/Network/${user}/${"Following"}`)} className='flex flex-col-reverse gap-2 cursor-pointer '>
                      <span>
                        {userdata?.following?.length}
                      </span>
                      <span>
                        Following
                      </span>
                    </div>
                    <div onClick={() => document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })} className='flex flex-col-reverse gap-2 cursor-pointer '>
                      <span>
                        {userposts?.length}
                      </span>
                      <span>
                        Posts
                      </span>


                    </div>


                  </div>



                </div>

              </div>
              <div className='w-full flex pl-1 mt-4 mb-4'>
                <div className='w-[55%] flex flex-col gap-2'>
                  <div className=' font-serif text-[20px] w-full'>
                    {userdata?.firstname + " " + userdata?.lastname}
                  </div>
                  <div className={`w-full ${userdata?.bio?.length === 0 ? "hidden" : ""}`}>
                    {userdata?.bio}
                  </div>
                </div>

                <div className='w-[45%] flex justify-end'>
                  <div className={` text-dimWhite ${others === true ? "h-[45px] w-[130px]" : "h-[50px] w-[133px]"} flex justify-center items-center  `}>
                    {others === true ? (
                      <button onClick={() => func2(user)} className={`text-[16px] ${authdata.following.includes(user) ? "bg-orange-400" : "bg-orange-500"} h-full w-full rounded-lg `}>
                        {authdata.following.includes(user) === true ? (
                          <span className='flex justify-center items-center'>
                            {loadingspinner === true ? (
                              <span className='flex justify-center items-center'>
                                <LoadingSpinner />
                              </span>
                            ) : (
                              <span className='flex  justify-center items-center'>
                                following
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className='flex justify-center items-center'>
                            <span className='flex justify-center items-center'>
                              {loadingspinner === true ? (
                                <span className='flex justify-center items-center'>
                                  <LoadingSpinner />
                                </span>
                              ) : (
                                <span className='flex justify-center items-center'>
                                  Add
                                </span>
                              )}
                            </span>
                          </span>
                        )}
                      </button>
                    ) : (
                      <button onClick={() => navigate('/Editprofile')} className='text-[15px] h-full flex w-full rounded-lg gap-1 bg-slate-950'>
                        <img className='my-auto ' src={edit} alt="" />
                        <span className='flex h-full  justify-center items-center'>Edit Profile</span>
                      </button>
                    )}

                  </div>
                </div>

              </div>

            </div>

          </div>
          <div className='w-full  xsmall:flex hidden px-4 h-[260px]'>
            <div className='h-full w-full pt-5 flex   '>

              <div className='w-[200px] pt-1  h-full'>
                <div className='h-[200px] w-full '>
                  <img className='h-full rounded-xl  w-full' src={userdata?.profilepicture || avatar} alt="" />

                </div>
              </div>
              <div className='w-[calc(100%-200px)] pl-2     h-full pt-4 '>
                <h3 className='text-[35px] pl-1  flex justify-between w-full'>
                  <span>
                    {"@" + userdata?.username}
                  </span>
                  <span className={` text-dimWhite ${others === true ? "px-2" : "px-4"}px-2 h-[50px] flex justify-center items-center w-[153px]  `}>
                    {others === true ? (
                      <button onClick={() => func2(user)} className={`text-[20px] ${authdata.following.includes(user) ? "bg-orange-400" : "bg-orange-500"} h-full w-full rounded-lg `}>
                        {authdata.following.includes(user) === true ? (
                          <span className='flex justify-center items-center'>
                            {loadingspinner === true ? (
                              <span className='flex justify-center items-center'>
                                <LoadingSpinner />
                              </span>
                            ) : (
                              <span className='flex justify-center items-center'>
                                following
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className='flex justify-center items-center'>
                            <span className='flex justify-center items-center'>
                              {loadingspinner === true ? (
                                <span className='flex justify-center items-center'>
                                  <LoadingSpinner />
                                </span>
                              ) : (
                                <span className='flex justify-center items-center'>
                                  Add
                                </span>
                              )}
                            </span>
                          </span>
                        )}
                      </button>
                    ) : (
                      <button onClick={() => navigate('/Editprofile')} className='text-[20px] h-full flex w-full rounded-lg gap-1 bg-slate-950'>
                        <img className='my-auto ' src={edit} alt="" />
                        <span className='flex h-full  justify-center items-center'>Edit Profile</span>
                      </button>
                    )}

                  </span>

                </h3>
                <div className='text-[25px] pl-1 w-full text-slate-300 flex gap-2 mt-1'>
                  <span>
                    {userdata?.firstname}
                  </span>
                  <span>
                    {userdata?.lastname}
                  </span>
                </div>
                <div className='mt-5 font-semibold ml-4  gap-4 text-[20px] flex '>
                  <button onClick={() => navigate(`/Network/${user}/${"Followers"}`)} className='flex gap-2 cursor-pointer '>
                    <span className=''>
                      {userdata?.followers?.length}
                    </span>
                    <span>
                      Followers
                    </span>
                  </button>
                  <div onClick={() => navigate(`/Network/${user}/${"Following"}`)} className='flex gap-2 cursor-pointer '>
                    <span>
                      {userdata?.following?.length}
                    </span>
                    <span>
                      Following
                    </span>
                  </div>
                  <div onClick={() => document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })} className='flex gap-2 cursor-pointer '>
                    <span>
                      {userposts?.length}
                    </span>
                    <span>
                      Posts
                    </span>


                  </div>


                </div>
                {
                  userdata?.bio?.length > 0 ? (
                    <div className='text-[20px] font-sans ml-4 overflow-scroll  h-[100px] mt-3 flex   break-all  text-dimWhite '>
                      {userdata?.bio}
                    </div>
                  ) : (
                    <div className='hidden'></div>
                  )
                }

              </div>

            </div>

          </div>
          <div className='h-1 w-full border-t-[1px] border-blue-900 mt-10'>

          </div>
          <div className='w-full  flex min-h-[52px] justify-center mt-3  gap-5 '>
            <div className='w-[180px] h-full flex gap-5 '>
              <button onClick={() => { setactive(0) }} className={` ${active == 0 ? "bg-orange-500" : "bg-black"} h-full rounded-lg w-[90px]`}>
                Posts
              </button>
              {/* <button onClick={()=>{setactive(1)}} className={` ${active==1?"bg-orange-500":"bg-black" } h-full rounded-lg w-[120px]`}>
            Blogs
          </button> */}
              <button onClick={() => setactive(2)} className={` ${active == 2 ? "bg-orange-500" : "bg-black"} h-full rounded-lg w-[90px]`}>
                Saved
              </button>
            </div>

            {/* <Switch data={["Posts", "Blogs","saved"]} setshowposts={setshowposts} /> */}

          </div>
          {active == 0 && (
            <div id='posts' className={`w-full h-full   pt-4 pb-2  flex `}>
              <div className={`mx-2  flex flex-wrap justify-center medium:gap-2 gap-4 w-full  ${active === 0 ? "" : "hidden"} `}>

                {userposts.map((post, index) => (

                  <div onClick={() => navigate(`/Post/${post._id}`)} key={post._id} className={` xsmall:w-[32%] medium:w-[48%] w-[330px] ${post?.selectedfile === null ? "hidden" : ""} p-0 Large:h-[350px] xlarge:h-[300px] xsmall:h-[260px] medium:h-[270px] h-[350px] `}>
                    <img className='h-full w-full' src={post?.selectedfile} alt="" />
                  </div>
                  // <Postbox data={post} key={index} />
                ))}
              </div>
            </div>
          )
          }
          {active == 2 && (
            <div id='saved' className={`w-full h-full   pt-4 pb-2  flex `}>
              <div className={`mx-2  flex flex-wrap justify-center medium:gap-2 gap-4 w-full  ${active === 2 ? "" : "hidden"} `}>

                {usersavedposts.map((post, index) => (

                  <div onClick={() => navigate(`/Post/${post._id}`)} key={post._id} className={`Large:w-[24%] xsmall:w-[32%] medium:w-[48%] w-[300px] ${post?.selectedfile === null ? "hidden" : ""} p-0 Large:h-[300px] xlarge:h-[300px] xsmall:h-[260px] medium:h-[270px] h-[300px] `}>
                    <img className='h-full w-full' src={post?.selectedfile} alt="" />
                  </div>
                  // <Postbox data={post} key={index} />
                ))}
              </div>
            </div>
          )
          }


          {/* {usersavedposts.length} */}
          {/* <div id='posts' className={`w-full h-full pb-2  flex `}>
            <div className={`mx-2  flex flex-wrap justify-center medium:gap-2 gap-4 w-full  ${active === 2 ? "" : "hidden"} `}>

              {usersavedposts.map((post, index) => (

                <div onClick={() => navigate(`/Post/${post._id}`)} key={post._id} className={`xsmall:w-[32%] medium:w-[48%] w-[300px] bg-black ${post?.selectedfile === null ? "hidden" : ""} p-0 Large:h-[450px] xlarge:h-[300px] xsmall:h-[260px] medium:h-[270px] h-[300px] `}>
                  <img className='h-full w-full' src={post?.selectedfile} alt="" />
                </div>
                // <Postbox data={post} key={index} />
              ))}
            </div>
          </div> */}
          {/* <div id='posts' className={`w-full pt-4 pb-2 h-full bg-white   flex justify-center`}>
            <div className={`flex flex-wrap w-full h-full mx-2 justify-center  gap-2 ${active === 2 ? "" : "hidden"} `}>
              {usersavedposts.map((post, index) => (

                <div onClick={() => navigate(`/Post/${post._id}`)} key={post._id} className={`xsmall:w-[32%] medium:w-[48%] w-[300px] bg-black ${post?.selectedfile === null ? "hidden" : ""} p-0 Large:h-[450px] xlarge:h-[300px] xsmall:h-[260px] medium:h-[270px] h-[300px] `}>
                  <img className='h-full w-full' src={post?.selectedfile} alt="" />
                </div>
                // <Postbox data={post} key={index} />
              ))}
            </div>
          </div> */}
          <div className='min-h-[10px]'>

          </div>
        </div>
      )}

    </div>
  )
}

export default Profile
