const handler = require('express-async-handler');
const generateToken = require('../auth/Tokengenerate');

const Google  = handler ((req,res)=>{
    if(!req.user){
        return res.status(401).json({message: 'Not authorized'});
    }
    generateToken(res,req.user._id);
    res.redirect('http://localhost:5173/');
});
module.exports = {Google}