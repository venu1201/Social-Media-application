import mongoose from "mongoose";

const NotificationsSchema=mongoose.Schema({
    username:String,
    postId:String,
    message:String,
    seen:Boolean,
  });
const userSchema = mongoose.Schema({
    username:{type:String ,require:true},
    email:{type:String ,require:true},
    password:{type:String ,require:true},
    id:{type:String},
    firstname:{type:String},
    lastname:{type:String},
    bio:{type:String},
    followers:[],
    following:[],
    profilepicture:String,
    pending:[],
    savedposts:[],
    Notifications:[NotificationsSchema],
    private: { type: Boolean, default: false } 
    

})
export default mongoose.model("User",userSchema);
