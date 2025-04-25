import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./Navbar"
const Main = ()=>{

    return <>
    <ToastContainer/>
    <Navbar/>
    <Outlet/>
    
    </>
}
export default Main;