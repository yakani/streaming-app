import { Link, useNavigate } from "react-router"
import { useState } from "react"
import Spinner from "../Component/Spinner"
import { toast } from "react-toastify"
import { useAuthstore } from "../Store/Authstore"
export const AdminSignin = () => {
  const { adminlogin , islogining} = useAuthstore();
  const [Email,setEmail] = useState('');
  const navigate = useNavigate();
 const submit = (formdata)=>{

const email  = formdata.get("email");
if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) || email == ""){
  toast.error('invalid email');
  return;
} 
adminlogin({email});
navigate('/admin');
 }
  return (
  <div className=" bg-robin-900  h-full m-0 w-full  flex" >
    
    <div className="flex-col   m-4 justify-center flex p-3"> 
      
      <p className="text-2xl text-white-50 text-semibold  text-6xl  p-2  antialiased ">Login into Yak</p>
    
       <form action={submit}>
        <div className="m-2"><label
        htmlFor="email"
        className="text-3xl font-sans text-white-50"
        >Email :</label>
         <input type="email"  name="email" placeholder="Enter your e-mail  " 
         value={Email}
         onChange={(e)=>setEmail(e.target.value)} 
         className="p-2 h-[50px] m-1 shadow-xl shadow-robin-950"  /></div>
        <button className="bg-bittersweet-400 shadow-xl shadow-robin-950  text-white-50 text-xl p-2 m-2 rounded-xl w-full hover:bg-bittersweet-900"
         type="submit"> {islogining? <Spinner loading={islogining} size={20}/>
        : "envia"} </button>
       
        
  
       <div>
        
    </div>
    </form>
         </div>   
 
        <img className="w-full h-full" src="/983569.jpg"/>

  </div>
  )
}
