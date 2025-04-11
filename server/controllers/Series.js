const handler = require('express-async-handler');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const Serie = require('../models/Serie');
const addSeries = handler(async (req, res) => {
    if(!req.user.isadmin){
        return res.status(401).json({message:'Unauthorized access'});
    }
    const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('multipart/form-data')) {
    return res.status(415).json({ error: 'Unsupported Media Type' });
  }

  
    const uploadDir = path.join(__dirname, '../', '../client/public/uploads');
           const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif','.mp4','.mk','webm','.mov','.avi','.flv','.wmv','v'];
              let percent;
           let photoPath;
           if (!fs.existsSync(uploadDir)) {
               fs.mkdirSync(uploadDir);}
           const form = new formidable.IncomingForm();
           form.uploadDir = uploadDir; // Directory to save uploaded files
           form.keepExtensions = true;
           form.maxFileSize = 2* 1024 * 1024;
           form.multiples = true;
           form.on('progress', (bytesReceived, bytesExpected) => {
               percent = ((bytesReceived / bytesExpected) * 100).toFixed(2);
               console.log(`Upload progress: ${percent}%`);
           });
         
         
            form.parse(req, async (err, fields, files) => {
               if (err) {
                    console.log(err);
                   return res.status(500).json({ error: err.message });
   
               }
               if(!files || !fields){
                   return res.status(400).json({ error: 'All fields are required' });
               }
               const size = {
                   file: files,
               }
           
              
               const photo = size.file.thumbail[0]; // Assuming the photo field name is "photo"
               // Assuming the video field name is "video"
       
               // Check if files were uploade
               if (!photo ) {
                   return res.status(400).json({ error: 'Both photo and video are required' });
               }
            photoPath = path.join(uploadDir, photo.originalFilename);
           
               try {
                    fs.promises.rename(photo.filepath, photoPath);
                  
               } catch (error) {
                   console.error('Error moving file:', error);
                   return res.status(500).json({ err: error });
                   
               }
              
               if ( !allowedExtensions.includes(path.extname(photoPath).toLowerCase())) {
                   fs.unlinkSync(photoPath);
                   return res.status(400).json({ error: 'Invalid  extension' });
               }
   
               const check = await Serie.findOne({path:photoPath});  
               if(check){
                   fs.unlinkSync(photoPath); 
                   return res.status(400).json({ error: 'Film already exist' });
                }
    
       const Tittle = fields['tittle'] && fields['tittle'][0] != ""  ? fields['tittle'][0] : null; // Note the extra space in 'tittle '
       const category = fields.category  && fields.category[0] != ""? fields.category[0] : null;
       const Description = fields.description && fields.description[0] != ""  ? fields.description[0] : null;
       const season = fields.season && fields.season[0] != null  ? fields.season[0] : null;
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
           thumbail:"/uploads/"+photo.originalFilename,
       };
       
      
      try {
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