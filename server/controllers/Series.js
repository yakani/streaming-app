const handler = require('express-async-handler');
const cloudinary = require('../midleware/cloud.js');
const upload = require('../midleware/multer.js');
const Serie = require('../models/Serie');
const addSeries = handler(async (req, res) => {
    try {
    if(!req.user.isadmin){
        return res.status(401).json({message:'Unauthorized access'});
    }
    const file = req.files.file ? req.files.file[0] : null;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Extract form data
      const { Tittle, category, season } = req.body;
  
      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
            folder: 'uploads'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
  
        uploadStream.end(file.buffer);
      });
    
      
       if(Tittle == null || Description == null || category == null || season == null){
           fs.unlinkSync(photoPath); 
           console.log("fielld all",Tittle);
           return res.status(400).json({ error: 'All fields are required' });
       }
       console.log(Tittle);
       const filmdata = {
           Tittle,
           Description,
           category,
           season,
           thumbail:result.secure_url,
       };
         const film = await Serie.create(filmdata);
         if(film){
          return res.status(201).json({
                 message: 'Film uploaded successfully',
                 field:fields,
                 data: film
             });
         }
             
       } catch (error) {
           console.error('Error moving file:', error);
           return res.status(500).json({ err: error });
         
       }
   
});
const getSeries = handler(async (req, res) => {
   try {
    const goal = await Serie.find({});
    if(goal){
        return res.status(200).json(goal);
    }
   } catch (error) {
    return res.status(500).json({ message: error.message });
   }
});
const deleteSeries = handler(async (req, res) => {
    if(!req.user.isadmin){
        return res.status(401).json({message:'Unauthorized access'});
    }
    try {
        const goal = await Serie.findByIdAndDelete(req.params.id);
        if(goal){
            return res.status(200).json({ message: 'Film deleted successfully' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
const getOneserie = handler(async(req,res)=>{

    try {
        const goal = await Serie.findById(req.params.id);
        if(goal){
            return res.status(200).json(goal);}
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
const getOneserieByname = handler(async(req,res)=>{
    
    try {
        const goal = await Serie.findOne({Tittle: req.params.id});
        if(goal){
            return res.status(200).json(goal);
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

const updateSerie = handler(async (req,res)=>{
    if(!req.user.isadmin){
        return res.status(401).json({message:'Unauthorized access'});
    }
try {

    const goal = await Serie.findById(req.params.id);
    if(goal){
        goal.Tittle = req.body.Tittle || goal.Tittle;
        goal.Description = req.body.Description || goal.Description;
        goal.category = req.body.category || goal.category;
        goal.season = req.body.season || goal.season;
        goal.thumbail = req.body.thumbail || goal.thumbail;
        const updated = await goal.save();
        if(updated){
            return res.status(200).json({ message: 'Film updated successfully' });
    }}
} catch (error) {
    return res.status(400).json({ message: error.message });
    
}

});
module.exports = { addSeries, getSeries, deleteSeries,updateSerie,getOneserie,
    getOneserieByname }