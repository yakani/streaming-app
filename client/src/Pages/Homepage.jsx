import { BottomFeature } from "../Component/BottomFeature"
import { useNavigate } from "react-router-dom"
import SwipeComponent from "../Component/SwipeComponent"
import { Link } from "react-router"
import { useAuthstore } from "../Store/Authstore"
import { useproduct } from "../Store/Productstore"
import { Loader } from "lucide-react"

export const Homepage = () => {
  const navigate = useNavigate();
  const { user }= useAuthstore();
  const check = user ? true : false;
  const { films , series ,isloading } = useproduct();
  if(isloading ){
    return(
      <div className="flex items-center justify-center h-screen">
       <Loader className='size-10 animate-spin'/>
      </div>);
   }

  return (
    <>
    <section className="home bg-robin-900 bg-[url('/983569.jpg')] bg-center bg-fixed m-0 p-4 h-[100vh]">
    
        <div className="flex flex-col justify-center items-center h-full bg-black-50 bg-opacity-50 rounded-2xl">
            <p className="text-white-50 text-center text-3xl">Film, serie TV e tanto altro, senza limiti</p>
            <p className="text-white-50 text-3xl text-center">A partire da 6,99 €. Disdici quando vuoi.<br/>
                Vuoi guardare Netflix? Inserisci lindirizzo email per abbonarti o riattivare il tuo abbonamento.</p>
                <div className="flex justify-center m-2">
            <button
             className=" bg-bittersweet-500 text-white-50 font-bold w-[200px] h-[80px] 
             rounded-xl border-orange text-xl p-1 hover:bg-bittersweet-900 "
             onClick={()=>navigate( !check ? '/signin': '/view')}
             >Avvia</button></div>
 
        </div>
    </section>
 <SwipeComponent
    ishome={true}
    images={films}
    />
   
    <section className="bg-linear-to-t from-robin-600 to-robin-950 m-0 p-4">
      <div>
        <div><p className="text-white-50 text-3xl text-center">Motivi in più per abbonarsi</p></div>
        <div className="flex justify-between flex-wrap">
        <div className="flex flex-col p-2 rounded-2xl shadow-2xl shadow-robin-950 m-4 bg-bittersweet-500 w-[300px] items-center  ">
          <p className="text-white-50 text-3xl text-center sm:text-2xl">Goditi Netflix sulla tua TV</p>
          <p className="text-white-100 text-lg text-center ">Guarda Netflix su smart TV, Playstation, Xbox, Chromecast, Apple TV, lettori Blu-ray e molti altri dispositivi.</p>
          <div className="flex justify-end h-[100px] w-[100px] m-1"><img src="/back.webp" alt="" className="justify-items-end" /></div>
        </div>
        <div className="flex flex-col p-2 rounded-2xl shadow-2xl shadow-robin-950 m-4 bg-bittersweet-500 w-[300px] items-center">
          <p className="text-white-50 text-3xl text-center">Scarica le tue serie da guardare offline</p>
          <p className="text-white-100 text-lg text-center">Salva facilmente i tuoi preferiti così avrai sempre qualcosa da guardare.</p>
         <div className="flex justify-end h-[100px] w-[100px] m-1"> <img src="/983569.jpg" alt="" className="justify-items-end" /></div>
        </div>
        <div className="flex flex-col p-2 rounded-2xl shadow-2xl shadow-robin-950 m-4 bg-bittersweet-500 w-[300px] items-center">
          <p className="text-white-50 text-3xl text-center">Guarda Netflix ovunque</p>
          <p className="text-white-100 text-lg text-center">Cellulare, tablet, laptop e TV: scegli tu cosa usare per guardare in streaming film e serie TV senza limiti.</p>
          <div  className="flex justify-end h-[100px] w-[100px] m-1"><img src="/back.webp" alt="" className="justify-items-end" /></div>
        </div>
       
        </div>
      </div>
    </section>
    <BottomFeature/>
    </>
  )
}


 export {Homepage as default } 