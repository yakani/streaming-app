
import { useLoaderData, useNavigate } from "react-router"
import SwipeComponet from "../Component/SwipeComponent"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ViewPage = ({check}) => { 
   const ans = useLoaderData();
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [list, setlist] = useState(false);
  const [film, setfilm] = useState(ans.film);
  const [serie, setserie] = useState(ans.serie);
  const [rank,setrank] = useState(ans.rank);
  const [history, sethistory] = useState(ans.history);
  const AddToList = async (id)=>{

    try {
      const res = await fetch(`${import.meta.env.VITE_Api}user`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({List:id})
      });
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message);
      }
      console.log(data);
      setlist(true);
      toast.success("Added to list");
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(!check){
      navigate('/signin');
  }

  },[]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='flex flex-col bg-robin-900'>
      <div className='flex justify-between m-4  '>
        <div>
            <img src="/yak.png"  className="w-[50px] h-[50px]  shadow-2xl shadow-robin-950" alt="" />
        </div>
        <div className='flex justify-between p-2 '>
           <img src="/search.png" alt="" className="w-[30px]  cursor-pointer shadow-xl shadow-robin-950  h-[30px] m-1  " onClick={()=>navigate("/search")}/>
         <img src="/download.png" alt=""  className="w-[30px] cursor-pointer shadow-xl shadow-robin-950  h-[30px]  m-1" onClick={()=>navigate('/download')}/>
        </div>
      </div>
      <div className='flex justify-center m-2'>
        <div className="p-2 text-white-50 text-2xl font-sans  border shadow-xl shadow-robin-950 rounded-2xl border-white m-2">series </div>
        <div className="p-2 text-white-50 text-2xl font-sans border shadow-xl shadow-robin-950 rounded-xl border-white m-2"> films</div>
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
      <div className={`flex flex-col shadow-4xl shadow-robin-950 rounded-2xl max-w-[1000px]  h-[500px]  bg-center justify-center align-center w-full m-auto`}
      style={{backgroundImage:`url(${serie[0].thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
        <div className="text-white-100 italic font-bold text-8xl text-center">{serie[0].Tittle.split(' ')[0]}</div>
        <div className="text-white-100 italic font-bold text-8xl text-center">{serie[0].Tittle.split(' ')[1]}</div>
        <div className="flex justify-between p-4"><p className="text-white-50 text-2xl font-bold m-2">nostaglie</p>
        <p className="text-white-50 text-2xl font-bold shadow-2xl shadow-robin-950 m-2 "><i className="text-white">.</i>action</p>
        <p className="text-white-50 text-2xl font-bold m-2"><i className="text-white">.</i>comedy</p>
        <p className="text-white-50 text-2xl font-bold m-2"><i className="text-white">.</i>vibrant</p></div>
        <div className='flex justify-center '>
            <button className="p-4 bg-white-50 text-bittersweet-400 font-bold text-2xl m-2 flex  " onClick={()=>navigate('/series/'+serie[0]._id)}><img src="/play.png" className="w-[30px] h-[30px]" /> lecture</button>
            <button className="p-4 text-bittersweet-400 bg-white-50 font-bold text-2xl m-2 flex" onClick={()=>AddToList(serie[0]._id)} ><img src={list ? "/check.png":"add.png"} className="w-[30px] h-[30px]" />{list ? "List" :"Add to list" }</button>
        </div>
      </div>
    

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
      images={history}
      size="h-[200px] w-[200px]"
      /> 

    </div>
  )
}
const RankLoader = async ()=>{
  try {
  const res = await fetch(`${import.meta.env.VITE_Api2}observe/complete`);
  const res2 = await fetch(`${import.meta.env.VITE_Api}film`);
  const res3 = await fetch(`${import.meta.env.VITE_Api}episode`);
  const res5 = await fetch(`${import.meta.env.VITE_Api}series`);
  const res4 = await fetch(`${import.meta.env.VITE_Api}history`,{
    credentials:'include'
  });
  if (!res.ok || !res2.ok || !res3.ok || !res4.ok || !res5.ok) {
    throw new Error('Failed to fetch data');
  }
const data = await res.json();
const film = await res2.json();
const episode = await res3.json();
const data4 = await res4.json();
const serie = await res5.json();

let all1 = [];
let all2 = [];
data.forEach(element => {
  const n = film.find(item => item._id == element.name) ;
  const m = episode.find(item => item._id == element.id) ;
  if(n){
    all1.push(n);}
  if(m){
    all1.push(m);}
});

data4.forEach(element => {
  const n = film.find(item => item._id == element.film_id) ;
  const m = episode.find(item => item._id == element.episode_id) ;
  if(n){
    all2.push(n);}
  if(m){
    all2.push(m);}
});
return {rank:all1,history:all2, serie:serie  , film:film, episode:episode};
} catch (error) {
 console.log(error);   
}
}

export {ViewPage as default ,RankLoader} 
