//import React from 'react'
import {  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements, } from "react-router-dom"
  import { HomeLoader, Homepage } from "./Pages/Homepage"
import { Signin } from "./Pages/Signin"
import RegisterPage from "./Pages/RegisterPage"
import ViewPage, { RankLoader } from "./Pages/ViewPage"
import SearchPage, { SearchLoader } from "./Pages/SearchPage"
import DowloadPage from "./Pages/DowloadPage"
import Playerpage, { PlayLoader } from "./Pages/Playpage"
import AccountPage, { Userloader } from "./Pages/Accountpage"
import GoalRegister from "./Pages/Insertgoal"
import Main from "./Component/Mainlayout"
import Episode from "./Pages/Episodeinsert"
import { AdminSignin } from "./Pages/Admin"
import SeriePage, { SerieLoader } from "./Pages/SeriePage"
import Check from "./Component/check"

 Check();
 const check =JSON.parse(localStorage.getItem('auth'));
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <> 
    <Route path="/"  element={<Main/>}>
    <Route path="/series/:id" element={<SeriePage check={check.auth} />} loader={SerieLoader}/>
    <Route path="/admin/login" element={<AdminSignin/>}/>
    <Route path="/episode/:id" element={<Episode/>} loader={check.auth}/>
    <Route path="/play/film/:id" element={<Playerpage isfilm={true} checkuser={check.auth}/>} loader={PlayLoader} />
    <Route path="/play/episode/:id" element={<Playerpage isfilm={false} checkuser={check.auth}/>} loader={PlayLoader} />
    <Route path="/download" element={<DowloadPage/>}/>
    <Route path="/search" element={<SearchPage check={check.auth}/>} loader={SearchLoader} />
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/user" element={<AccountPage/>} loader={Userloader} />
    <Route path="/view" element={<ViewPage check={check.auth}/>} loader={RankLoader} />
    <Route path="/admin" element={<GoalRegister  />} />
    <Route  index element={<Homepage check={check.auth}/>} loader={HomeLoader}/>
    </Route>
    </>
  ))
  return <><RouterProvider router={router}/></>
}

export default App

