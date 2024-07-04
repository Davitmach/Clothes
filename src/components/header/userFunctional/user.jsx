import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import anime from 'animejs';
import { useEffect,useState } from "react";
import { Store } from '../../../redux/redux';
function UserFunctional() {
  const [open, setOpen] = useState(Store.getState().open);

    useEffect(() => {
        anime({
          targets: '.Func',
         opacity:[0,1],
         translateY:[80,0],
         delay:anime.stagger(60),
          duration: 400,
          easing:'easeInOutQuad'
        
        });
      }, []);

      useEffect(() => {
        const handleStateChange = () => {
          setOpen(Store.getState().open);
        };
        Store.subscribe(handleStateChange);
     
      }, []);

return(
    <div className={`User_func ${open ? 'Active_func' : 'Disable_func'}`}>
<div className="Liked Func"><FontAwesomeIcon icon={faHeart}/></div>
<div className="User Func"><FontAwesomeIcon icon={faUser}/></div>
<div className="Cart Func"><FontAwesomeIcon icon={faCartShopping}/></div>

    </div>
)
}
export default UserFunctional