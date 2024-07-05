import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Store } from "../../../redux/redux";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

function OpenMenu() {
  const Ref = useRef(null);
  const [open, setOpen] = useState(Store.getState().menu.open);

  const OpenMenu = () => {
    var OpenStatus = Ref.current.classList.contains('Closed') ? false : true;
    Store.dispatch({
      type: 'Open',
      payload: OpenStatus
    });
  }

  useEffect(() => {
    const handleStateChange = () => {
      setOpen(Store.getState().menu.open);
    };
    Store.subscribe(handleStateChange);
 
  }, []);
window.onresize = (event)=> {
  if(window.innerWidth > 972) {
    Store.dispatch({
      type: 'Open',
      payload: false
    });
  }
}
useEffect(()=> {
  if(open == true) {
document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = 'visible'
  }
},[open])
const [hide, setHide] = useState(Store.getState().userHidEl.open);
useEffect(() => {
    const handleStateChange = () => {
      setHide(Store.getState().userHidEl.open);
    };
    Store.subscribe(handleStateChange);

  }, []);

  return (
    <div style={hide ? {display:'none'}:{display:'block'}} ref={Ref} onClick={OpenMenu} className={open ? 'Closed BtnOpenMenu' : 'Open BtnOpenMenu'}>
      {open ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
    </div>
  );
}

export default OpenMenu;
