import { useState,useEffect } from "react"
import { useLocation } from "react-router-dom"
function UseUserFuncActive() {
    const [activeLink,setActive] = useState('')
    const Location = useLocation();
    useEffect(()=> {
        HandleActiveLink(Location.pathname)
     
        
        },[Location])
const HandleActiveLink = (link) => {
setActive(link)
}
return {HandleActiveLink,activeLink}
}
export default UseUserFuncActive;