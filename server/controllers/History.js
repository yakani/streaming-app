const handler = require('express-async-handler');
const History = require('../models/History');
const User = require('../models/User');


const addHistory = handler(async (req, res) => {
    const {  episode_id, film_id, Duration } = req.body;
    if(episode_id !=null){
        const exist = await History.findOne({episode_id:episode_id});

        if(exist && exist.user_id == req.user._id){
            res.status(406);
            throw new Error('already exist');
        }
    }else{
        const exist = await History.findOne({film_id:film_id});
        if(exist && exist.user_id == req.user._id){
            res.status(406);
            throw new Error('already exist');
        }
    }
    
    try {

        const history = await History.create({
            user_id:req.user._id,
            episode_id,
            film_id,
            Duration
        });
        if(history.ok){
             return res.status(201).json(history);
        }
        
    } catch (error) {
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
        const history = await History.deleteMany({ user_id: req.user._id });
        return res.status(200).json({ message: 'History deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
const deleteHistoryOne = handler(async (req, res) => {
 
    try {
        const history = await History.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'History deleted successfully' });
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
{ addHistory, getHistory, deleteHistoryAll, deleteHistoryOne, ReviewHistory }


