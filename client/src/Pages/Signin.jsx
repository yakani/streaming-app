import { Link, useNavigate } from "react-router"
import { useState } from "react"
import Spinner from "../Component/Spinner"
import { toast } from "react-toastify"
import { useAuthstore } from "../Store/Authstore"
import { Goal, GoalIcon, Mail } from "lucide-react"
export const Signin = () => {
  const { login, islogining}= useAuthstore();
  const [Email,setEmail] = useState('');
  const navigate = useNavigate();
 const submit = (formdata)=>{
const email  = formdata.get("email");
if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) || email == ""){
  toast.error('invalid email');
  
  return;
} 
login({email});
navigate('/view');

 }
  return (
  <div className=" bg-robin-900  min-h-screen grid lg:grid-cols-2" >
    
    <div className="flex flex-col justify-center items-center p-6 sm:p-12"> 
      
      <p className=" text-white-50 text-semibold w-full mb-4 max-w-md space-y-8 text-6xl ">Login into Yak</p>
    
       <form action={submit} className="space-y-6">
        <div className=" flex flex-col  justify-between ">  
        <div className="m-2 flex justify-between">
          <label
        htmlFor="email"
        className="flex"
        >
          <Mail className="w-[25px] h-[25px] text-white-50 m-1" />
          <span className=" m-1 text-white-50 text-xl">Email :</span>
        </label>
         <input type="email"  name="email" placeholder="Enter your e-mail  " 
         value={Email}
         onChange={(e)=>setEmail(e.target.value)} 
         className="p-3 text-center rounded-lg m-1 text-bettersweet-400"  />
         </div>
        <button className="bg-bittersweet-400 shadow-xl shadow-robin-950  text-white-50 text-xl p-2 m-1   hover:bg-bittersweet-900"
         type="submit"> {islogining ? <Spinner loading={islogining} size={20}/>
        : "envia"} </button>
        <a href={`${import.meta.env.VITE_Api}/auth/google`} className="flex bg-bittersweet-400 shadow-xl shadow-robin-950  justify-center m-2 p-2 hover:bg-bittersweet-900 ">
        <img src="/google.png" className="w-[40px] h-[40px] text-bittersweet-50  m-1" />
        <p className=" text-white-50 text-xl p-2 rounded-xl  "
         > signin </p></a>
        <p className="text-2xl font-sans text-white-50">I dont have already an account ? <Link to={"/register"}><a className="text-robin-400 hover:text-robin-100 font-sans ">Register</a></Link></p>
        <p className="text-2xl font-sans text-white-50">I am the admin ? <Link to={"/admin/login"}><a className="text-robin-400 hover:text-robin-100 font-sans ">Admin</a></Link></p>
        </div>
       <div>
        
    </div></form>
         </div>   
   <div className=" ">
        <img className="w-full h-full" src="/983569.jpg"/>
    </div>
  </div>
  )
}
