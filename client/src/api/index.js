import axios from 'axios';


const API = axios.create({baseURL:'https://server-3v26ix77m-venu1201.vercel.app'});
const NewsAPI = axios.create({baseURL:'https://newsapi.org/v2'});
// const BASE_URL=  `http://localhost:5000`;
export const getselfdata=(username)=> API.get(`/user/${username}`);
export const getuserbyid=(username)=> API.get(`/user/${username}`);


const BASE_URL=  `http://localhost:5000`;
export const signin=(formdata)=> API.post('/user/signin',formdata);
export const signup=(formdata)=> API.post('/user/signup',formdata);
export const getusers=(username)=> API.post('/user/users',{username:username});
export const getgoogleuser=(email)=> API.get(`/user/googleverify/${email}`);
export const getuserdetails=(username)=>API.get(`/user/details/${username}`);
export const getallpendingusers=(pending)=>API.post(`/user/getallpendingusers`,pending);
export const acceptanddeleteuser=(obj,username)=>API.post(`/user/acceptance/${username}`,obj);
export const updateuserdetails=(editdata,username)=>API.post(`/user/updateuserdetails/${username}`,editdata);
export const removeascompletefriend=(username,touser)=>API.post(`/user/removeascomepletefriend/${username}`,touser);
export const removeasfollower=(username,touser)=>API.post(`/user/removeasfollower/${username}`,touser);
export const removeasfollowing=(username,touser)=>API.post(`/user/removeasfollowing/${username}`,touser);
export const remove=(type,username,touser)=>API.post(`/user/remove/${type}/${username}`,touser);
// export const fetchDataFromApi = async (url, params) => {
//     try {
//         const { data } = await axios.get(BASE_URL + url,params);
//         return data;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };
export const getposts =()=>API.get('/posts');
export const createpost = (post)=>API.post('/posts/createpost',post);
export const getpostsbyusername=(username)=> API.get(`/posts/byusername/${username}`)  
export const likepost=(username,id)=> API.post(`/posts/likepost/${id}`,username);
export const getpostdetails= (id)=>API.get(`/posts/getpostdetails/${id}`);

// following

export const requesting = (username,user)=> API.post(`/user/request/${username}`,user)


//news api

// https://newsapi.org/v2/top-headlines?country=in&apiKey=aef6d7fa2a974eeab90111c226b94ecb

