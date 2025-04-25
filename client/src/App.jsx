//import React from 'react'
import {  
  Route,
  Navigate,
  Routes, } from "react-router-dom"
  import {  Homepage } from "./Pages/Homepage"
import { Signin } from "./Pages/Signin"
import RegisterPage from "./Pages/RegisterPage"
import ViewPage from "./Pages/ViewPage"
import SearchPage from "./Pages/SearchPage"
import DowloadPage from "./Pages/DowloadPage"
import Playerpage from "./Pages/Playpage"
import AccountPage from "./Pages/Accountpage"
import GoalRegister from "./Pages/Insertgoal"
import Main from "./Component/Mainlayout"
import Episode from "./Pages/Episodeinsert"
import { AdminSignin } from "./Pages/Admin"
import SeriePage from "./Pages/SeriePage"
import { useAuthstore } from "./Store/Authstore"
import {Loader} from "lucide-react"
import { useEffect } from "react"
import { useproduct } from "./Store/Productstore"

 
const App = () => {

   const {user, checkAuth ,ischecking} = useAuthstore();
   const { getfilm,getseries,getranks,gethistory,getallepisodes } = useproduct();
   useEffect(()=>{
    getfilm();
    getseries();
    getallepisodes();
    getranks();
    gethistory();
    checkAuth();
   },[checkAuth])
   if(ischecking){
    return(
      <div className="flex items-center justify-center h-screen">
       <Loader className='size-10 animate-spin'/>
      </div>);
   }

  return(
     <div>
    <Routes>
      <Route path="/register" element={ !user ? <RegisterPage/>: <Navigate to={"/view"}/>}/>
    <Route path="/signin" element={!user ? <Signin/>: <Navigate to={"/view"}/>}/>
<Route path="/"  element={<Main/>}>
    <Route path="/series/:id" element={user ? <SeriePage  /> : <Navigate to={"/signin"}/>} />
    <Route path="/admin/login" element={ <AdminSignin/>}/>
    <Route path="/episode/:id" element={user ?<Episode/> : <Navigate to={"/signin"}/>} />
    <Route path="/play/film/:id" element={ user ? <Playerpage isfilm={true} />: <Navigate to={"/signin"}/>} />
    <Route path="/play/episode/:id" element={ user ? <Playerpage isfilm={false} />: <Navigate to={"/signin"}/>} />
    <Route path="/download" element={user ? <DowloadPage/>: <Navigate to={"/signin"}/>}/>
    <Route path="/search" element={user ? <SearchPage />: <Navigate to={"/signin"}/>}  />
    
    <Route path="/user" element={user ?<AccountPage/>: <Navigate to={"/signin"}/>}  />
    <Route path="/view" element={user ?<ViewPage />: <Navigate to={"/signin"}/>}  />
    <Route path="/admin" element={user && user.isadmin ?<GoalRegister  />: <Navigate to={"/signin"}/>} />
    <Route  index element={<Homepage />} />
    </Route>
    </Routes>
  </div>)
}

export default App


