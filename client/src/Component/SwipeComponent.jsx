import { useEffect, useRef ,useState} from "react";
import { useproduct } from "../Store/Productstore";
import { useNavigate } from "react-router";
import { Obserstore } from "../Store/Observation";

const SwipeComponent = ({ishome=true, titolo , images,size="h-[300px] w-[300px]"}) => {
  const galleryRef = useRef(null);
  const { getselected} = useproduct();
  const { Go ,setplayhistory } =  Obserstore();
  let all =[];
  const navigate  = useNavigate();
  const handleClick = (image) => {
    getselected(image);
    const url = image.season == null ? `/play/film/${image._id}`: `${image.serie_id == null ? "/series":"/play/episode" }/${image._id}`;
    if(!url.includes("/series")){
      Go(true);
    }
    navigate(url);
  };




  const swipeLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Function to handle swipe (scroll) right
  const swipeRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
 
  return (
    <section className="flex flex-col justify-center bg-robin-900">{ishome ?  <div >
          
            <div className="flex justify-between p-4 bg-robin-700 rounded-xl shadow-2xl  m-2 shadow-robin-950">
              <img src="/popcorn.png" className="h-[100px] w-[100px] m-1 rounded-xl shadow-2xl shadow-robin-950" alt="" />
               <p className="text-white-50 text-2xl text-center p-2">Tutto ciò che ami di Netflix a soli 6,99 €.<br/>
                Approfitta del nostro piano con pubblicità: è il più conveniente.</p>
                <button type="button" className="text-white-50 p-1 w-[200px] bg-robin-800 rounded-xl hover:bg-robin-950">scopri di più</button>
            </div>
        </div>:<></>}
       
       <p className="text-white-100 text-5xl  font-bold  text-center m-3">{titolo}</p>
        <div className="swap">
        <div className={ishome ? `gallery-container max-w-[${images.length *125}px]`: `gallery-container max-w-[${images.length*200}px]`}>
          {( images.length < 5  && !ishome )   ? <></> :  <button className="swipe-button left" onClick={swipeLeft}>
   <img  src="/left.png"  className="h-[20px] w-[20px] cursor-pointer "/>
      </button>}
    
      <div className="gallery" ref={galleryRef}>
        
        {
        
        images.map((image, index) => (
          <div key={index} className={"gallery-item "+size}>
           
         <img src={image.thumbail} alt={`Gallery item ${index + 1}`}   className=" shadow-xl shadow-robin-950" onClick={()=>handleClick(image)}/>
          </div>
        ))}
      </div>
      { images.length <5 && !ishome  ? <></> :  <button className="swipe-button right" onClick={swipeRight}>
      <img  src="/right.png"  className="h-[20px] w-[20px] cursor-pointer "/>
      </button>}
     
    </div>
        </div>
        
    </section>
  )
}

export default SwipeComponent
