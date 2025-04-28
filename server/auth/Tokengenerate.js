const jwt= require('jsonwebtoken');

const generatetoken=(res,id)=>{
	const token= jwt.sign({id}, process.env.jwts,{
		expiresIn:"7d",

	});
    const refreshtoken = jwt.sign( {id:token} ,process.env.refresh,{
        expiresIn:"7d"
    });
    res.cookie('jwt',token,{
        secure:true,
        sameSite:'none',
        maxAge:24*1000*3600,
        
    })
    res.cookie('refresh',refreshtoken,{
        secure:true,
        sameSite:'none',
        maxAge:30*24*1000*3600,
    })
    
}
module.exports=generatetoken;