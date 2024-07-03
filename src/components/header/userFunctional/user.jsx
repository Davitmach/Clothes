import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import anime from 'animejs';
import { useEffect } from "react";

function UserFunctional() {
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
return(
    <div className="User_func">
<div className="Liked Func"><FontAwesomeIcon icon={faHeart}/></div>
<div className="User Func"><FontAwesomeIcon icon={faUser}/></div>
<div className="Cart Func"><FontAwesomeIcon icon={faCartShopping}/></div>

    </div>
)
}
export default UserFunctional