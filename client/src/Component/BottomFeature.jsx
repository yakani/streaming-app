

export const BottomFeature = () => {
  const repi = [1,2,3,4];
  return (
   <section className="iniziale bg-robin-900">
    <div>
    <p className="text-white-50 text-4xl text-center">Film, serie TV e tanto altro, senza limiti</p>
            <p className="text-white-100 text-2xl text-center">A partire da 6,99 €. Disdici quando vuoi.<br/>
                Vuoi guardare Netflix? Inserisci lindirizzo email per abbonarti o riattivare il tuo abbonamento.</p>
                <div className="indirizzo"><input type="text"  className="h-[50px] p-2  rounded-xl text-xl m-1 border-white" placeholder="Indrizzo email"/>
            <button className="bg-bittersweet-500 text-white-50 w-[200px] font-bold font-sans rounded-xl border-orange hover:bg-bittersweet-900 text-xl p-1"><a href="http://localhost:7000/auth/google">Envia</a></button></div>
    </div>
    <div>
        <p className="text-white-100 text-2xl text-center">Domande? Chiama il numero 800669767</p>
    </div>
    <div className="flex justify-between">
      {repi.map(
        (rep)=> <div key={rep} className="flex flex-col p-2 m-2">
        <p className="text-white-200  text-lg underline  "><a href="" className="text-white-200 hover:text-white-100">Domande frequenti</a></p>
        <p className="text-white-200 text-lg underline "><a href="" className="text-white-200 hover:text-white-100">Rapporti con gli investitori</a></p>
        <p className="text-white-200 text-lg underline "><a href="" className="text-white-200 hover:text-white-100">Come guardare yak</a></p>
        <p className="text-white-200 text-lg underline "><a href="" className="text-white-200 hover:text-white-100">Informazioni sullazienda</a></p>
      </div>
      )}
     
 
    </div>
    <div className="flex m-1">
      <img src="/yak.png" className="w-[40px] h-[40px] rounded-lg" />
        <p className="text-white-50 text-3xl ">Yak ita</p>
    </div>
   </section>
  )
}
