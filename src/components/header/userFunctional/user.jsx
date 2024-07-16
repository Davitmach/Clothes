import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import anime from 'animejs';
import { useEffect, useState } from "react";
import { Store } from '../../../redux/redux';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function UserFunctional() {

  const [open, setOpen] = useState(Store.getState().menu.open);
const [logged,setLog] = useState(Store.getState().regged.regged)
  useEffect(() => {
    anime({
      targets: '.Func',
      opacity: [0, 1],
      translateY: [80, 0],
      delay: anime.stagger(60),
      duration: 400,
      easing: 'easeInOutQuad'

    });
  }, []);

  useEffect(() => {
    const handleStateChange = () => {
      setOpen(Store.getState().menu.open);
    };
    Store.subscribe(handleStateChange);

  }, []);
  useEffect(() => {
    const handleStateChange = () => {
      setLog(Store.getState().regged.regged);
    };
    Store.subscribe(handleStateChange);

  }, []);

  const [hide, setHide] = useState(Store.getState().userHidEl.open);
  useEffect(() => {
      const handleStateChange = () => {
        setHide(Store.getState().userHidEl.open);
      };
      Store.subscribe(handleStateChange);
  
    }, []);


  return (
    <div style={hide ? {display:'none'}:{display:'flex'}} className={`User_func ${open ? 'Active_func' : 'Disable_func'}`}>
      <div className="Liked Func"><Link  ><FontAwesomeIcon icon={faHeart} /></Link></div>
      <div  className="User Func"><Link  to={logged ? '/men':'/login'}><FontAwesomeIcon icon={faUser} /></Link></div>
      <div className="Cart Func"><Link ><FontAwesomeIcon icon={faCartShopping} /></Link></div>

    </div>
  )
}
export default UserFunctional