import PostModel from "../models/Postmodel.js";
import User from '../models/Usermodel.js'


export const getPostbyId=async(req,res)=>{
  const {id}=req.params;
  try {
    const post=await PostModel.findById(id);
    if(post)
    {
      const user=await User.findOne({username:post.username});
      const currentCreatedAt = new Date(post.createdAt);
      const day=24*60*60*1000;
      const relatedposts=await PostModel.find({
        _id:{$ne:post._id},
        username:{$ne:post.username},
        createdAt:{
          $gte:new Date(currentCreatedAt.getTime()-day),
          $lt: new Date(currentCreatedAt.getTime()+day),
        },
      }).sort({createdAt:-1}).limit(9).exec();
      res.status(200).json({result:post,user:user,relatedposts:relatedposts});
    }
    else
    res.status(404).json({message:"Post not Found"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });

  }
}
export const likeandcomment = async (req, res) => {
  const { like, comment } = req.body;
  const { id } = req.params;
  // console.log(like,comment,id);
  try {
    const post = await PostModel.findById(id);
    const userInfo=await User.findOne({username:post.username});
    if (post) {
      if(comment!==undefined)
      {
        if ( comment.message.length > 0) {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();
          post.Comments = [
            ...post.Comments,
            {
              username: comment.user.username,
              profilepicture: comment.user.profilepicture,
              comment: comment.message,
              createdAt: formattedDate, // Add the formatted date
            },
          ];
          if(post.username!==comment.user.username)
          userInfo.Notifications=[...userInfo.Notifications,{username:comment.user.username,postId:id,seen:false,message:`has Commented on this Post , Do Check Out `}]
        }
      }
      

      if (like) {
        if (post.likeCount.includes(comment.user.username)) {
          const likesArray = post.likeCount.filter(
            (user) => user !== comment.user.username
          );
          post.likeCount = likesArray;
        } else {
          post.likeCount = [...post.likeCount, comment.user.username];
          if(post.username!==comment.user.username)
          userInfo.Notifications=[...userInfo.Notifications,{username:comment.user.username,postId:id,seen:false,message:` Liked the Post , Do Check Out `}]

        }
      }
      await User.updateOne({username:post.username},{Notifications:userInfo.Notifications});

      await PostModel.updateOne({ _id: id }, post);
      const post1 = await PostModel.findById(id);
      res.status(200).json({ result: post1 });
    } else {
      res.status(404).json({ message: "Post not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const CreatePost=async(req,res)=>{
  const {selectedfile,username,description,Tags}=req.body;
  console.log(Tags);
  try {
    if(selectedfile===null)
      return res.status(401).json({message:"no uploaded picture"});
    const post=await PostModel.create({selectedfile:[selectedfile],username,description,tags:Tags});
    res.status(200).json({message:"Successfully Upload your Post"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const DeletePost=async(req,res)=>{
  const {id}=req.params;
  console.log(id);
  try {
      const post=await PostModel.findByIdAndDelete(id);
      if(!post)
      {
        res.status(404).json({message:"post not found"});
      }
      res.status(200).json({message:"Post Deleted Successfully"});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });

  }
}
export const getTopPosts = async (req, res) => {
  try {
    const topPosts = await PostModel.aggregate([
      { $sort: { likeCount: -1 } },
      { $limit: 5 }, 
    ]);
    res.status(200).json({ topPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export async function getPopularPosts(req, res) {

  try {
    const topPosts = await PostModel.aggregate([
      {
        $match: {
          $and: [
            { likeCount: { $type: "array" } },
            { Comments: { $type: "array" } }
          ]
        }
      },
      {
        $addFields: {
          totalInteractions: {
            $size: {
              $concatArrays: ["$likeCount", "$Comments"]
            }
          }
        }
      },
      { $sort: { totalInteractions: -1 } },
      { $limit: 20 },
    ]);
    res.status(200).json({result: topPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}
export const getPostsByQuery = async (req, res) => {
  const { query } = req.params; // assuming you're sending the query as a URL parameter

  try {
    const posts = await PostModel.find({
      $or: [
        { description: { $regex: query, $options: 'i' } },
        { tags: { $elemMatch: { $regex: query, $options: 'i' } } },
        { username: { $regex: query, $options: 'i' } },
        { "Comments.comment": { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};










export const getPosts = async (req, res) => {
  const { page = 0 } = req.query;
  const { user } = req.query;

  try {
    const pageSize = 10;
    const skip = page * pageSize;

    const followingUsernames = await User.findOne({ username: user }).select('following').lean();
    const list=followingUsernames?.following || [];
    const followingList = [...list,user];

    // Retrieve posts from users in the following list
    const posts = await PostModel.find({ username: { $in: followingList } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    // Fetch user information for each post
    const postsWithUserInfo = await Promise.all(
      posts.map(async (post) => {
        const userInfo = await User.findOne({ username: post.username }).select(
          'profilepicture username firstname lastname savedposts'
        );
        return { ...post.toObject(), userInfo };
      })
    );

    const totalPosts = await PostModel.countDocuments({ username: { $in: followingList } });
    const nextPage = totalPosts > skip + pageSize;
      // console.log(postsWithUserInfo)
    res.status(200).json({
      posts: postsWithUserInfo,
      nextPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const getTrendingTags = async (req, res) => {
  try {
    const pipeline = [
      {
        $unwind: '$tags', // Split the tags array into separate documents
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }, // Count occurrences of each tag
        },
      },
      {
        $sort: { count: -1 }, // Sort by count in descending order
      },
      {
        $limit: 10, // Limit the result to the top 10 tags
      },
    ];

    const trendingTags = await PostModel.aggregate(pipeline);

    res.status(200).json({result: trendingTags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// export const getPostById = async (req,res)=>{
//   try {
//     const {id}=req.params;
//     console.log(id);
//   } catch (error) {
//     console.log(error);
//   }
// }



  

  
 
      
  
        
    
