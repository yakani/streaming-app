const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose= require('mongoose');
const filmSchema= new mongoose.Schema({
	Tittle:{
		type:String,
		required:[true,'Please add a title'],
       
	},
	category:{
        type:String,
        required:[true,'Please add a category'],
    },
  Description:{
		type:String,
        required:[true,'Please add a description'],
		
	},
    subtittle:{
type:String,
default:''},
    path:{
        type:String,
        required:[true,'Please add the file'],
    },
    thumbail:{
        type:String,
        required:[true,'Please add a  photo'],
    }
,
Duration:{
    type:Number,
    required:[true,'Please add a duration'],
},

  createdAt:{
  	type : Date,
  }
},{timestamps:true});
module.exports= mongoose.model('Films',filmSchema);