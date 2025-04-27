const mongoose= require('mongoose');
const hisSchema= new mongoose.Schema({
user_id:{
    type:mongoose.Schema.Types.ObjectId,
    unique:true,
},
episode_id:[{
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Episode',
    },
 
    Duration:{
        type:Number,
        }
}],
film_id:  [{
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Film',
    },
 
    Duration:{
        type:Number,
        }
}],

  createdAt:{
  	type : Date,
  }
},{timestamps:true});
module.exports= mongoose.model('History',hisSchema);