import { useEffect, useState } from "react";
import Spinner from "../Component/Spinner";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
const AccountPage = ({check})=>{
const navigate = useNavigate();
const user = useLoaderData();
const [click,setclick] = useState(false);
const [name , setname] = useState(user.name);
const [load,setload] = useState(false);

const save = async ()=>{
    setload(true);
    try {
        const res = await fetch(`${import.meta.env.VITE_Api}user`,{
            method:"PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name : name})
        });
        if(res.ok){
            toast.success('update');
            setload(false);
        }
        
    } catch (error) {
        toast.error(error);
        setload(false);
    }
}
/*
useEffect(()=>{
    if(!check){
        navigate('/signin');
    }
},[]);*/

return<>
<div className="flex m-4 p-4   flex-cols justify-center bg-robin-900">
    <img src="/left.png" alt="" className="w-[20px] h-[20px] cursor-pointer " onClick={()=>navigate("/")} />
    <div className="flex justify-between p-3 border rounded-xl shadow-xl m-3 shadow-robin-950 min-h[500px]">
        {click ? <input type="text" className="text-white-50 bg-transparent text-center text-2xl shadow-lg p-1 m-1 " value={name} onChange={(e)=>setname(e.target.value)}/>:
        <p className="text-white-50 text-center text-2xl shadow-lg p-1 m-1 ">{name}</p>}
        <img src={click ? "/cross.png":"/pencil.png"}  className="w-[20px] h-[20px] cursor-pointer" onClick={()=>setclick(!click)}/>
    </div>
    <div className="flex justify-between p-3 border rounded-xl shadow-xl m-3 shadow-robin-950 min-h[500px]">
        <p className="text-white-50 text-center text-2xl shadow-lg p-1 m-1 ">{user.email}</p>
        
    </div>
    {
        click ? <div className="flex justify-between p-3  rounded-xl shadow-xl m-3 shadow-robin-950 min-h[500px]">
            <button className="bg-bittersweet-400  text-white-50 text-xl text-center p-3 rounded-xl  hover:bg-bittersweet-900" onClick={save}>{load ? <Spinner loading={load} size={20} /> : "save"}</button>
    </div>:<></>
    }
    

</div>

</>

}

const Userloader = async ()=>{
    try {
     const res = await   fetch(`${import.meta.env.VITE_Api}user`,{credentials:'include'});
    if(!res.ok){
    const data = await res.json();
    throw new Error(data.msg);
        }
     const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
      
    }
}
 export {AccountPage as  default, Userloader}  ;