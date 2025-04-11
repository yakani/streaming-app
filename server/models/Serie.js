const mongoose= require('mongoose');
const serieSchema= new mongoose.Schema({
	Tittle:{
		type:String,
		required:[true,'Please add a title'],
       
	},

	
  Description:{
		type:String,
        required:[true,'Please add a description'],
		
	},
    category:{
		type:String,
        required:[true,'Please add a description'],
		
	},
    thumbail:{
        type:String,
        required:[true,'Please add a  photo'],
    }
,season:{
    type:Number,
},


  createdAt:{
  	type : Date,
  }
},{timestamps:true});
module.exports= mongoose.model('Series',serieSchema);