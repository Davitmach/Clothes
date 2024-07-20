import { useState,useEffect } from "react";
import { Store } from "../../../redux/redux";
import { Link, useLocation } from "react-router-dom";
function LoginSignup() {
  const Location = useLocation();
  const [active,setActive] = useState('')
    const [hide, setHide] = useState(Store.getState().userHidEl.open);
    useEffect(() => {
        const handleStateChange = () => {
          setHide(Store.getState().userHidEl.open);
        };
        Store.subscribe(handleStateChange);
    
      }, []);
  useEffect(()=> {
if(Location.pathname =='/login') {
  setActive('login')
}
else if(Location.pathname == '/signup') {
  setActive('signup')
}
else {
  setActive('')
}

  },[Location.pathname])
    return(
        <div style={hide ? {display:'flex'}:{display:'none'}} className="Login_signup_box">
            <div className={active == 'login' ? 'Active' :''}><button><Link to={'/login'}>Login</Link></button></div>
            <div className={active == 'signup' ? 'Active' :''}><button><Link to={'/signup'}>Sign Up</Link></button></div>
        </div>
    )
}
export default LoginSignup