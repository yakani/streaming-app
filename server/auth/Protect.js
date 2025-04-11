const jwt=require('jsonwebtoken');
const handeller=require('express-async-handler');
const User=require('../models/User.js');
const protect=handeller(async (req, res, next)=>{
let token;
token=req.cookies.jwt;
let refresh = req.cookies.refresh ;
//console.log(token);
try{
	if(req.cookies.refresh)
	{
		const decode = jwt.verify(refresh,process.env.refresh);
		//console.log(decode.id);
		if(token != decode.id){throw new Error('timeout login back');}
		
	}
	if (req.cookies.jwt) {
		const decoded= jwt.verify(token, process.env.jwts);
		req.user= await User.findById(decoded.id);
		next();

}else{
	throw new Error('not authorize no token');
}

}catch(error){
	res.status(401)
	throw new Error(error);

}

})
module.exports= {protect}