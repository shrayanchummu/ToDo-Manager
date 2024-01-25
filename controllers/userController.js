const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const User=require('../models/userModel')

// @desc Registers Users
// @route POST /api/user/register
// @access PUBLIC
const registerUser=asyncHandler(async(req,res)=>{
    const {phone_number,password,priority}=req.body;
    // console.log("ph is",phone_number);
    // console.log("password is",password);
    // console.log("priority is",priority);
    if(!phone_number||!password||!priority){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({phone_number})
    if(userAvailable){
        res.status(400);
        throw new Error("User already Registered");
    }
    const hashedPassword= await bcrypt.hash(password,10);
    // console.log("password:",password);
    // console.log("hashedPassword:",hashedPassword);

    const newUser= await User.create({
        phone_number,
        password:hashedPassword,
        // priority
    });
    console.log("New user created SUCCESSFULLY ");
    if(newUser){
        res.status(201).send({_id:newUser._id,phone_number:newUser.phone_number});
    }
    else{
        res.status(400);
        throw new Error("User data is INVALID")
    }
});

// @desc Login User Info
// @route POST /api/user/login
// @access PUBLIC
const loginUser=asyncHandler(async(req,res)=>{
    const {phone_number,password}=req.body;
    if(!phone_number||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({phone_number})
    if(userAvailable && (await bcrypt.compare(password,userAvailable.password))){
        const accessToken=jwt.sign({
            user:{
                phone_number:userAvailable.phone_number,
                _id:userAvailable._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"45m"}
        );
        res.status(200).send({accessToken});
    }
    else{
        res.status(401);
        throw new Error("PhoneNumber/Password is invalid");
    }
});

// @desc Gets Current User
// @route GET /api/user/register
// @access PRIVATE
const currentUser=asyncHandler(async(req,res)=>{
    res.status(200).send(req.user);
});

module.exports={
    registerUser,
    loginUser,
    currentUser
}