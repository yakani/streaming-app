
 
 import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Component/Spinner";
import { useLoaderData } from "react-router";

 const Episode = ()=>{
const { id } = useParams();
const check = useLoaderData();
console.log(id);
const [loading,setLoading] = useState(false);
const navigate  = useNavigate();
const submit = (formData)=>{
 let data = new FormData();
 console.log(import.meta.env.VITE_Api)
const thumbail = formData.get('thumbail');
const tittle = formData.get('tittle');
const description = formData.get('description');
const category = formData.get('category');
const video = formData.get('video');
const season = formData.get('season');
if(tittle == "" || description == "" || category == ""){
    toast.error('filled all the fields');
    return;
}
if(!thumbail.type.includes('image')){
    toast.error('thumbail wrong format');
    return;
}else if(thumbail.size >2097152){
    toast.error('thumbail too large');
    return;
}


    if(!video.type.includes('video')){
        toast.error('wrong format for   video');
        return;
    }else if(video.size > 3221225472){
        toast.error('video too large');
        return;
    }
   data.append('tittle',tittle);
   data.append('thumbail',thumbail);
   data.append('film',video);
   data.append('category',category);
   data.append('description',description);
   data.append('serie',id);
    data.append('season',season);
setLoading(true);
    
   fetch(`${import.meta.env.VITE_Api}episode`, {
        method: 'POST',
        credentials: 'include',
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        setLoading(false);
       toast.success('Success:', data.Title);
        navigate("/view");
    })
    .catch((error) => {
        toast.error('Error:', error);
    });
}
  useEffect(()=>{

    if(!check){
        navigate('/');
    }
  },[])
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
    htmlFor="thumbail"
    className="text-3xl font-sans text-center text-white-50 m-1">
        thumbail
    </label>   
    <input type="file"
    className="flex-1   m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="select a picture"
    name="thumbail"
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
    htmlFor="video"
    className="text-3xl font-sans text-center text-white-50 m-1">
        Episode
    </label>   
    <input type="file"
    className="flex-1 s  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="selected the film"
    name="video"
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
    { loading ? <Spinner loading={loading} size={20} />: "send"}
   
    
    </button>
   
    </form>
    </div>

</>

 }
 export default Episode;