
import {  useNavigate } from "react-router"
import SwipeComponet from "../Component/SwipeComponent"
import {  useEffect, useState } from "react";
import { useproduct } from "../Store/Productstore";
import { useAuthstore } from "../Store/Authstore";
const ViewPage = () => { 
   const {series ,films,ranks,historys ,getselected } = useproduct();
   const {updateuser, isupdating} = useAuthstore();
  
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [list, setlist] = useState(false);
  const [film, setfilm] = useState(films);
  const [serie, setserie] = useState(series);
  const [rank,setrank] = useState(ranks);
  const [show ,setshow] = useState('');
  const [affich,setaffich] = useState(series[0] || film[0] || null);


const Goto = ()=>{
  getselected(affich);
  navigate( `${show == "serie" || show =="" ? "/series" : "/play/film" }/${affich._id}`);
}
  const AddToList = async (id)=>{
    updateuser({list:id});
    setlist(true);
  }

useEffect(()=>{
  if(show == "" || show == "serie" ){
    setaffich(serie[0] || null);
  }else if(show == "film"){
    setaffich(film[0] || null);
  } 
},[show]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='flex flex-col bg-robin-900'>
    
      <div className='flex justify-center m-2'>
        <div className="p-2 text-white-50 text-2xl font-sans cursor-pointer  border shadow-xl shadow-robin-950 rounded-2xl border-white m-2" onClick={()=>setshow(show == "serie"? "":"serie")}>series </div>
        <div className="p-2 text-white-50 text-2xl font-sans cursor-pointer  border shadow-xl shadow-robin-950 rounded-xl border-white m-2" onClick={()=>setshow(show == "film"? "":"film")}> films</div>
        <div className="p-2 ">
          <select name="categories" id="" className="p-2 text-white-50 text-xl font-sans border bg-transparent rounded-2xl border-white-50 m-2 shadow-xl shadow-robin-950" onChange={handleChange} value={age}>
            <option value="nostalgic" className="text-bittersweet-400">nostalgic</option>
            <option value="action" className="text-bittersweet-400">action</option>
            <option value="comedy" className="text-bittersweet-400">comedy</option>
            <option value="drama" className="text-bittersweet-400">drama</option>
            <option value="horror" className="text-bittersweet-400">horror</option>
            <option value="romance" className="text-bittersweet-400">romance</option>
          </select></div>
      </div>
      { !affich ? <></>:
      <div className={`flex flex-col shadow-4xl shadow-robin-950 rounded-2xl max-w-[1000px]  h-[500px]  bg-center justify-center align-center w-full m-auto`}
      style={{backgroundImage:`url(${affich.thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
        <div className="text-white-100 italic  font-bold text-8xl text-center">{affich.Tittle.split(' ')[0]}</div>
        <div className="text-white-100 italic font-bold text-8xl text-center">{affich.Tittle.split(' ')[1]}</div>
        <div className="flex justify-between p-4">
          {affich.category.split(' ').map((cat,index)=>(
             <p key={index} className="text-white-50 text-2xl font-bold m-2"><i className="text-white">.</i>{cat}</p>))}
        </div>
        <div className='flex justify-center '>
            <button className="p-4 bg-white-50 text-bittersweet-400 font-bold text-2xl m-2 flex  " onClick={Goto}><img src="/play.png" className="w-[30px] h-[30px]" /> lecture</button>
            <button className="p-4 text-bittersweet-400 bg-white-50 font-bold text-2xl m-2 flex" onClick={()=>AddToList(affich._id)} ><img src={list ? "/check.png":"add.png"} className="w-[30px] h-[30px]" />{list ? "List" :"Add to list" }</button>
        </div>
      </div>}
    
    {
      show == "" ? 
    <>
      <SwipeComponet
      ishome={false}
      titolo="Series"
      images={serie}
      size="h-[250px] w-[250px]"
      />
         <SwipeComponet
      ishome={false}
      titolo="Films"
      images={film}
      size="h-[200px] w-[200px]"
      />
      
      
      <SwipeComponet
      ishome={false}
      titolo="Top 10"
      images={rank}
      size="h-[200px] w-[200px]"
      /> 
        <SwipeComponet
      ishome={false}
      titolo="History"
      images={historys}
      size="h-[200px] w-[200px]"
      /> </> : show == "serie" ?
      
      <SwipeComponet
      ishome={false}
      titolo="Series"
      images={serie}
      size="h-[250px] w-[250px]"
      />:    <SwipeComponet
      ishome={false}
      titolo="Films"
      images={film}
      size="h-[200px] w-[200px]"
      />

    }
    </div>
  )
}


export {ViewPage as default } ;
