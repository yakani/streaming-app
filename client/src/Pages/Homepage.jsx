import { BottomFeature } from "../Component/BottomFeature"
import { useNavigate } from "react-router-dom"
import SwipeComponent from "../Component/SwipeComponent"
import { Link, useLoaderData } from "react-router"
import { useEffect, useState } from "react"

export const Homepage = ({check}) => {
  const navigate = useNavigate();
  const ans =useLoaderData();
  const [all,setall]= useState(ans); 
  return (
    <>
    <section className="home bg-robin-900 bg-[url('/983569.jpg')] bg-center bg-fixed m-0 p-4">
        <div className="flex justify-between   m-2">
           <div><img className="logo w-[105px] h-[100px]  rounded-xl " src="/yak.png"/></div>
           <div>
          
            <Link to={ check ? "/user":"/signin"}>
            <button className=" bg-bittersweet-500 hover:bg-bittersweet-900 transition-discrete duration-2 
            w-[200px] text-white-50 font-bold  rounded-xl  text-xl p-2">{ check ? "Account":"SignIn"}</button></Link>
            
           </div>
        </div>
        <div>
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
    images={all}
    />
   
    <section className="bg-linear-to-t from-robin-600 to-robin-950 m-0 p-4">
      <div>
        <div><p className="text-white-50 text-3xl text-center">Motivi in più per abbonarsi</p></div>
        <div className="nav-links">
        <div className="flex flex-col p-2 rounded-2xl shadow-2xl shadow-robin-950 m-4 bg-bittersweet-500 w-[300px] items-center">
          <p className="text-white-50 text-3xl text-center">Goditi Netflix sulla tua TV</p>
          <p className="text-white-100 text-lg text-center">Guarda Netflix su smart TV, Playstation, Xbox, Chromecast, Apple TV, lettori Blu-ray e molti altri dispositivi.</p>
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
        <div className="flex flex-col p-2 rounded-2xl shadow-2xl shadow-robin-950 m-4 bg-bittersweet-500 w-[300px] items-center">
          <p className="text-white-50 text-3xl text-center">Crea profili per i bambini</p>
          <p className="text-white-100 text-lg text-center">I bambini scoprono nuove avventure in compagnia dei loro personaggi preferiti in uno spazio tutto loro già incluso nel tuo abbonamento</p>
          <div className="flex justify-end h-[100px] w-[100px] m-1"><img src="/1460157.jpg" alt="" className="justify-items-end" /></div>
        </div>
        </div>
      </div>
    </section>
    <BottomFeature/>
    </>
  )
}

const HomeLoader = async ()=>{

  const resp = await fetch(`${import.meta.env.VITE_Api}film`);
  const resp2 = await fetch(`${import.meta.env.VITE_Api}series`);
  if(!resp.ok || !resp2.ok) throw new Error("Error fetching data");
  const data = await resp.json();
  const data2 = await resp2.json();
  const all = data.concat(data2);
  return all;
}
 export {Homepage as default, HomeLoader } 