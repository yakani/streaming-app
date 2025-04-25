 
 import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Component/Spinner";
import { useproduct } from "../Store/Productstore";

 const GoalRegister = ()=>{
const{ Insertfilm , Insertserie , isloading ,series ,progress, selecte} = useproduct();
const [isfilm, setisFilm] = useState(true);
const [episode,setepisode] = useState(false);
const [uploadProgress, setuploadProgress] = useState(0);


const navigate  = useNavigate();
const submit = async (Data)=>{

if(episode){
        
    const seriename = Data.get('seriename');
    
    if(seriename == ""){
        toast.error('filled the serie name');
        setLoading(false);
        return;
    }
    const data  = series.find(item => item.Tittle == seriename);
    navigate(`/episode/${data._id}`);
   
}
const tittle = Data.get('tittle');
const description = Data.get('description');
const category = Data.get('category');
if(tittle == "" || description == "" || category == ""){
    toast.error('filled all the fields');
    return;
}

let formlast = new FormData();
formlast.append('Tittle',tittle);
formlast.append('category',category);
formlast.append('Description',description);
  const file = Data.get('file'); 
  const season = Data.get('season') || "";
   if(!file.type.includes('video') && !file.type.includes('image')){
        toast.error('wrong format for   video');
        return;
    }else if(file.size > 2147483648){
        toast.error('video too large');
        return;
    }
    formlast.append('file',file);
    formlast.append('season',season);
    formlast.append('serie',"");

    if(isfilm){
     Insertfilm(formlast);   
    }else{
        Insertserie(formlast);
    }
    
    


}
useEffect(()=>{
    if(progress > 99.9){
        navigate(isfilm ? "/view" : "/episode/"+selecte._id);
        return;
    }
setuploadProgress(progress);

},[progress])
  
return <>
<nav className=" flex  justify-center  shadow-3xl shadow-robin-950 p-4 bg-robin-700">
    <p className="text-white-50 text-6xl p-2 ">Upload film or Series</p>
    <p className="m-2 text-white-50 text-2xl cursor-pointer " onClick={ ()=>setepisode(!episode)}>{!episode ? "Add episode": "Leave"}</p>
</nav>
<div className="flex justify-center m-2">
<form action={submit} className=" flex flex-col jusify center shadow-4xl  border bg-robin-700 shawdow-robin-950  rounded-xl m-4 p-2 " multiple>
    
    {!episode ?  <>
    <div className="flex justify centerm-2 ">
    <label
    htmlFor="film"
    className="text-2xl font-sans text-center text-white-50 m-1">
        Film
    </label>   
    <input type="checkbox"
    className="flex-1   m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="Enter the name of the series"
    name="film"
    onChange={()=>setisFilm(!isfilm)}
    checked={isfilm}
    />
    {isfilm ? <></>:<>
    <label
    htmlFor="series"
    className="text-2xl font-sans text-center text-white-50 m-1">
        Series
    </label>   
    <input type="checkbox"
    className="flex-1   m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="Enter the name of the series"
    name="series"
    onChange={()=>setisFilm(!isfilm)}
    checked={!isfilm}
    /></>}
    </div>
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
   {!isfilm ? "serie": "Film"}
    </label>   
    <input type="file"
    className="flex-1 s  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="selected the film"
    name="file"
    />
{isfilm ? <>
</>:<>

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
    
</>}</>: <>

<label
    htmlFor="seriename"
    className="text-3xl font-sans text-center text-white-50 m-1">
        name of serie
    </label>   
    <input type="text"
    className="flex-1 shadow-lg rounded-xl shadow-robin-950  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="Enter the serie name"
    name="seriename"
    />
</> }
 
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
 export default GoalRegister;