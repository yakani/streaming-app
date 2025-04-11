import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
const Main = ()=>{

    return <>
    <ToastContainer/>
    <Outlet/>
    
    </>
}
export default Main;