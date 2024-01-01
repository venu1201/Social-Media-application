import axios from 'axios';


// const API = axios.create({baseURL:'https://server-3v26ix77m-venu1201.vercel.app'});
const API = axios.create({baseURL:'http://localhost:5000'});
const headers={Authorization:`Bearer`}
const NewsAPI = axios.create({baseURL:'https://newsapi.org/v2'});
// const BASE_URL=  `http://localhost:5000`;
export const getselfdata=(username)=> API.get(`/user/${username}`);
export const getuserbyid=(username)=> API.get(`/user/${username}`);


const BASE_URL=  `http://localhost:5000`;

export const signin=(formdata)=> API.post('/auth/signin',formdata);
export const signup=(formdata)=> API.post('/auth/signup',formdata);
export const google_auth= (formdata)=>API.post('/auth/googleauth',formdata)


export const getuserbyId=(username)=>API.get(`/user/${username}`);
export const getProfileData=(username)=>API.get(`/user/Profile/${username}`);
export const getNetwork=(params)=>API.get(`/user/Network/${params.user}/${params.type}`);
export const removeNetwork=(params)=>API.post(`/user/Network/${params.type}/${params.user}/${params.touser}`);
export const addNetwork=(params)=>API.post(`/user/Network/${params.user}/${params.touser}`);
export const updateUser=(formdata)=>API.post(`/user/update`,formdata);
export const getTopCreators=()=>API.get(`/user/TopCreators/byFormula`);
export const getNetworkByQuery=(query)=>API.get(`/user/NetworkbyQuery/${query}`);
export const SavePost=(user,id)=>API.post(`/user/SavePost/${user}/${id}`);
export const UpdateNotifications=(user)=>API.post(`/user/UpdateNotifications/${user}`);


export const getPostbyId=(id)=>API.get(`/posts/${id}`);
export const likeandcomment=(form,id)=>API.post(`/posts/${id}`,form);
export const createpost=(formdata)=>API.post(`/posts/upload/createpost`,formdata);
export const DeletePost=(id)=>API.delete(`/posts/${id}`);
export const TopPosts=()=>API.get(`/posts/TopPosts/PostsbyLikes`);
export const getPopularPosts=()=>API.get(`/posts/TopPosts/PostsbyPopular`);
export const getPostsByQuery=(query)=>API.get(`/posts/PostsbyQuery/${query}`);
export const getposts = (page, user) => API.get(`/posts?page=${page}&user=${user}`);
export const getTrendingTags=()=>API.get(`/posts/TopPosts/TrendingTags`);



export const getusers=(username)=> API.post('/user/users',{username:username},{headers});
export const getgoogleuser=(email)=> API.get(`/user/googleverify/${email}`,{headers});
export const getuserdetails=(username)=>API.get(`/user/details/${username}`,{headers});
export const getallpendingusers=(pending)=>API.post(`/user/getallpendingusers`,pending,{headers});
export const acceptanddeleteuser=(obj,username)=>API.post(`/user/acceptance/${username}`,{headers},obj);
export const updateuserdetails=(editdata,username)=>API.post(`/user/updateuserdetails/${username}`,{headers},editdata);
export const removeascompletefriend=(username,touser)=>API.post(`/user/removeascomepletefriend/${username}`,{headers},touser);
export const removeasfollower=(username,touser)=>API.post(`/user/removeasfollower/${username}`,{headers},touser);
export const removeasfollowing=(username,touser)=>API.post(`/user/removeasfollowing/${username}`,{headers},touser);
export const remove=(type,username,touser)=>API.post(`/user/remove/${type}/${username}`,{headers},touser);
// export const fetchDataFromApi = async (url, params) => {
//     try {
//         const { data } = await axios.get(BASE_URL + url,params);
//         return data;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };

// following



//news api

// https://newsapi.org/v2/top-headlines?country=in&apiKey=aef6d7fa2a974eeab90111c226b94ecb

