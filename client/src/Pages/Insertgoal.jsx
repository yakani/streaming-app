 
 import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Component/Spinner";

 const GoalRegister = ()=>{
const [isfilm, setisFilm] = useState(true);
const [loading,setLoading] = useState(false);
const [episode,setepisode] = useState(false);
const navigate  = useNavigate();
const submit = async (Data)=>{

if(episode){
        
    const seriename = Data.get('seriename');
    
    if(seriename == ""){
        toast.error('filled the serie name');
        return;
    }
    try {
        
        setLoading(true);
        
        const res = await fetch(`${import.meta.env.VITE_Api}series/name/${seriename}`);
      
        if(!res.ok){
            const er = await res.json();
            throw new Error(er.message);
        }
        
        setLoading(false);
        const data = await res.json();
        navigate(`/episode/${data._id}`);
    } catch (error) {
        toast.error(error);
        setLoading(false);
        return;
    }
}
const thumbail = Data.get('thumbail');
const tittle = Data.get('tittle');
const description = Data.get('description');
const category = Data.get('category');
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
let formlast = new FormData();
formlast.append('tittle',tittle);
formlast.append('thumbail', thumbail);
formlast.append('category',category);
formlast.append('description',description);

if(isfilm){
    const video = Data.get('video');
    if(!video.type.includes('video')){
        toast.error('wrong format for   video');
        return;
    }else if(video.size > 3221225472){
        toast.error('video too large');
        return;
    }
formlast.append('film',video);

}else{
    const season = Data.get('season');
    formlast.append('season',season);
}


try {
    setLoading(true);
    const rep = await fetch(`${import.meta.env.VITE_Api}${!isfilm ? "series": "film"}`, {
        method: 'POST',
        credentials: 'include',
        body: formlast,
    })
   
    if(!rep.ok){
        
    const data = await rep.json();
    throw new Error(data);
    }
       const data1 = await rep.json();
       toast.success('Success:', data1.Title);
       setLoading(false);
        navigate(isfilm ? "/view" : "/episode/"+data1._id);
} catch (error) {
    toast.error(error);
    setLoading(false);
}

}
  
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

{isfilm ? <>
    
    <label
    htmlFor="video"
    className="text-3xl font-sans text-center text-white-50 m-1">
        Film
    </label>   
    <input type="file"
    className="flex-1 s  m-1 p-2 text-center text-robin-900 ::placeholder: text-robin-900"
    placeholder="selected the film"
    name="video"
    />
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
    { loading ? <Spinner loading={loading} size={20} />: "send"}
   
    
    </button>
   
    </form>
    </div>

</>

 }
 export default GoalRegister;