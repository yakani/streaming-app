import { useNavigate } from "react-router";



const Parameter = ({isOpen=false}) => {
 const navigate = useNavigate();

  return (
    <section className={ isOpen ? "block transition duration-400 bg-robin-900": "hidden transition duration-400 bg-robin-900"}>
        <div className=  "flex  justify-between">
            <div>
               
            </div>
          
            <div className="flex flex-col p-4 justify-end">
             <div className='flex cursor-pointer justify-end '>
            <img src="/user.png" className='rounded-xl  w-[30px] h-[30px] m-2'/>
            <p className='text-white-50 text-2xl m-1' onClick={()=>navigate("/user")}> Account</p>
        </div> 
          <div className='flex cursor-pointer  justify-end'>
            <img src="/pencil.png" className='rounded-xl  w-[30px] h-[30px] m-2'/>
            <p className='text-white-50 text-2xl m-1'> Gestire account</p>
        </div>
       
        <div className='flex cursor-pointer justify-end '>
            <img src="/settings.png" className='rounded-xl w-[30px] h-[30px] m-2'/>
            <p className='text-white-50 text-2xl m-1'> Impostazione</p>
        </div>
        <div className='flex cursor-pointer justify-end'>
            <img src="/sign.png" className='rounded-xl w-[30px] h-[30px] m-2'/>
            <p className='text-white-50 text-2xl m-1'> Logout</p>
        </div></div>
   

    </div>
    </section>
    
  );
};

export default Parameter;
