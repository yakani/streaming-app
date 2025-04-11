import { Link, useNavigate } from "react-router"
import { useState } from "react"
import Spinner from "../Component/Spinner"
import { toast } from "react-toastify"
export const Signin = () => {
  const [loading,setLoading]= useState(false);
  const [Email,setEmail] = useState('');
  const navigate = useNavigate();
 const submit = (formdata)=>{
    setLoading(true);
const email  = formdata.get("email");
if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) || email == ""){
  toast.error('invalid email');
  setLoading(false);
  return;
} 
try {
 fetch(`${import.meta.env.VITE_Api}user/login`,{
  method:"POST",
  headers:{
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(email)
  }
 }).then(resp => {
  toast.success('login');
  setLoading(false);
  navigate('/view');
 })
} catch (error) {
  toast.error(error);
}

 }
  return (
  <div className=" bg-robin-900  h-full m-0 w-full  flex" >
    
    <div className="flex-col  flex-1 m-4 justify-between flex p-3"> 
      
      <p className="text-2xl text-white-50 text-semibold  text-6xl  p-2  antialiased shadow-xl shadow-robin-950">Login into Yak</p>
    
       <form action={submit}>
        <div className=" flex flex-col  justify-between ">  
        <div className="m-2"><label
        htmlFor="email"
        className="text-3xl font-sans text-white-50"
        >Email :</label>
         <input type="email"  name="email" placeholder="Enter your e-mail  " 
         value={Email}
         onChange={(e)=>setEmail(e.target.value)} 
         className="p-2 h-[50px] m-1 shadow-xl shadow-robin-950"  /></div>
        <button className="bg-bittersweet-400 shadow-xl shadow-robin-950  text-white-50 text-xl p-2 m-2 rounded-xl w-full hover:bg-bittersweet-900"
         type="submit"> {loading ? <Spinner loading={loading} size={20}/>
        : "envia"} </button>
        <a href={`${import.meta.env.VITE_Api}auth/google`}>
        <button className="bg-bittersweet-400 shadow-xl shadow-robin-950  text-white-50 text-xl p-2 rounded-xl w-full hover:bg-bittersweet-900 m-2"
         > signin with google</button></a>
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
