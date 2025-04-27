const handler = require('express-async-handler');
const History = require('../models/History');
const User = require('../models/User');


const addHistory = handler(async (req, res) => {
    const {  episode_id, film_id, Duration } = req.body;
    const exist = await History.findOne({ user_id: req.user._id });
    let data;
    if(exist){
        return res.status(406).json({message:'already exist'});
    }
  if(episode_id){
        data = {
            user_id: req.user._id,
            episode_id,
            Duration
        };
  }else{
        data = {
            user_id: req.user._id,
            film_id,
            Duration
        };
  }
    if(!episode_id && !film_id){
        return res.status(406).json({message:'episode or film id not present'});
    }
    if(!Duration){
        return res.status(406).json({message:'duration not present'});
  }
    try {

        const history = await History.create(data);
        if(history.ok){
             return res.status(201).json(history);
        }
        
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
        
    }
   

});

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
        let episode = exist.episode_id.find((ep)=>ep==episode_id);
        if(episode){
            return res.status(406).json({message:'already exist'});
        }
        
    }else{
        let film = exist.film_id.find((ep)=>ep==film_id);
        if(film){
            return res.status(406).json({message:'already exist'});
        }
    }
    try {
        if(episode_id){
            exist.episode_id.push({episode_id,Duration});
        }else{
            exist.film_id.push({film_id,Duration});
        }
         await exist.save();
        return res.status(200).json(exist);
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
{ addHistory, getHistory, deleteHistoryAll, UpdateOne, ReviewHistory }


