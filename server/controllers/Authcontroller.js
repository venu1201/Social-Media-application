import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/Usermodel.js'

export const signin = async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    try {
        //const existinguser1=await User.findOne({email:username});
        const existinguser = await User.findOne({ username });
        if (!existinguser)
            return res.status(404).json({ message: 'User not exits' });
        const ispasswordcorrect = await bcrypt.compare(password, existinguser.password);
        if (!ispasswordcorrect)
            return res.status(400).json({ message: "invalid password" });
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'task', { expiresIn: "1h" });
        // const {password,...data}=existinguser;
        res.status(200).json({ result: existinguser, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}
export const google_auth=async (req,res)=>{
    const { email, username, password, firstname, lastname, bio, confirmpassword, picture } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        if(existinguser)
        {
            const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'task', { expiresIn: "1h" });
            res.status(200).json({result:existinguser,token})
        }
        else
        {
            res.status(200).json({result:null});
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}
export const signup = async (req, res) => {
    const { email, username, password, firstname, lastname, bio, confirmpassword, picture } = req.body;
    try {
        const check = await User.findOne({ username });
        if (check)
            return res.status(400).json({ message: "username already Taken...Try different" });
        const existinguser = await User.findOne({ email });
        if (existinguser)
            return res.status(400).json({ message: "user already exists" });
        if (password != confirmpassword)
            return res.status(400).json({ message: "password and confirm password dont match" });
        const hashedpassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedpassword, username, firstname, lastname, bio: '', profilepicture: picture });
        const token = jwt.sign({ email: result.email, id: result._id }, 'task', { expiresIn: "1h" });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });

    }
}


