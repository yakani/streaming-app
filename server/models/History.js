const mongoose= require('mongoose');
const hisSchema= new mongoose.Schema({
user_id:{
    type:mongoose.Schema.Types.ObjectId,
    unique:false,
},
episode_id:{
    type:String,
    default:"",
},
film_id:{
    type:String,
    default:"",
    
},
Duration:{
type:Number,
required:[true,'duration not present'],
},
  createdAt:{
  	type : Date,
  }
},{timestamps:true});
module.exports= mongoose.model('History',hisSchema);