import { HomeIcon, LogIn, LogOut, Search, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { useAuthstore } from '../Store/Authstore'
import { useproduct } from '../Store/Productstore'
import { Obserstore } from '../Store/Observation'

const Navbar = () => {
    const {user ,logout} = useAuthstore();
    const { selecte ,Addhistory,datahis } = useproduct();
    const { Go ,ishistory , setplayhistory} = Obserstore();
    const fire = ()=>{
      setplayhistory(false);
      if(!selecte || !selecte.path || !user || !ishistory) return;
      Addhistory(datahis);
      Go(false);

    }
  return (
    <div className='flex justify-between p-2  shadow-2xl shadow-robin-950 rounded-xl '>
      <img src="/yak.png" alt=""  className='w-[80px] h-[80px]  rounded-xl '/>
      <div className=' flex justify-center p-4'>
        <Link onClick={fire} className='m-2' to={"/"}>
        <HomeIcon className='w-[40px] h-[40px] text-bittersweet-500 cursor-pointer shadow-xl shadow-robin-950  m-1' />
        <span className="hidden text-white-50 sm:inline">Home</span>
        </Link>
        {
            user ?<> <Link onClick={fire} className='m-2' to={ "/user" }>
        <img src="/user.png" alt="" className='w-[40px] h-[40px] cursor-pointer shadow-xl shadow-robin-950  m-1'/>
        <span className="hidden text-white-50 sm:inline">Profile</span>
        </Link>
        <Link onClick={fire} className='m-2' to={ "/search"}>
        <img src="/search.png" alt=""  className='w-[40px] h-[40px] cursor-pointer shadow-xl shadow-robin-950  m-1'/>
        <span className="hidden text-white-50 sm:inline">Search</span>
        </Link>
        {user.isadmin ? <Link onClick={fire} className='m-2' to={"/admin"}>
        <img src="/add.png" alt="" className='w-[40px] h-[40px] cursor-pointer shadow-xl shadow-robin-950  m-1'/>
        <span className="hidden text-white-50 sm:inline">Admin</span>
        </Link>: <></>}
        <button onClick={logout}> 
            <img src="/sign.png" alt="" className='w-[40px] h-[40px] cursor-pointer shadow-xl shadow-robin-950  m-1' />
            <span className="hidden text-white-50 sm:inline">logout</span>
        </button></>:<>
        <Link onClick={fire} className='m-2' to={"/signin"}>
        <LogIn className='w-[40px] h-[40px] text-bittersweet-500 cursor-pointer shadow-xl shadow-robin-950  m-1' />
        <span className="hidden text-white-50 sm:inline">login</span>
        </Link></>
        }
    
       
      </div>
    </div>
  )
}

export default Navbar
