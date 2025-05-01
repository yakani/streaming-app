import {create} from "zustand"
import { axiosInstance } from "../lib/axios.config"
import {toast} from "react-toastify"
export const useAuthstore = create((set,get)=>({
    user:null,
    islogining:false,
    islogout:false,
    ischecking:false,
    isupdating:false,
    checkAuth:async()=>{
        try {
            set({ischecking:true});
            const res  = await axiosInstance.get('user');
            set({user:res.data});
           
        } catch (error) {
            console.log(error.message);
        }finally{
             set({ischecking: false});
        }
    },
    adminlogin:async(data)=>{
        set({islogining:true});
        try {
            const res = await axiosInstance.post('user/admin',data);
            set({user:res.data});
            toast.success("login in");
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({islogining:false});  
        }
    },
    login:async(data)=>{
        try {
            set({isloging:true});
            const res = await axiosInstance.post('user/login',data);
            set({user:res.data});
            toast.success("login");
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({isloging: false});
        }
    },
    register:async(data)=>{
        try {
            set({isloging:true});
            const res = await axiosInstance.post('user',data);
            set({user:res.data});
            toast.success("login");
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({isloging: false});
        }
    },
    updateuser:async(data)=>{
        set({isupdating:true});
        try {
            const res = await axiosInstance.put('user',data);
            set({user:res.data});
            
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({isupdating:false});
        }
    },
    logout:async()=>{
        if(!get().user){
            return;
        }
        try {
            const res = await axiosInstance.post('user/logout');
            set({user:null});
            toast.success("logout");
            
        } catch (error) {
            toast.error(error.message);
            
        }
    }

}));