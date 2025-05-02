import { useEffect, useRef, useState } from "react";
import NextPlay from "../Component/NextPlay";
import VideoPlayer from "../Component/VideoPlayer";
import { useNavigate, useParams } from "react-router";
import Spinner from "../Component/Spinner";
import { useproduct } from "../Store/Productstore";
import { Obserstore } from "../Store/Observation";
import Nextskeleton from "../Component/skeleton/nextskeleton";
import { useAuthstore } from "../Store/Authstore";
import { EyeIcon, Loader, PlusCircle, Send, X} from "lucide-react";
const Playerpage = ({isfilm ,}) => {
  const playerref = useRef(null);
  const {id} = useParams();
  const { user} = useAuthstore();
  const { sample , selecte   , isloadingsample , sampleCategory, setdatahis} = useproduct();
  const {AddLike ,AddStar, ischeck, checkstar ,message , getmessage ,
    isuploadingmessage, Go, InsertMessage, playhistory}  = Obserstore();
  const ans = sample;

  const [heart,setheart] = useState(false);
  const [check,setcheck] = useState(false);
  const [out,setout] = useState(false);
  const [star,setstar] = useState(0);
  const [goal,setgoal] = useState(selecte);
  const [viewall,setviewall] = useState(false);
  const [messages,setmessages] = useState(message);
  const [lastcomment,setlastcomment] = useState( message[message.length-1] || {});
  const [clickcomment,setclickcomment] = useState(false);
  const [text,setText] = useState("");
  const navigate = useNavigate();

useEffect(()=>{
  sampleCategory();
  getmessage(id);
  setgoal(selecte);
},[selecte]);
useEffect(()=>{
setmessages(message);
setlastcomment(message[message.length-1]);

},[message]);

const  Addlike = ()=>{
  if(heart){
    return;
  }
  AddLike({id,Like:1});
  setheart(true);
} 
const GoHome = ()=>{
  
  let time = playerref.current ? playerref.current.getCurrentTime():0;

  const data = isfilm ? {
    
film_id:id,
Duration:time,
  }:{ episode_id:id,
    Duration:time
  };
return data;
//navigate("/view");
}
useEffect(()=>{
  const data = GoHome();
  setdatahis(data);
  Go(true);
},[playerref.current ? playerref.current.getCurrentTime():0]);
const Increase= (data)=>{
  if(check)return;
  setstar(data);
}
const Comments = async(data)=>{
  InsertMessage(data);
  setText("");
}

  useEffect( ()=>{
    const checker = async()=>{
       await checkstar({id});
    }
    checker();
    if(star<1 || check)
    {
          return;
    }
    let data;
    if(!ischeck){
      data ={accumalator:star};
    }else{
      data = {
        accumalator:star,
        isfilm: isfilm,
        Name:goal._id
      };
    }
    AddStar(data);
    setcheck(true);
  },[star]);
  if(isloadingsample){
    return <div className="skeleton h-32 w-32"></div>
  }
  return (
    <div className="flex flex-col bg-robin-900 ">
     
    <div className="flex  w-full"  onMouseOver={()=>setout(true)}
       onMouseOut={()=>setout(false)} >
         
     
         <VideoPlayer
         time={goal?.play !== undefined ? goal.play : 0}
    playref={playerref}
    url={goal.path}
    sub={goal.subtittle}
    /> 
     

    </div>
      <div className="flex justify-between">
      <div className="flex flex-col rounded-xl m-2 p-2 shadow-2xl shadow-robin-950 bg-robin-800   w-[800px] h-auto max-h-[400px]">
      <p className="text-white-50 text-3xl text-bold text-center">{goal.Tittle}</p>
      <div className="flex  justify-between">
        <img src={heart ? "/heart.png" : "/heart2.png"} alt="" className="h-[40px] w-[40px] cursor-pointer transition duration-300 hover:shadow-xl  " onClick={Addlike} />
        <div className="flex">
        <img src={star == 0 || star<5? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl  " onClick={()=>Increase(5)}/>
        <img src={star == 0 || star<4? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl "  onClick={()=>Increase(4)}/>
        <img src={star == 0 || star<3? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl " onClick={()=>Increase(3)}/>
        <img src={star == 0 || star<2? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl " onClick={()=>Increase(2)}/>
        <img src={star == 0 ? "/star.png":"/star1.png"} alt="" className="h-[40px] m-1 w-[40px] cursor-pointer transition duration-300 hover:shadow-xl " onClick={()=>Increase(1)}/>
        </div>
      </div>
      <p className="text-white-50 text-xl p-2 overflow-auto max-h-[200px] ">
        {goal.Description.length > 200 ? goal.Description.slice(0, 200) + "..." : goal.Description}
      </p>
      <div className="flex flex-col justify-between p-3 m-2 max-w-[600px] max-h-[300px] bg-robin-900 rounded-xl shadow-lg shadow-robin-950">
             <div className="flex justify-between p-1">
              <p className="text-white-50 text-2xl m-1">Commenti</p>
              <button>
                {viewall ? <X size={22} className="text-bittersweet-400" onClick={()=>setviewall(false)}/> : <EyeIcon size={22} className="text-bittersweet-400" onClick={()=>setviewall(true)}/>}
              </button>
              <button>
                <PlusCircle size={22} className="text-bittersweet-400" onClick={()=>setclickcomment(false)}/>
              </button>
              
            </div>


            {
              isuploadingmessage?
              <Loader/> : !clickcomment ?<>
             
            <div className="flex justify-between p-1">
              <img src={user.avatar} alt=""  className="rounded-full w-[30px] h-[30px]"/>
              <input type="text" className="bg-robin-900 text-white-50 w-[400px] h-[40px] rounded-xl p-2"
               placeholder="Add a comment"  onChange={(e)=>setText(e.target.value)} value={text}/>
               <button 
               className="btn-circle"
               disabled = {!text.trim()}
               onClick={()=>Comments({comment:text,user_id:user._id,file_id:goal._id})}
               >
                <Send size={22} className="text-bittersweet-400"/>
               </button>
               <button>
                <X size={22} className="text-bittersweet-400" onClick={()=>setclickcomment(true)}/>
               </button>
            </div></> :
            viewall  && messages.length > 1?
          
           messages.map((item,index)=>(
              <div key={index} className="flex flex-col p-2 m-1 bg-robin-900 rounded-xl shadow-lg shadow-robin-950">
                <div className="flex justify-between p-1">
                  <img src={item.user_id.avatar|| "/avatar.png"} alt="" className="rounded-full w-[30px] h-[30px]" />
                  <p className="text-white-50 text-xl">{item.comment}</p>
                </div>
  
              </div>
            ))
            :lastcomment ?  <div className="flex justify-center  p-1">
              <img src={lastcomment.user_id.avatar || "/avatar.png"} alt=""  className="rounded-full w-[30px] h-[30px] m-2"/>
             <p className="text-white-50 text-center text-xl m-2">{lastcomment.comment}</p>
            </div>:<div className="flex justify-center p-1 m-2">
              <img src={ "/avatar.png"} alt=""  className="rounded-full w-[30px] h-[30px] m-2"/>
             <p className="text-white-50 text-center text-xl m-2">no comment yet...</p>
            </div>
            }
            
        
      </div>
  
    </div>
    <div className="flex flex-col rounded-xl m-1 p-2  bg-robin-800 shadow-2xl shadow-robin-950 w-[500px] max-h-[400px] overflow-auto">
      <p className="m-2 text-white-50 text-center text-bold text-3xl">Same Types</p>
    <NextPlay
goals={ans}
  />
    </div>

      </div>
    </div>
    
  );
};


export {Playerpage as default  };  