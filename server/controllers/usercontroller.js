import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/Usermodel.js'
import PostModel from "../models/Postmodel.js";


export const getuserbyId=async(req,res)=>{
    const username=req.params.id;

    try {
        const user=await User.findOne({username});
        if(!user)
        {
            res.status(404).json({message:"User not Found"});
        }
        res.status(200).json({result:user});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const getProfileData=async(req,res)=>{
    const username=req.params.id;
    console.log("profiledata",username)
    try {
        const user=await User.findOne({username});
        if(!user)
        {
            res.status(404).json({message:"User not Found"});
        }
        const result = await PostModel.find({username:username}).sort({createdAt:-1});
        const result2=await (await PostModel.find({_id:{$in:user.savedposts}}))
        res.status(200).json({result:user,posts:result,saved:result2});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }
}
export const getNetwork=async(req,res)=>{
    const params=req.params;
    console.log(params);
    try {
        const user=await User.findOne({username:params.user});
        if(user)
        {
            if(params.type==="Followers")
            {
                const followers=await User.find({username:{$in:user.followers}});
                res.status(200).json({result:followers});
            }
            else
            {
                const following = await User.find({username:{$in:user.following}});
                res.status(200).json({result:following});
            }
        }
        else
        res.status(404).json({message:"User not Found"});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }
}
export const removeNetwork=async(req,res)=>{
    const params=req.params;
    console.log(params);
    try {
        const user=await User.findOne({username:params.user});
        const touser=await User.findOne({username:params.touser});
        if(params.type==="Followers")
        {
            const userupdatedfollowers=user.followers.filter(
                (follower)=>follower!==params.touser
            );
            const touserupdatedfollowing=touser.following.filter(
                (follower)=>follower!==params.user
            );
            await User.updateOne({username:params.user},{followers:userupdatedfollowers});
            await User.updateOne({username:params.touser},{following:touserupdatedfollowing});
            res.status(200).json({message:"Successfully Removed"})
        }
        else
        {
            const userupdatedfollowing=user.following.filter(
                (follower)=>follower!==params.touser
            );
            const touserupdatedfollowers=touser.followers.filter(
                (follower)=>follower!==params.user
            );
            await User.updateOne({username:params.user},{following:userupdatedfollowing});
            await User.updateOne({username:params.touser},{following:touserupdatedfollowers});
            res.status(200).json({message:"Successfully Unfollowed"});
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }
}
export const addNetwork=async(req,res)=>{
    const params=req.params;
    try {
        const user=await User.findOne({username:params.user});
        const touser=await User.findOne({username:params.touser});
        if(user.following.includes(touser.username))
        {
            const userupdatedfollowing=user.following.filter(
                (follower)=>follower!==params.touser
            );
            const touserupdatedfollowers=touser.followers.filter(
                (follower)=>follower!==params.user
            );
            await User.updateOne({username:params.user},{following:userupdatedfollowing});
            await User.updateOne({username:params.touser},{followers:touserupdatedfollowers});
            user.following=userupdatedfollowing;
            touser.followers=touserupdatedfollowers;
            
            res.status(200).json({result:user,touser:touser});
        }
        else
        {
            const userupdatedfollowing=[...user.following,params.touser];
            const touserupdatedfollowers=[...touser.followers,params.user];
            touser.Notifications=[...touser.Notifications,{username:user.username,seen:false,postId:null,message:'started following you , Checkout if you know him'}]
            await User.updateOne({username:params.user},{following:userupdatedfollowing});
            await User.updateOne({username:params.touser},{followers:touserupdatedfollowers,Notifications:touser.Notifications});
            user.following=userupdatedfollowing;
            touser.followers=touserupdatedfollowers;
           
            res.status(200).json({result:user,touser:touser});

        }        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }
}
export const updateUser=async(req,res)=>{
    const user=req.body;
    try {
        const result=await User.updateOne({username:user.username},user)
        // if(result.nModified===0)
        // {
        //     return res.status(404).json({message:"User not Found"});
        // }
        return res.status(200).json({result:user});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const SavePost=async(req,res)=>{
    const {user,id}=req.params;
    try {
        const user2=await User.findOne({username:user});
        const post=await PostModel.findById(id);
        const postuser=await User.findOne({username:post.username});
        if(user2)
        {
            if(user2?.savedposts?.includes(id))
            {
                const save=user2.savedposts.filter((item)=>item!==id);
                await User.updateOne({username:user},{savedposts:save});
            }
            else
            {
                const save=[...user2.savedposts,id];
                if(postuser.username!==user2.username)
                {
                    postuser.Notifications=[...postuser.Notifications,{username:user2.username,postId:id,seen:false,message:`has saved your Post `}]

                }
                await User.updateOne({username:user},{savedposts:save});
                if(postuser.username!==user2.username)
                await User.updateOne({username:postuser.username},{Notifications:postuser.Notifications});
            }
        }
        const user1=await User.findOne({username:user});
        res.status(200).json({result:user1});

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }
}




export const getusers = async (req, res) => {
    const username  = req.body.username;
    try {
        const users = await User.find();
        const filteredUsers = users.filter(user => user.username !== username);
        //console.log(username)
        const usersarray=[];
        filteredUsers.map((user)=>{
            usersarray.push(user.username)
        })
        res.status(200).json({ result: filteredUsers,result1:usersarray });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const getTopCreators = async (req, res) => {
    try {
        // Fetch users from the database and calculate the score for each user
        const topCreators = await User.aggregate([
          {
            $lookup: {
              from: 'postmodels', // Assuming your PostModel collection is named 'postmodels'
              localField: 'username',
              foreignField: 'username',
              as: 'posts',
            },
          },
          {
            $project: {
              _id: 1,
              username: 1,
              profilepicture:1,
              email: 1,
              id: 1,
              firstname: 1,
              lastname: 1,
              followers: { $size: '$followers' },
              following: { $size: '$following' },
              profilepicture: 1,
              posts: { $size: '$posts' },
            },
          },
          {
            $addFields: {
              totalScore: {
                $add: ['$followers', '$following', '$posts'],
              },
            },
          },
          {
            $sort: { totalScore: -1 },
          },
          {
            $limit: 20,
          },
        ]);
        // Send the response with the top 20 creators in the form of User schema
        res.status(200).json({result:topCreators});
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
}
export const getNetworkByQuery = async (req, res) => {
    const { query } = req.params; // assuming you're sending the query as a URL parameter
  
    try {
        const people = await User.find({
            $or: [
              { bio: { $regex: query, $options: 'i' } },
              { username: { $regex: query, $options: 'i' } },
              { firstname: { $regex: query, $options: 'i' } },
              { lastname: { $regex: query, $options: 'i' } },
              { email: { $regex: query, $options: 'i' } },
            ]
          });
  
      res.status(200).json({result:people});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const UpdateNotifications = async (req, res) => {
    const { user } = req.params;
    try {
        await User.updateOne(
            { username: user },
            { $set: { "Notifications.$[elem].seen": true } },
            { arrayFilters: [{ "elem.seen": false }], multi: true }
        );
        const result=await User.findOne({username:user});
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


  








        
