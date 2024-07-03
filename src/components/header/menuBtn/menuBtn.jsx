import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Store } from "../../../redux/redux";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

function OpenMenu() {
  const Ref = useRef(null);
  const [open, setOpen] = useState(Store.getState().open);

  const OpenMenu = () => {
    var OpenStatus = Ref.current.classList.contains('Closed') ? false : true;
    Store.dispatch({
      type: 'Open',
      payload: OpenStatus
    });
  }

  useEffect(() => {
    const handleStateChange = () => {
      setOpen(Store.getState().open);
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
  return (
    <div ref={Ref} onClick={OpenMenu} className={open ? 'Closed BtnOpenMenu' : 'Open BtnOpenMenu'}>
      {open ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
    </div>
  );
}

export default OpenMenu;
