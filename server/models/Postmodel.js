import mongoose from 'mongoose';

const commentSchema=mongoose.Schema({
  username:String,
  profilepicture:String,
  comment:String,
  createdAt:String,
});
const postSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    username: String,
    tags: [String],
    selectedfile: [String], // Store an array of compressed image data as a binary buffer
    likeCount:[String],
    Comments: [
      commentSchema
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model('PostModel', postSchema);

export default PostModel;
