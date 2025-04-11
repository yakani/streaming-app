const asynchandeler = require('express-async-handler');
const Film = require('../models/Films.js');
const formidable = require('formidable');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

 let percent;
 
 const Insert = asynchandeler(
    async (req,res)=>{
        if(!req.user.isadmin){
            return res.status(401).json({message:'Unauthorized access'});
        }
       // let thumbail,duration,path ,title, description,category;
        const uploadDir = path.join(__dirname, '../', '../client/public/uploads');
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif','.mp4','.mk','webm','.mov','.avi','.flv','.wmv','v'];
        let duration;
        let videoPath;
        let photoPath;
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);}
        const form = new formidable.IncomingForm({

            uploadDir: uploadDir,
            keepExtensions: true,
            maxFileSize: 2*1024*1024*1024,
            multiples: true,
        }
        );
        
        form.on('progress', (bytesReceived, bytesExpected) => {
            percent = ((bytesReceived / bytesExpected) * 100).toFixed(2);
            console.log(`Upload progress: ${percent}%`);
        });
      
      
         form.parse(req, async (err, fields, files) => {
            if (err) {
        
                return res.status(500).json({ error: err.message });

            }
            if(!files || !fields){
                return res.status(400).json({ error: 'All fields are required' });
            }
            const size = {
                file: files,
            }
        
           
            const photo = size.file.thumbail[0]; // Assuming the photo field name is "photo"
            const video = size.file.film[0]; // Assuming the video field name is "video"
    
            // Check if files were uploade
            if (!photo || !video) {
                return res.status(400).json({ error: 'Both photo and video are required' });
            }
         photoPath = path.join(uploadDir, photo.originalFilename);
        videoPath = path.join(uploadDir, video.originalFilename);
            try {
                 fs.promises.rename(photo.filepath, photoPath);
                 fs.promises.rename(video.filepath, videoPath);
            } catch (error) {
                console.error('Error moving file:', error);
                return res.status(500).json({ err: error });
                
            }
            const extensions = path.extname(videoPath).toLowerCase();
            if (!allowedExtensions.includes(extensions) || !allowedExtensions.includes(path.extname(photoPath).toLowerCase())) {
                fs.unlinkSync(photoPath);
                fs.unlinkSync(videoPath);


                return res.status(400).json({ error: 'Invalid  extension' });
            }

            const check = await Film.findOne({path:videoPath});  
            if(check){
                fs.unlinkSync(photoPath); 
                fs.unlinkSync(videoPath);
                return res.status(400).json({ error: 'Film already exist' });}

            ffmpeg.ffprobe(videoPath,async (err, metadata) => {
              if (err) {
                  console.error('Error getting video metadata:', err);
                  return res.status(500).json({ error: 'Failed to retrieve video metadata' });
              }
      
                 duration = Math.round(metadata.format.duration) ;
                 duration = parseInt(duration);
                
               
                
    const Tittle = fields['tittle'] && fields['tittle'][0] != ""  ? fields['tittle'][0] : null; // Note the extra space in 'tittle '
    const category = fields.category  && fields.category[0] != ""? fields.category[0] : null;
    const Description = fields.description && fields.description[0] != ""  ? fields.description[0] : null;
    const subtittle = fields.subtittle && fields.subtittle[0] != ""  ? fields.subtittle[0] : '';
    if(Tittle == null || Description == null || category == null ){
        fs.unlinkSync(photoPath); 
        fs.unlinkSync(videoPath);
        return res.status(400).json({ error: 'All fields are required' });
    }
    const filmdata = {
        Tittle,
        Description,
        category,
        Duration:duration,
        path:"/uploads/"+video.originalFilename,
        thumbail:"/uploads/"+photo.originalFilename,
        subtittle
    };
    
   
   try {
      const film = await Film.create(filmdata);
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

  
  }
);

const GetAll = asynchandeler(
    async (req,res)=>{
        const films = await Film.find({});
        if(films){
            res.status(201).json(films);
        }else{
            res.status(404).json({message:'No film found'});
        }
       
    }
);
const GetOne = asynchandeler(
    async (req,res)=>{
        const films = await Film.findById(req.params.id);
        if(films){
            res.status(201).json(films);
        }else{
            res.status(404).json({message:'No film found'});
        }
       
    }
);
const Update =  asynchandeler(
    async (req,res)=>{
        if(!req.user.isadmin){
            return res.status(401).json({message:'Unauthorized access'});
        }
        const film = await Film.findById(req.params.id);
        if(film){
            film.Description = req.body.Description || film.Description;
            film.category = req.body.category || film.category;
            film.path = req.body.path || film.path;
            film.thumbail = req.body.thumbail || film.thumbail;
            film.subtittle = req.body.subtittle || film.subtittle;
            const updatedFilm = await film.save();
            res.status(200).json(updatedFilm);
        }else{
            res.status(404).json({message:'Film not found'});
        }
    }
);
const Delete = asynchandeler(
    async (req,res)=>{
        if(!req.user.isadmin){
            return res.status(401).json({message:'Unauthorized access'});
        }
        const film = await Film.findByIdAndDelete(req.params.id);
        if(film){
            res.status(200).json({message:'Film removed'});
        }else{
            res.status(404).json({message:'Film not found'});
        }
    }
);


module.exports = {
    Insert,
    GetAll,
    GetOne,
    Update,
    Delete
}

 