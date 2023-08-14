import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navigationbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getuserdetails } from '../../actions/Auth'
import { useLocation, useParams } from 'react-router-dom'
import { FaSquarePlus } from "react-icons/fa6";
import { avatar } from '../../assets'
import EditProfile from './Components/EditProfile'
import { getpostsbyusername } from '../../actions/Post'
import Postbox from './Components/Postbox'
import editpic from '../../assets/Edit.svg'
import editgif from '../../assets/Edit.gif'
import Switch from './Components/Switch'
import Blogbox from './Components/Blogbox'
import Popup from './Components/Popup'
import LoadingSpinner from '../../components/Spinner/Spinner'
import { requesting } from '../../actions/user'

const Profile = () => {
  const { user } = useParams();
  const localdata = JSON.parse(localStorage.getItem('profile'));
  const [isEdit, setisEdit] = useState(false);
  const location = useLocation();
  const [str, setstr] = useState("ADD")
  useEffect(() => {
    console.log(localdata?.result?.username, user)
    if (localdata?.result?.username === user) {
      setisEdit(true);
    }
    else {
      setisEdit(false);
      if (userdetails?.followers?.includes(localdata?.result?.username)) {
        setstr("ADDED")
      }
      else if (!userdetails?.followers?.includes(localdata?.result?.username) && userdetails?.pending?.includes(localdata?.result?.username)) {
        setstr("Pending");
      }
      else if (!userdetails?.followers?.includes(localdata?.result?.username) && !userdetails?.pending?.includes(localdata?.result?.username)) {
        setstr("ADD");
      }

    }
  }, [user, localdata, location.pathname])

  const [userdetails, setuserdetails] = useState(null)
  const dispatch = useDispatch();
  const [edit, setedit] = useState(false)
  const [showfollowers, setshowfollowers] = useState(false);
  const [showfollowing, setshowfollowing] = useState(false);

  useEffect(() => {
    dispatch(getuserdetails(setuserdetails, user))
    // getuserdetails(setuserdetails,username);

  }, [user, edit, location.path])
  const [userposts, setuserposts] = useState([]);
  useEffect(() => {
    if (userdetails)
      dispatch(getpostsbyusername(userdetails?.username, setuserposts));
  }, [userdetails])
  const [showposts, setshowposts] = useState(true);
  const [loading,setloading]=useState(false);
  const handleclick = () => {
    setloading(true)
    console.log(localdata?.result?.username,user,"hmmmmm");
    dispatch(requesting( user,localdata?.result))
      .then(() => {
        
        dispatch(getuserdetails(setuserdetails, user));
        setloading(false);
      })
      .catch(error => {
        console.error("Error occurred:", error);
      });
  };
  return (
    <div className=' relative  md:w-[75%] sm:w-[68%] ss:w-[80%] w-full ssm:w-[74%] ac:w-[78%] font-poppins text-white ss:h-full h-[90%]  '>

      {userdetails !== null ? (
        <div className='h-full overflow-scroll w-full '>
          <div className='flex  ms:flex-row flex-col ac:px-32 md:px-14 ssm:px-10 sm:px-8 mms:px-4 px-1 pt-10 ac:gap-10 md:gap-7 ssm:gap-3 gap-5'>
            <div className='flex  mx-auto   justify-center items-center h-[200px]  md:min-w-[200px] ms:min-w-[180px] min-w-[180px] max-w-[180px]'>
              <img className='object-fill h-full w-full rounded-md  shadow-md shadow-black' src={userdetails?.profilepicture || avatar} alt="" />
            </div>
            <div className='flex gap-1 ms:w-[60%] w-[100%]      flex-col pt-2 '>
              <h3 className='text-[30px] flex ms:justify-normal justify-center  w-full'>
                {userdetails?.username}
              </h3>
              <div className='text-[20px] w-full text-dimWhite flex ms:justify-normal justify-center gap-2 mt-2'>
                <span>
                  {userdetails?.firstname}
                </span>
                <span>
                  {userdetails?.lastname}
                </span>
              </div>

              {
                userdetails?.bio?.length > 0 ? (
                  <div className='text-[18px] flex ms:px-0 px-10 break-all  text-dimWhite mt-3'>
                    {userdetails?.bio}
                  </div>
                ) : (
                  <div className='hidden'></div>
                )
              }
              <div className='mt-3 font-semibold py-3 sm:gap-4 ss:gap-2 gap-3 sm:text-[20px] ss:text-[17px] text-[14px] flex ms:justify-normal justify-center'>
                <div onClick={() => setshowfollowers(true)} className='flex gap-2 cursor-pointer '>
                  <span>
                    {userdetails?.followers?.length}
                  </span>
                  <span>
                    Followers
                  </span>
                </div>
                <div onClick={() => setshowfollowing(true)} className='flex gap-2 cursor-pointer '>
                  <span>
                    {userdetails?.following?.length}
                  </span>
                  <span>
                    Following
                  </span>
                </div>
                <div className='flex gap-2 cursor-pointer '>
                  <span>
                    {userposts?.length}
                  </span>
                  <span>
                    Posts
                  </span>
                </div>


              </div>
              {!isEdit && (
                <span className='flex  '>
                  {loading===false?(<span onClick={handleclick} className='text-sky-400 cursor-pointer'>
                    {str}
                  </span>):(
                    <LoadingSpinner/>
                  )}
                  
                </span>

              )}


            </div>
            {
              isEdit && (
                <div className='mt-3 ssm:inline-block hidden   min-w-[130px]'>
                  <button onClick={() => setedit(true)} className='flex justify-start items-center'>
                    <span className='h-22 w-18 '>
                      <img className='h-full object-fill w-16' src={editgif} alt="" />
                    </span>
                    {/* <span><FaSquarePlus /> </span> */}
                    <span className='w-full'>Edit Profile</span>

                  </button>

                </div>
              )
            }




          </div>

          {showfollowers && (
            <Popup data={userdetails?.followers} name={"Followers"} setdefault={setshowfollowers} />
          )}
          {showfollowing && (
            <Popup data={userdetails?.following} name={"Following"} setdefault={setshowfollowing} />
          )}
          {edit && (
            <EditProfile userdetails={userdetails} setedit={setedit} />
          )}
          <div className='w-full flex justify-center items-center gap-5 mt-16 h-[60px]'>
            <Switch data={["Posts", "Blogs"]} setshowposts={setshowposts} />

          </div>
          <div className={`w-full mt-5 mb-2 py-3 ms:px-5 px-1 flex justify-center`}>
            <div className={`grid ssm:grid-cols-3 xs:grid-cols-2 grid-cols-1  ms:gap-6 gap-2 ${showposts === true ? "" : "hidden"} `}>
              {userposts.map((post, index) => (
                <Postbox data={post} key={index} />
              ))}
            </div>
            <div className={`grid grid-cols-1 w-full gap-3 ${showposts === false ? "" : "hidden"} `}>
              {userposts.map((post, index) => (
                <Blogbox data={post} key={index} />
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className='h-full w-full '>
          <div className='flex px-32 pt-10 gap-10'>
            <div className='flex justify-center items-center h-[200px] bg-blue-800 w-[200px]'>
            </div>
            <div className='flex gap-1 w-[300px]  flex-col pt-4 '>
              <h3 className='h-[40px] w-[200px]  bg-blue-800'>
              </h3>
              <div className='h-[30px] w-[300px] bg-blue-800 flex gap-2'>

              </div>
              <div className='mt-5 w-full font-semibold py-3 gap-4 bg-blue-800 h-[20px] flex'>



              </div>

              <div className='h-[22px] w-full bg-blue-800 mt-3'>
              </div>





            </div>






          </div>
        </div>
      )}

    </div>
  )
}

export default Profile