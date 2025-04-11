


const NextPlay = ({goals}) => {
   if(!goals || goals.length === 0) return null; // Return null if no goals are available  
  return (
   goals.map(
    (next)=>
        <div key={next.data._id} className="rounded-xl shadow-lg m-2 flex justify-between">
            <div className="flex">
            <img src={next.data.thumbail} alt="" className="h-[50px] w-[50px] rounded-xl m-2" />
            <p className="text-white-50 font-sans text-xl m-2  text-end">{next.data.Tittle}</p></div>
       
           <a href={`${import.meta.env.VITE_Api3}${next.film ? `play/film/${next.data._id}`:`${next.serie_id == null ? "series":"play/episode" }/${next.data._id}` }`}> <img src="/play.png" alt="" className="h-[30px] w-[30px]  cursor-pointer"/></a>
        </div>
    
   )
  )
}

export default NextPlay