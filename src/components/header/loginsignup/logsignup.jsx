import { useState,useEffect } from "react";
import { Store } from "../../../redux/redux";
import { useLocation } from "react-router-dom";
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
  },[Location.pathname])
    return(
        <div style={hide ? {display:'flex'}:{display:'none'}} className="Login_signup_box">
            <div className={active == 'login' ? 'Active' :''}><button>Login</button></div>
            <div className={active == 'signup' ? 'Active' :''}><button>Sign Up</button></div>
        </div>
    )
}
export default LoginSignup