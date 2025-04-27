import {create} from "zustand"
import { axiosInstance, uploadWithProgress } from "../lib/axios.config"
import { todoInstance } from "../lib/todo";
import { toast } from "react-toastify";
export const useproduct = create((set,get)=>({
    films:[],
    series:[],
    ranks:[],
    datahis:null,
    episodeserie:[],
    historys:[],
    episodes:[],
    selecte:null,
    isloading:false,
    isselected:false,
    isloadingep:false,
    isloadinghistory:false,
    isloadingsample:false,
    sample:[],
    progress:0,

    getfilm:async()=>{
        try {
            set({isloading:true});
            const res = await axiosInstance.get('film');
            set({films:res.data});
            
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isloading:false});
        }
    },
    getseries:async()=>{
        try {
            set({isloading:true});
            const res = await axiosInstance.get('series');
            set({series:res.data});
            
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isloading:false});
        }
    },
    getepisodeserie:async()=>{
        const {selecte} = get();
        if(!selecte || selecte.path) return;
        try {
            set({isloadingep:true});
            const res = await axiosInstance.get(`episode/byseries/${selecte._id}`);
            set({episodeserie:res.data});
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isloadingep:false});
        }
    },
    getranks: async()=>{
        try {
            set({isloading:true});
            const res = await todoInstance.get('observe/complete');
            const rank  = res.data;
            const all = [];
            rank.forEach(element => {
                const n = get().films.find(item => item._id == element.name) ;
                const m = get().episodes.find(item => item._id == element.id) ;
                if(n){
                  all.push(n);}
                if(m){
                        const o  = get().series.find(item => item._id == m.serie_id) ;
                        if(o){
                            all.push(o);
                        }
                }
            });
            set({ranks:all});
            
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isloading:false});
        }
    },
    getallepisodes:async()=>{
        try {
            set({isloading:true});
            const res = await axiosInstance.get('episode');
            set({episodes:res.data});
            
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isloading:false});
        }

    },
    gethistory: async()=>{
        try {
            set({isloading:true});
            const res = await axiosInstance.get('history');
            const rank  = res.data;
            const all = [];
            rank.forEach(element => {
                const n = get().films.find(item => item._id == element.film_id) ;
                const m = get().episodes.find(item => item._id == element.episode_id);
                if(n){
                  all.push(n);}
                if(m){
                  all.push(m);}
            });
            set({historys:all});
            
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isloading:false});
        }

    },
    getselected:(data)=>{
        set({isselected:true});
        set({selecte:data});
        set({isselected:false});
    },
    Insertepisode:async(data)=>{
        const {episodes} = get();
        set({isloading:true});
        try {
            const res = await  uploadWithProgress('episode',data,(progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                set( {progress:percentCompleted});
              });
            set({episodes:[...episodes,res.data]});
            toast.success("insert");
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({progress:0});
            set({isloading:false});
        }
    },
    Insertfilm:async(data)=>{
        const { films } = get();
        set({isloading:true});
        try {
            const res = await  uploadWithProgress('film',data,(progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                set( {progress:percentCompleted});
              });
            set({films:[...films,res.data]});
            set({selecte:res.data});
            toast.success("insert");
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({progress:0});
            set({isloading:false});
        }
    },
    Insertserie:async(data)=>{
        const { series } = get();
        set({isloading:true});
        try {
            const res = await  uploadWithProgress('series',data,(progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                set( {progress:percentCompleted});
              });
            set({series:[...series,res.data]});
            set({selecte:res.data});
            toast.success("insert");
        } catch (error) {
            toast.error(error.message);
        }finally{
            set({progress:0});
            set({isloading:false});
        }
    },
    sampleCategory:async()=>{
        
        const { selecte , films , series} = get();
      
        set({isloadingsample:true});
        const cat = selecte.category.toLowerCase().split(" ");
        let all = [];
        films.forEach(elt => {
            if((elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[1]) ) || 
            (elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[3]) ) ||
          (elt.category.toLowerCase().includes(cat[1])  &&  elt.category.toLowerCase().includes(cat[3]) ) ){
            if (elt._id != selecte._id) {
              all.push( {data:elt ,film:true} );
            }    
            }
          });
          series.forEach(elt => {
            if((elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[1]) ) || 
            (elt.category.toLowerCase().includes(cat[0])  &&  elt.category.toLowerCase().includes(cat[3]) ) ||
          (elt.category.toLowerCase().includes(cat[1])  &&  elt.category.toLowerCase().includes(cat[3]) ) ){
            if (elt._id != selecte._id) {
              all.push( {data:elt ,film:false} );
            }
              
            }
          });
          set({sample:all});
          set({isloadingsample:false});
    },
    Addhistory:async(data)=>{
        const {datahis} = get();
        if(!datahis) return;
        set({isloadinghistory:true});
        try {
            const res = await axiosInstance.put('history',data);
            set({historys:[...historys,res.data]});
            //toast.success("insert");
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isloadinghistory:false});
        }
    },
    setdatahis:(data)=>{
        set({datahis:data});
    }

}));