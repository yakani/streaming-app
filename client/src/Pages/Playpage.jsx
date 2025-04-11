import { useEffect, useRef, useState } from "react";
import NextPlay from "../Component/NextPlay";
import VideoPlayer from "../Component/VideoPlayer";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Spinner from "../Component/Spinner";

const Playerpage = ({isfilm , checkuser}) => {
  const playerref = useRef(null);
  const ans = useLoaderData();
  const {id} = useParams();
  const [heart,setheart] = useState(false);
  const [check,setcheck] = useState(true);
  const [out,setout] = useState(false);
  const [star,setstar] = useState(0);
  const [goal,setgoal] = useState([]);
  const [load,setload] = useState(false);
  const navigate = useNavigate();


const  AddLike = async ()=>{
  if(heart){
    return;
  }
  const res =  await fetch(`${import.meta.env.VITE_Api2}observe/${id}`,{
    method:"PUT",
    headers:{
      'Content-Type':'application/json'
    }, 
     body:JSON.stringify({Like:1}),
   }).then(data=> setheart(true));

} 
const GoHome = async()=>{
  let time = playerref.current ? playerref.current.getCurrentTime():0;
try {
  const data = isfilm ? {
film_id:id,
Duration:time,
  }:{ episode_id:id,
    Duration:time
  };
  console.log(data);
  const res  = await fetch(`${import.meta.env.VITE_Api}history`,{
    method:'POST',
    credentials:'include',
    headers:{
       'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  }).then(async(data)=>{
    const rep =await data.json();
      console.log(rep);
    navigate('/view');
  
    
  });

  
} catch (error) {
  console.log(error);
}

}

  useEffect(()=>{
    
    if(!checkuser){
      navigate('/signin');
  }
    setload(true);
    try {
      fetch(`${import.meta.env.VITE_Api}${isfilm ? 'film':'episode'}/${id}`,{
        credentials:'include'
      }).then(async(resp)=>{
        const data =await resp.json();
        setgoal(data);
        setload(false);
      }).then( fetch(`${import.meta.env.VITE_Api2}observe/check/${id}`).then(async(res)=>{
        if(!res.ok){
          setcheck(false);
          console.log("no");
        }
      }))
      
    } catch (error) {
      console.log(error);
      setload(false);
    }
  },[]);
  useEffect( ()=>{
    if(star<1){
return;
    }
    let data;
    if(!check){
      data ={accumalator:star};
    }else{
      data = {
        accumalator:star,
        isfilm: isfilm,
        Name:goal._id
      };
    }
    const fetchdata = async ()=>{ 
      const url = !check ? "/"+id :"";
        await fetch(`${import.meta.env.VITE_Api2}observe${url}`,{
    method:!check ? "PUT": "POST",
    headers:{
      'Content-Type':'application/json'
    }, 
     body:JSON.stringify(data),
   }).then(async(res)=>
  { const dat  = await res.json();
    console.log(dat);
    if(check){
      setcheck(false);
    }
  });
  }
    try {
      fetchdata();
    } catch (error) {
      alert(error.message);
      
    }

  },[star]);
  return (
    <div className="flex flex-col bg-robin-900 ">
     
    <div className="flex  justify-between"  onMouseOver={()=>setout(true)}
       onMouseOut={()=>setout(false)} >
         
      <img src="/left.png" alt=""  className={ out ? "block h-[20px] w-[20px] cursor-pointer hover:w-[30px]" : " hidden  "}
      
   
       onClick={GoHome} />  
        {load? <Spinner loading={load} size={40}/>: <VideoPlayer
    playref={playerref}
    url={goal.path}
    /> }
     
    <div className="flex flex-col rounded-xl m-1 p-2  bg-robin-800 shadow-2xl shadow-robin-950 w-[500px] max-h-[400px] overflow-auto">
      <p className="m-2 text-white-50 text-center text-bold text-3xl">Same Types</p>
  <NextPlay
goals={ans}
  />
    </div>
    </div>
      <div className="flex justify-between">
      <div className="flex flex-col rounded-xl m-2 p-2 shadow-2xl shadow-robin-950 bg-robin-800   w-[800px] h-auto max-h-[400px]">
      <p className="text-white-50 text-3xl text-bold text-center">{goal.Tittle}</p>
      <div className="flex  justify-between">
        <img src={heart ? "/heart.png" : "/heart2.png"} alt="" className="h-[40px] w-[40px] cursor-pointer transition duration-300 hover:shadow-xl  " onClick={AddLike} />
        <div className="flex">
        <img src={star == 0 || star<5? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl  " onClick={()=>setstar(5)}/>
        <img src={star == 0 || star<4? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl "  onClick={()=>setstar(4)}/>
        <img src={star == 0 || star<3? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl " onClick={()=>setstar(3)}/>
        <img src={star == 0 || star<2? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl " onClick={()=>setstar(2)}/>
        <img src={star == 0 ? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl " onClick={()=>setstar(1)}/>
        </div>
      </div>
      <p className="text-white-50 text-xl rounded-xl shadow-lg p-2">
        {goal.Description}
      </p>
    </div>
<div className="flex flex-col rounded-xl m-2 p-2  shadow-robin-950 shadow-2xl bg-robin-800 w-[450px]  max-h-[200px] overflow-auto">
<NextPlay
goals={ans}/>
</div>
      </div>
    </div>
    
  );
};

const PlayLoader  = async ({params})=>{
  const {id} = params;
  let data;
  let cat;
  const res = await fetch(`${import.meta.env.VITE_Api}film/${id}`,{credentials:'include'});
  const ep= await fetch(`${import.meta.env.VITE_Api}episode/${id}`,{credentials:'include'});
  
  const res2 = await fetch(`${import.meta.env.VITE_Api}film`);
  const res3 = await fetch(`${import.meta.env.VITE_Api}series`);
 if(!res2.ok || !res3.ok){
  console.log("error fetching data");
} 
 const data2 = await res2.json();
  const data3 = await res3.json();
  if(!res.ok){
     data = await ep.json();
     const temp= data3.find((s)=>s._id == data.serie_id);
     cat = temp.category.toLowerCase().split(" ");
  }else{
      data = await res.json();
       cat = data.category.toLowerCase().split(" ");
  }


let all = [];

data2.forEach(elt => {
  if((elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[1]) ) || 
  (elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[3]) ) ||
(elt.category.toLowerCase().includes(cat[1])  &&  elt.category.toLowerCase().includes(cat[3]) ) ){
  if (elt._id != data._id) {
    all.push( {data:elt ,film:true} );
  }
    
  }
});
data3.forEach(elt => {
  if((elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[1]) ) || 
  (elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[3]) ) ||
(elt.category.toLowerCase().includes(cat[1])  &&  elt.category.toLowerCase().includes(cat[3]) )  ){
  if (elt._id != data._id) {
    all.push({data:elt ,film:false});
  }
    
  }
});

return(all);
  
}
export {Playerpage as default  , PlayLoader};  