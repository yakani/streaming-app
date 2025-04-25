const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Please add a name'],
        unique:true
	},
	
  email:{
		type:String,
		required:[true,'Please add  an email'],
		unique:true
	},
    isadmin:{
        type:Boolean,
        default:false
    },
    List:[
        {
            type:String,
        }
    ],

	googleId:{
		type:String
	},
    avatar:{
        type:String,
        default:"/avatar.png"
    },

  createdAt:{
  	type : Date,
  default: Date.now
  }
},{timestamps:true});
module.exports= mongoose.model('Client',userSchema);