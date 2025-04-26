import { useNavigate } from "react-router";
import { useproduct } from "../Store/Productstore";
import { Obserstore } from "../Store/Observation";
const NextPlay = ({goals}) => {
  const { getselected, Addhistory, datahis} = useproduct();
  const { Go ,ishistory} = Obserstore();
  const navigate = useNavigate();
  const handleClick = (goal) => {
    getselected(goal);
    const url = goal.season == null ? `/play/film/${goal._id}`: `${goal.serie_id == null ? "/series":"/play/episode" }/${goal._id}`;
      if(ishistory){
        Addhistory(datahis);
        Go(false);
      }
    if(!url.includes("/series")){
      Go(true);
    }
    navigate(url);
  }
   if(!goals || goals.length === 0) return null; // Return null if no goals are available  
  return (
   goals.map(
    (next)=>
        <div key={next.data._id} className="rounded-xl shadow-lg m-2 flex justify-between">
            <div className="flex">
            <img src={next.data.thumbail} alt="" className="h-[50px] w-[50px] rounded-xl m-2" />
            <p className="text-white-50 font-sans text-xl m-2  text-end">{next.data.Tittle}</p></div>
       
         <img src="/play.png" alt="" className="h-[30px] w-[30px]  cursor-pointer" onClick={()=>handleClick(next.data)}/>
        </div>
    
   )
  )
}

export default NextPlay