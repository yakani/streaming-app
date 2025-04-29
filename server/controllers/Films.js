const asynchandeler = require('express-async-handler');
const Film = require('../models/Films.js');
const cloudinary = require('../midleware/cloud.js');
const upload = require('../midleware/multer.js');

 let percent;
 
 const Insert = asynchandeler(
    async (req,res)=>{
        try {
        if(!req.user.isadmin){
            return res.status(401).json({message:'Unauthorized access'});
        }
        const file = req.files.file ? req.files.file[0] : null;
       // let thumbail,duration,path ,title, description,category;
       if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Extract form data
      const { Tittle, category,Description, subtittle} = req.body;
  
      // Upload to Cloudinary
      if(subtittle  && subtittle != ''){
        const uploadsub = await cloudinary.uploader.upload(subtittle, 
        { resource_type: 'raw',
            folder: 'uploads',
         }
      );
        subtittle = uploadsub.secure_url ;
      }
      

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
            folder: 'uploads',
            chunk_size: 6000000,
            timeout: 120000
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
  
        uploadStream.end(file.buffer);
      });
      
      let thumbnailUrl = '';
        const thumbnail = result.public_id.replace(/\.[^/.]+$/, ""); // Remove extension
        thumbnailUrl = cloudinary.url(thumbnail, {
          resource_type: 'video',
          format: 'jpg',
          transformation: [
            { width: 300, height: 300, crop: 'fill' },
            { quality: 'auto' }
          ]
        });
      
      // Get duration for videos
      let duration = 0;
      if (result.resource_type === 'video') {
        duration = Math.round(result.duration);
      }
    
    if(Tittle == null || Description == null || category == null ){
        return res.status(400).json({ error: 'All fields are required' });
    }
    const filmdata = {
        Tittle,
        Description,
        category,
        Duration:duration,
        path:result.secure_url,
        thumbail:thumbnailUrl,
        subtittle
    };
      const film = await Film.create(filmdata);
      if(film){
       return res.status(201).json({
              message: 'Film uploaded successfully',
              data: film
          });
      }
          
    } catch (error) {
        console.error('Error moving file:', error);
        return res.status(500).json({ err: error });
      
    }
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

 