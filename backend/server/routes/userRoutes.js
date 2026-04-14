import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const router = express.Router();
import dotenv from 'dotenv'
dotenv.config()

const generateToken= (user)=>{
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'15m'})
}


router.post('/', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.findOne({email:email});

        if(user){
            return res.status(400).json({ status: 400, message: 'User already exists',user: user });
        }
        const hashPassword= await bcrypt.hash(password,10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword,
        })
        const resp = await newUser.save();
       const token= generateToken(resp)
        res.status(200).json({ status: 200, message: 'User created successfully',token:token, user: resp })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating user', error: error.message })
    }
})
router.post('/user', async (req, res) => {
    const {email,password} =req.body

    try {
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({ status: 400, message: 'User does not exist' });
        }
        const isMatchedPassword = await bcrypt.compare(password,user.password);
        if(!isMatchedPassword){
            return res.status(400).json({ status: 400, message: 'Invalid credentials' });
        }
        const token= await generateToken(user)
        res.status(200).json({ status: 200, message: 'Login successful',token:token, user: user })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error logging in', error: error.message })
    }
})
export default router;