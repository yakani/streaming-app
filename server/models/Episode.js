const mongoose= require('mongoose');
const EpisodeSchema= new mongoose.Schema({
	Tittle:{
		type:String,
		required:[true,'Please add a title'],
       
	},
	serie_id:{
        type:String,
    },
    season:{
        type:Number
    },
    subtittle:{
        type:String,
        default:''},
  Description:{
		type:String,
        required:[true,'Please add a description'],
		
	},
    path:{
        type:String,
        required:[true,'Please add the file'],
    },
    thumbail:{
        type:String,
        required:[true,'Please add a  photo'],
    },
Duration:{
type:Number,
required:[true,'duration not present'],
},
  createdAt:{
  	type : Date,
  }
},{timestamps:true});
module.exports= mongoose.model('Episode',EpisodeSchema);