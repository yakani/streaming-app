import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify/unstyled";
import Spinner from "../Component/Spinner";

const SeriePage = ({check}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const goal = useLoaderData();
    const [episode,setepisode] = useState([]);
    const [loading,setloading] = useState(true);
    useEffect(()=>{
        
    if(!check){
        navigate('/');
    }

try {
    fetch(`${import.meta.env.VITE_Api}episode/byseries/${id}`).then(async(rep)=>
    {
        if(!rep.ok){
            const data1 = await rep.json();
            setloading(false);
            throw new Error(data1);
        }
        const data = await rep.json();
        console.log(data);
        setepisode(data);
        setloading(false);

    }
        );
       

} catch (error) {
    toast.error(error);
}

    },[])
    return (
        <div  className=" flex flex-col ">
           <div className="flex justify-between m-4"> 
            
            <img src="/left.png" alt="" className="w-[40px] h-[40px] shadow-lg shadow-robin-950 cursor-pointer" 
            onClick={()=>navigate('/view')} />
            <div className={`flex flex-col  bg-center w-[500px] h-[300px] justify-between p-4  rounded-lg shadow-3xl shadow-robin-950 cursor-pointer hover:bg-[url(/black.jpg)]`}
            style={{backgroundImage:`url(${goal.thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                
                <div className="flex justify-center m-2">
                    <img src="/play.png" alt="" className="m-2  cursor-pointer w-[30px]" />
                
                </div>
                <p className="text-5xl m-2 text-white-50 text-center mb-4">{goal.Tittle}</p>
                <p className="text-white-50 text-2xl overflow-hidden">{goal.Description}</p>
            </div>
            <div className="flex">
            <img src="/search.png" alt=""  className="w-[40px] h-[40px] shadow-lg shadow-robin-950 m-1 cursor-pointer"
            onClick={()=>navigate('/search')}/>
            </div>
            
           </div>
           <div className="flex flex-wrap justify-center ">
            {loading ? <Spinner loading={loading} size={40}/>:( episode.length == null ? 
            
            <div  className={`flex flex-col justify-center items-center  bg-center  rounded-lg bg-center w-[200px] h-[200px]  hover:bg-[url(/black.jpg)] `
            } style={{backgroundImage:`url(${episode.thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                <p className="text-white-50 text-center text-2xl ">{episode.Tittle}</p>
          
                <img src="/play.png" alt=""  className="w-[30px] h-[30px] shadow-lg shadow-robin-950 cursor-pointer"
                onClick={()=>navigate('/play/episode/'+episode._id)} /></div> : episode.length == 0? <p className="text-white-50 text-4xl text-center m-2">Series not avialable yet..</p> : episode.map(ep=>
            <div key={ep._id} className={`flex flex-col justify-center items-center   bg-center rounded-lg bg-center w-[200px] h-[200px]  hover:bg-[url(/black.jpg)] `}
            style={{backgroundImage:`url(${ep.thumbail})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                <p className="text-white-50 text-center text-2xl ">Episode 1</p>
          
                <img src="/play.png" alt=""  className="w-[30px] h-[30px] shadow-lg shadow-robin-950 cursor-pointer"
                onClick={()=>navigate('/play/episode/'+ep._id)} /></div>
               
            ))}
              

              
           </div>
        </div>
    );
};
const SerieLoader = async ({params})=>{

    try {
        const resp = await fetch(`${import.meta.env.VITE_Api}series/${params.id}`);
        const data = await resp.json();
        return data;
        
    } catch (error) {
        console.log(error);
    }
}

export {SeriePage as default, SerieLoader}  