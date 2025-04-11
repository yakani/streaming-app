
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import Spinner from "../Component/Spinner"
import { toast } from "react-toastify";
const RegisterPage = () => {
      const [loading,setLoading]= useState(false);
      const [Email,setEmail] = useState('');
      const [Tel,setTel] = useState('');
      const [name,setName] = useState('');
      const navigate = useNavigate();
      const submit = (formdata)=>{
        setLoading(true);
       const email = formdata.get('email');
       const tel = formdata.get('tel');
       const name = formdata.get('name');
       if( email == "" || tel ==null || name == ""){
        toast.error("invalid data");
        setLoading(false);
        return;
       }
       if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) || email == "" || tel ==null || name == ""){
        toast.error("invalid email");
        setLoading(false);
        return;
       }

        try {
          fetch(`${import.meta.env.VITE_Api}user `,{
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email,tel,name})
          }).then(resp =>{
            setLoading(false);
            toast.success('good');
            navigate("/view");
          })
          
        } catch (error) {
          toast.error(error);
        }

       }
  return (
    <div className=" bg-robin-900 h-full m-0 w-full  flex" >
  
    <div className="flex-col  mt-0 justify-center flex p-3"> 
      <p className="text-2xl text-white-50 text-semibold mb-4 text-6xl  antialiased">Login into Yak</p>
      <form action={submit}>
      <div className="m-2"><label
        htmlFor="name"
        className="text-3xl font-sans text-white-50"
        >Name :</label>
         <input type="text"  name="name" placeholder="Enter your full name " 
         value={name}
         onChange={(e)=>setName(e.target.value)} 
         className="flex-1  font-psemibold p-2 h-[50px] m-1 shadow-xl shadow-robin-950" /></div>
        <div className="m-2"><label
        htmlFor="email"
        className="text-3xl font-sans text-white-50"
        >Email :</label>
         <input type="email"  name="email" placeholder="Enter your e-mail  " 
         value={Email}
         onChange={(e)=>setEmail(e.target.value)} 
         className="flex-1  font-psemibold p-2 h-[50px] m-1 shadow-xl shadow-robin-950" /></div>
             <div> <label
        htmlFor="el"
        className="text-3xl font-sans text-white-50"
        >Tel :</label>
         <input type="tel"  name="tel" placeholder=" +39 0258 225 255 "
         value={Tel}
         onChange={(e)=>setTel(e.target.value)}
         className="p-2 h-[50px] m-1 shadow-xl shadow-robin-950 "  /></div>
       
        <div className="m-2 flex flex-col ">  
        <button className="bg-bittersweet-400 hover:bg-bittersweet-900 cursor-pionter shadow-xl shadow-robin-950 m-2 text-white-50 text-xl p-2 rounded-xl w-full "
        type="submit"> {loading ? <Spinner loading={loading} size={20}/>
        : "envia"} </button>
        <a href={`${import.meta.env.VITE_Api}auth/google`}>
          <button className="bg-bittersweet-400 shadow-xl shadow-robin-950  text-white-50 text-xl p-2 rounded-xl w-full hover:bg-bittersweet-900 m-2"
      > signUp with google </button></a>
        </div>
       <div>
        <p className="text-2xl font-sans text-white-50">I  have already an account ? <Link to={"/signin"}><a className="text-robin-600  text-3xl font-sans ">Login</a></Link></p>
    </div></form>
         </div> 
         <div className=" ">
        <img className="size-auto" src="/983569.jpg"/>
    </div>  
   
  </div>
  )
}

export default RegisterPage
