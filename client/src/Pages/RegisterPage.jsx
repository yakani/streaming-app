
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import Spinner from "../Component/Spinner"
import { toast } from "react-toastify";
import { useAuthstore } from "../Store/Authstore";
import { Mail, Phone, User } from "lucide-react";
const RegisterPage = () => {
  const {register , islogining} = useAuthstore();
      
      const [Email,setEmail] = useState('');
      const [Tel,setTel] = useState('');
      const [name,setName] = useState('');
      const navigate = useNavigate();
      const submit = (formdata)=>{
      
       const email = formdata.get('email');
       const tel = formdata.get('tel');
       const name = formdata.get('name');
       if( email == "" || tel ==null || name == ""){
        toast.error("invalid data");
        
        return;
       }
       if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) || email == "" || tel ==null || name == ""){
        toast.error("invalid email");
        return;
       }

        register({email,tel,name});
        navigate('/');

       }
  return (
    <div className=" bg-robin-900  min-h-screen grid lg:grid-cols-2" >
  
    <div className="flex flex-col justify-center items-center p-6 sm:p-12"> 
      <p className="text-2xl text-white-50 text-semibold mb-4 text-6xl  antialiased">Signup into Yak</p>
      <form action={submit} className="space-y-6">
      <div className="m-2 flex"><label
        htmlFor="name"
        className="flex"
        >
          <User className=" w-[25px] h-[25px] text-bittersweet-400 "/>
          <span className="m-1 text-white-50 text-xl">Name :</span>
        </label>
         <input type="text"  name="name" placeholder="Enter your full name " 
         value={name}
         onChange={(e)=>setName(e.target.value)} 
         className="flex-1  font-psemibold p-2 h-[50px] m-1 shadow-xl shadow-robin-950" /></div>
        <div className="m-2 flex"><label
        htmlFor="email"
        className=" flex"
        >
          <Mail className=" w-[25px] h-[25px] text-bittersweet-400 "/>
          <span className="m-1 text-white-50 text-xl">Email :</span>
        </label>
         <input type="email"  name="email" placeholder="Enter your e-mail  " 
         value={Email}
         onChange={(e)=>setEmail(e.target.value)} 
         className="flex-1  font-psemibold p-2 h-[50px] m-1 shadow-xl shadow-robin-950" /></div>
             <div className="flex m-2"> <label
        htmlFor="tel"
        className="flex"
        ><Phone className=" w-[25px] h-[25px] text-bittersweet-400 "/>
          <span className="m-1 text-white-50 text-xl">Tel :</span></label>
         <input type="tel"  name="tel" placeholder=" +39 0258 225 255 "
         value={Tel}
         onChange={(e)=>setTel(e.target.value)}
         className="p-2 h-[50px] m-1 shadow-xl shadow-robin-950 "  /></div>
       
        <div className="m-2 flex flex-col ">  
        <button className="bg-bittersweet-400 hover:bg-bittersweet-900 cursor-pionter shadow-xl shadow-robin-950 m-2 text-white-50 text-xl p-2   "
        type="submit"> {islogining ? <Spinner loading={islogining} size={20}/>
        : "envia"} </button>
        <a href={`${import.meta.env.VITE_Api}auth/google`} className="flex bg-bittersweet-400 shadow-xl shadow-robin-950  justify-center m-2 p-2 hover:bg-bittersweet-900">
        <img src="/google.png" className="w-[40px] h-[40px] text-bittersweet-50  m-1" />
          <p className="text-white-50 text-xl p-2 text-center rounded-xl w-full "
      > signUp  </p></a>
        </div>
       <div>
        <p className="text-2xl font-sans text-white-50">I  have already an account ? <Link to={"/signin"}><a className="text-robin-600  text-3xl font-sans ">Login</a></Link></p>
    </div>
    </form> 
    </div> 
    <div className="h-full">
        <img className="size-auto" src="/983569.jpg"/> 
      </div> 
  </div>
  )
}

export default RegisterPage
