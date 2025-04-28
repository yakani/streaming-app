import { create } from "zustand";
import { todoInstance } from "../lib/todo";
import { useproduct } from "./Productstore";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios.config";
export const Obserstore = create((set,get)=>({
playhistory:false,
isupdating: false,
message:[],
isuploadingmessage:false,
ischeck:false,
ishistory:false,
Go:(t)=>set({ishistory:t}),
setplayhistory:(t)=>set({playhistory:t}),
AddLike:async(data)=>{
    try {
        set({isupdating:true});
        const res = await todoInstance.put(`observe/${data.id}`,data);
        toast.success("Like added successfully");
    } catch (error) {
        console.log(error.message);
    }finally{
        set({isupdating:false});
    }
},
checkstar:async(data)=>{
    try {
        set({isupdating:true});
        const resp = await todoInstance.get(`observe/check/${data.id}`);
        if(resp.ok){
            set({ischeck:true}); 
        }else{
            set({ischeck:false});
             console.log(resp.data);
        }
       
       
    } catch (error) {
        console.log(error.message);
    
    }finally{
        set({isupdating:false});
    }
},
AddStar:async(data)=>{
    try {
        set({isupdating:true});
        if(get().ischeck){
            const rep = await todoInstance.post(`observe`,data);
        }else{const res = await todoInstance.put(`observe/${data.id}`,data);}
        toast.success("Star added successfully");
    } catch (error) {
        console.log(error.message);
    }finally{
        set({isupdating:false});
    }
},
getmessage:async(id)=>{
    
    set({isuploadingmessage:true});
    try {
        const res = await axiosInstance.get(`comment/${id}`);
        set({message:res.data});
    } catch (error) {
        console.log(error.message);
    }finally{
        set({isuploadingmessage:false});
    }

},
InsertMessage:async(data)=>{
    set({isuploadingmessage:true});
    try {
        const res = await axiosInstance.post(`comment`,data);
        get().getmessage(data.file_id);
        toast.success("Comment added successfully");
    } catch (error) {
        console.log(error.message);
    }finally{
        set({isuploadingmessage:false});
    }
},
}));