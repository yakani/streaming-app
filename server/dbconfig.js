const mongoose= require('mongoose');
const connetedDB= async () =>{
try{
const conn=await mongoose.connect(process.env.CONN);

  console.log('mongodb connected');
}catch(error){
  console.error(error);
  process.exit(1);
}
}

module.exports=connetedDB;