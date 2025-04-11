import { useState } from "react";
import { useNavigate } from "react-router";
import Parameter from "../Component/Parameter"

const DowloadPage = () => {
    const goal =[1,2,3,4,5,6];
    const navigate =useNavigate();
    const [isOpen,setisopen]= useState(false);
  return (
    <>
    <div className={ isOpen ? "block" :"hidden"}>
    <img src="/cross.png"  className="m-2 rounded-xl w-[30px] h-[30px] cursor-pointer fixed shadow-xl shadow-robin-950"  onClick={()=>setisopen(false)}/>
    </div>
    <Parameter
    isOpen={isOpen}
    />
    <section className={isOpen ? "blur-sm transition duration-300 bg-robin-900":"transition duration-300 bg-robin-900"}>
       <div className="flex flex-col p-4">
      <div className="flex justify-between m-4">
        <img src="/rewind.png" alt="" className="h-[30px] w-[30px] cursor-pointer shadow-xl shadow-robin-950" onClick={()=>navigate('/view')} />
        <p className="text-white-50 text-3xl font-bold  ">Downloads</p>
        <div className="flex ">   <img src="/search.png" alt="" className="h-[30px] w-[30px] cursor-pointer m-4 shadow-xl shadow-robin-950" onClick={()=>navigate("/search")} />
        <img src="/menu-burger.png" alt=""  className="h-[30px] w-[30px] cursor-pointer m-4 shadow-xl shadow-robin-950" onClick={()=>setisopen(true)}/></div>
     
      </div>
      <div className="flex justify-between">
<div className="flex  ">
    <img src="/settings.png" alt="" className="h-[30px] w-[30px] cursor-pointer m-1 shadow-xl shadow-robin-950 " onClick={()=>setisopen(true)}/>
    <p className="text-white-50 font-bold text-xl text-start">intligente download</p>
</div>
<img src="/pencil.png" alt="" className="h-[30px] w-[30px] cursor-pointer shadow-xl shadow-robin-950 " />
      </div>
      <div></div>
      <div className="flex flex-wrap justify-center">
      {goal.map((g)=> <div key={g} className="flex justify-between m-4  ">
            <div className="flex">     <img src="/back.webp" alt="" className="h-[150px] w-[150px] rounded-xl m-2 shadow-xl shadow-robin-950" />
            <p className="text-white-50 font-sans text-xl m-2  text-end">Joh wick</p></div>
       
            <img src="/play.png" alt="" className="h-[50px] w-[50px]  cursor-pointer "/>
        </div>)}
      </div>
    </div>
      </section></>
    
   
  )
}

export default DowloadPage
