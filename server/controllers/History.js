const handler = require('express-async-handler');
const History = require('../models/History');
const User = require('../models/User');




const getHistory = handler(async (req, res) => {
    

    try {
        const history = await History.find({ user_id:req.user._id });
        return res.status(200).json(history);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
const deleteHistoryAll = handler(async (req, res) => {
    const { user_id } = req.body;
    try {
        const history = await History.deleteOne({ user_id: req.user._id });
        return res.status(200).json({ message: 'History deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
const UpdateOne = handler(async (req, res) => {
    const { episode_id, film_id, Duration } = req.body;
    let exist = await History.findOne({ user_id: req.user._id });
    if(!exist){
        exist = await History.create({user_id:req.user._id});
    }
   
    if(episode_id){
        let episode = exist.episode_id.find((ep)=>ep.id==episode_id);
        if(episode){
            return res.status(406).json({message:'already exist'});
        }
        
    }else{
        let film = exist.film_id.find((ep)=>ep.id==film_id);
        if(film){
            return res.status(406).json({message:'already exist'});
        }
    }
    try {
        if(episode_id){
            exist.episode_id.push({id :episode_id,Duration});
        }else{
            exist.film_id.push({ id : film_id,Duration});
        }
         await exist.save();
         const all  =await History.find({ user_id:req.user._id }).populate({path:'episode_id.id',model:'Episode'}).populate({path:'film_id.id',model:'Film'});
        return res.status(200).json(all);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
const ReviewHistory = handler(async (req,res)=>{
try {
     const resp = await History.findOneAndDelete({createdAt:req.body.createdAt});
    if(resp){
        return res.status(200).json({message:'History deleted successfully'});
    }
} catch (error) {
return res.status(400).json({message:error.message});
    
}
   
});
module.exports = 
{  getHistory, deleteHistoryAll, UpdateOne, ReviewHistory }


