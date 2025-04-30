import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify/unstyled";
import Spinner from "../Component/Spinner";
import { useproduct } from "../Store/Productstore";

const SeriePage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { selecte , episodeserie ,  isloadingep,getepisodeserie } = useproduct();
    const goal = selecte;
   useEffect(()=>{
    getepisodeserie();
   },[getepisodeserie]);
   if(isloadingep){
    return(
        <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>   
    )
   }
   console.log(episodeserie);

    return (
        <div  className=" flex flex-col ">
           <div className="flex justify-between m-4"> 
            
            
            <div className={`flex flex-col  bg-center w-[500px] h-[300px] justify-between p-4  rounded-lg shadow-3xl shadow-robin-950 cursor-pointer hover:bg-[url(/black.jpg)]`}
            style={{backgroundImage:`url(${goal.thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                
             
                <p className="text-5xl m-2 text-white-50 text-center mb-4">{goal.Tittle}</p>
                <p className="text-white-50 text-2xl overflow-hidden">{goal.Description}</p>
            </div>
           
            
           </div>
           <div className="flex flex-wrap justify-center ">
            {isloadingep ? <Spinner loading={isloadingep} size={40}/>:( episodeserie.length == null ? 
            
            <div  className={`flex flex-col justify-center items-center  bg-center  rounded-lg bg-center w-[200px] h-[200px]  hover:bg-[url(/black.jpg)] `
            } style={{backgroundImage:`url(${episodeserie.thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                <p className="text-white-50 text-center text-2xl ">{episodeserie.Tittle}</p>
          
                <img src="/play.png" alt=""  className="w-[30px] h-[30px] shadow-lg shadow-robin-950 cursor-pointer"
                onClick={()=>navigate('/play/episode/'+episodeserie._id)} /></div> : episodeserie.length == 0? <p className="text-white-50 text-2xl text-center m-2">Series not avialable yet....</p> : episodeserie.map(ep=>
            <div key={ep._id} className={`flex flex-col justify-center items-center   bg-center rounded-lg bg-center w-[200px] h-[200px]  hover:bg-[url(/black.jpg)] `}
            style={{backgroundImage:`url(${ep.thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                <p className="text-white-50 text-center text-2xl ">Episodeserie 1</p>
          
                <img src="/play.png" alt=""  className="w-[30px] h-[30px] shadow-lg shadow-robin-950 cursor-pointer"
                onClick={()=>navigate('/play/episode/'+ep._id)} /></div>
               
            ))}
              

              
           </div>
        </div>
    );
};

export {SeriePage as default}  