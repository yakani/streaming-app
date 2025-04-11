const generatetoken = require('../auth/Tokengenerate.js');
const User = require('../models/User.js');
const asynchandeler = require('express-async-handler');
const {SendCOnfirmation, SendWelcome} = require('./email.js');
 const handler = (res,msg,status)=>{
    res.status(status)
    throw new Error(msg);
 }

 const Insert = asynchandeler( async (req,res)=>{
    const { name , email} = req.body;
    const exist = await User.findOne({email:email});
    if(exist){
         handler(res,"change email", 406);
    }
    const user = await User.create({ name , email });
    if(!user){
        handler(res,"invalid data", 404);
    }
    generatetoken(res,user._id);
    SendWelcome(user);
    res.status(200).json({msg:" user insert"})
 });

 const AdminLogin=asynchandeler( async (req,res)=>{
   const {  email } = req.body;
   const user = await User.findOne({email:email});
   if(!user){
       handler(res,"not found", 404);
   }
   if(!user.isadmin){
      handler(res,"not authorized", 401);
   }else{
generatetoken(res,user._id);
   res.status(200).json({msg:" admin login"});
   }
   
});

 const Signin = asynchandeler( async (req,res)=>{
   const {  email } = req.body;
   const user = await User.findOne({email:email});
   if(!user){
       handler(res,"not found", 404);
   }
   generatetoken(res,user._id);
   res.status(200).json({msg:" user login"})
});
 const Get = asynchandeler( async (req,res)=>{
   
   if(!req.user){
      handler(res,"invalid data", 404);
  }
  res.status(200).json({name:req.user.name,
   email:req.user.email
  });
 });
 const Updateuser = asynchandeler(
   async (req,res)=>{
      const {name , email } = req.body;
      const user = await User.findById(req.user._id);
      if(!user){
         handler(res,"user not found", 404);
     }
     let rand = [];
     if(req.body.list  !=null  &&  !user.List.includes(req.body.List)){
            rand.push(req.body.List);
     }
   rand = rand.concat(user.List); 
     user.name = name == null ? user.name : name;
     user.List = rand;
     await user.save();
   console.log(rand);
     res.status(200).json({msg:"update"})
   }
 )
 const Delete = asynchandeler( async(req,res)=>{
   const user = await User.findByIdAndDelete(req.user._id);
   if(!user){
      handler(res,"user not found ",404);
   }
   res.status(200).json({msg:" delete"});
 });
 const Sendcode = asynchandeler( async (req,res)=>{

      const {name , email} = req.body;
      if(!name || !email){
         handler(res,"filled all the boxes", 404);
      }
      let num = Math.floor(Math.random()*1000);
      for(let i=0;i<4;i++){
         num+=Math.floor(Math.random()*10);
      }
      const user ={
         name,
         email,
         code:num
      };
      SendCOnfirmation(user);
      res.status(200).json({num});
 });
 const InsertAdmin =asynchandeler( async (req,res)=>{
   const { name , email} = req.body;
   const exist = await User.findOne({email:email});
   if(exist){
        handler(res,"change email", 406);
   }
   const user = await User.create({ name , email ,isadmin:true});
   if(!user){
       handler(res,"invalid data", 404);
   }
   generatetoken(res,user._id);
   res.status(200).json({msg:" admin insert"})
});

const Authenticate = asynchandeler(async(req,res)=>{
   if(!req.user){
      handler(res,"not authorized",404);
   }
   res.status(200).json({message:"ok"});
})
 module.exports= {
    Insert,
    Get,
    Delete,
    Updateuser,
    Signin,
    AdminLogin,
    Sendcode,
    InsertAdmin,
    Authenticate
 }