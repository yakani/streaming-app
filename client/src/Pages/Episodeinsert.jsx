
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Component/Spinner";
import { useproduct } from "../Store/Productstore";
import { useEffect } from "react";

 const Episode = ()=>{
const { id } = useParams();
const { Insertepisode ,isloading, progress} = useproduct();
const navigate  = useNavigate();
const [uploadProgress, setuploadProgress] = useState(0);
const submit = (formData)=>{
 let data = new FormData();
 console.log(import.meta.env.VITE_Api);
const tittle = formData.get('tittle');
const description = formData.get('description');
const category = formData.get('category');
const file = formData.get('file');
const season = formData.get('season');
if(tittle == "" || description == "" ){
    toast.error('filled all the fields');
    return;
}

    if(!file.type.includes('video') ){
        toast.error('wrong format for   video');
        return;
    }else if(file.size > 2147483648){
        toast.error('video too large');
        return;
    }
   data.append('Tittle',tittle);
   data.append('file',file);
   data.append('category',category);
   data.append('Description',description);
   data.append('serie',id);
    data.append('season',season);
data.append('subtittle',"");
Insertepisode(data);
}

useEffect(()=>{
    setuploadProgress(progress);
},[progress]);
return <>
<nav className=" flex  justify-center  shadow-3xl shadow-robin-950 p-4 bg-robin-700">
    <p className="text-white-50 text-6xl p-2 ">Upload Episodes</p>
</nav>
<div className="flex justify-center m-2">
<form action={submit} className=" flex flex-col jusify center shadow-4xl  border bg-robin-700 shawdow-robin-950  rounded-xl m-4 p-2 " multiple>
    
    <label
    htmlFor="tittle"
    className="text-3xl font-sans text-center text-white-50 m-1">
        Tittle 
    </label>   
    <input type="text"
    className="flex-1 shadow-lg rounded-xl shadow-robin-950  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="Enter the title"
    name="tittle"
    />
   

     <label
    htmlFor="description"
    className="text-3xl font-sans text-center text-white-50 m-1">
        Description 
    </label>   
    <input type="text"
    className="flex-1 shadow-lg rounded-xl shadow-robin-950  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="Enter the description"
    name="description"
    />
     <label
    htmlFor="category"
    className="text-3xl font-sans text-center text-white-50 m-1">
        Category 
    </label>   
    <input type="text"
    className="flex-1 shadow-lg rounded-xl shadow-robin-950  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="Enter the category"
    name="category"
    />
    
    <label
    htmlFor="file"
    className="text-3xl font-sans text-center text-white-50 m-1">
        Episode
    </label>   
    <input type="file"
    className="flex-1 s  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="selected the film"
    name="file"
    />
<label
    htmlFor="season"
    className="text-3xl font-sans text-center text-white-50 m-1">
     Season
    </label>   
    <input type="number"
    className="flex-1 shadow-xl shadow-robin-950  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="number of season "
    name="season"
    />
 
  <button type="submit" className="m-2 p-4 text-center text-white-50 text-2xl hover:bg-robin-900">
    { isloading ?    
          <div className="mb-4">
            <progress
              className="progress progress-primary w-full"
              value={uploadProgress}
              max="100"
            ></progress>
            <p className="text-center mt-2">Uploading: {uploadProgress}%</p>
          </div>
        : "send"}
   
    
    </button>
   
    </form>
    </div>

</>

 }
 export default Episode;