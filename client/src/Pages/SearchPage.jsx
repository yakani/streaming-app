import { useLoaderData, useNavigate } from "react-router";
import SwipeComponent from "../Component/SwipeComponent"
import { useEffect, useState } from "react";


const SearchPage = ({check}) => {
    const  goal = useLoaderData() ;
    const [show , setshow] = useState(true);
    const [goalsort , setgoalsort] = useState(goal);
    const navigate = useNavigate();
    const search = (stament)=>{
        setgoalsort(goal.filter((g)=> g.Tittle.includes(stament)));
    }
   
    useEffect(()=>{
    if(!check){
      navigate('/signin');
  }
    },[])
  return (
    <div className="flex flex-col bg-robin-900 min-h[800px] w-full">
      <div className="flex justify-between m-2">
        <img src="/rewind.png" alt="" className="h-[30px] w-[30px] cursor-pointer  shadow-xl shadow-robin-950 m-4" onClick={()=>navigate('/view')} />
        <img src="/download.png" alt="" className="h-[30px] w-[30px]  shadow-xl shadow-robin-950 cursor-pointer " onClick={()=>navigate('/download')}/>
      </div>
      <div className="flex w-full justify-center m-auto p-4  ">
       <input type="search" name="" id=""
        onClick={()=>setshow(false)}
        onChange={(e)=>search(e.target.value)}
        className="bg-transparent text-white-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out border-none font-sans text-2xl p-2  placeholder:text-white-400 m-4" placeholder="Search....." />
  <img src="/search.png" alt="" className="h-[30px] w-[30px] cursor-pointer" />
      </div>
      { show ? 
      <SwipeComponent
      size="w-[100px] h-[100px]"
      titolo={"Top 10"}
      images={goal}
      ishome={false}
      
      /> :<div className="bg-robin-900"></div>}
      <div className="flex  flex-wrap justify-center">
        {goalsort.map((g)=> <div key={g._id} className="flex justify-between m-4  ">
            <div className="flex">     <img src={g.thumbail} alt="" className="h-[150px] w-[150px] rounded-xl m-2" />
            <p className="text-white-50 font-sans text-xl m-2  text-end">{g.Title}</p></div>
       
           <a href={ g.season == null ? `play/film/${g._id}`:`series/${g._id}`} > <img src="/play.png" alt="" className="h-[50px] w-[50px]  cursor-pointer" /> </a>
        </div>)}
       
      </div>
    </div>
  )
}
 const SearchLoader = async ()=>{
  let all=[];
  try {
  
    const res =  await fetch(`${import.meta.env.VITE_Api}film`);
    const res2 = await  fetch(`${import.meta.env.VITE_Api}series`);
    if(!res.ok || !res2.ok){
      throw new Error('error to load')
    }
    const film = await res.json();
    const serie = await res2.json();
    all = film.concat(serie);
    return all;

  
  } catch (error) {
    console.log(error);
    
  }


 }
export {SearchPage as default, SearchLoader }   
