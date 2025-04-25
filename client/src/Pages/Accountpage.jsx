import {  useState } from "react";
import Spinner from "../Component/Spinner";
import { useNavigate } from "react-router";
import { useAuthstore } from "../Store/Authstore";
import { Camera, Mail, User } from "lucide-react";
const AccountPage = ()=>{
const {user ,updateuser, isupdating} = useAuthstore();
const navigate = useNavigate();
const [click,setclick] = useState(false);
const [name , setname] = useState(user.name);
const [selectedImg, setSelectedImg] = useState(user.avatar || "/avatar.png");
const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateuser({ image: base64Image });
    };
  };

const save = async ()=>{
    updateuser({name});
}


return<>
<div className="flex m-4 p-4   flex-col justify-center bg-robin-900">

<div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isupdating ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isupdating}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isupdating ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
  
    <div className="flex justify-between p-3 border rounded-xl shadow-xl m-3 shadow-robin-950 min-h[500px]">
      <label htmlFor="" className="flex">
        <User className="w-[40px] h-[40px] text-white-50 " />
        <p className="text-white-50 text-center text-3xl  p-1 m-1 ">name :</p>
        </label>
        {click ? 
        <input type="text" className="text-white-50 bg-transparent text-center text-2xl shadow-lg p-1 m-1 " 
        value={name} onChange={(e)=>setname(e.target.value)}/>:
        <p className="text-white-50 text-center text-2xl  p-1 m-2 ">{name}</p>}
        <img src={click ? "/cross.png":"/pencil.png"}  className="w-[20px] h-[20px] cursor-pointer" onClick={()=>setclick(!click)}/>
      
    </div>
    <div className="flex justify-between p-3 border rounded-xl shadow-xl m-3 shadow-robin-950 min-h[500px]">
        <label htmlFor="" className="flex">
        <Mail className="w-[40px] h-[40px] text-white-50 " />
        <p className="text-white-50 text-center text-3xl  p-1 m-1 ">email :</p>
        </label>
        <p className="text-white-50 text-center text-2xl shadow-lg p-1 m-1 ">{user.email}</p>
        
    </div>
    {
        click ? <div className="flex justify-center p-3  rounded-xl shadow-xl m-3 shadow-robin-950 min-h[500px]">
            <button className="bg-bittersweet-400  text-white-50 text-xl text-center p-3 rounded-xl  hover:bg-bittersweet-900" onClick={save}>{isupdating ? <Spinner loading={isupdating} size={20} /> : "save"}</button>
    </div>:<></>
    }
    

</div>

</>

}


 export {AccountPage as  default}  ;