import anime from 'animejs';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store } from '../../../redux/redux';
function Menu() {
    const [open, setOpen] = useState(Store.getState().menu.open);
const UserId = localStorage.getItem('id')
    const [activeLink, setActiveLink] = useState('');
    const Location = useLocation();
    useEffect(() => {
        setActiveLink(Location.pathname)
    }, [Location.pathname])

    useEffect(() => {
        anime({
          targets: '.Menu_link',
         opacity:[0,1],
         scale:[
            {value:.4},
            {value:1.2},
            {value:1}
         ],
         delay:anime.stagger(60),
          duration: 800,
          easing: 'easeInOutQuad'
        });
      }, []);
      useEffect(() => {
        const handleStateChange = () => {
          setOpen(Store.getState().menu.open);
        };
        Store.subscribe(handleStateChange);
     
      }, []);
useEffect(()=> {
    Store.dispatch({
        type: 'Open',
        payload: false
      });
},[Location])



const [hide, setHide] = useState(Store.getState().userHidEl.open);
useEffect(() => {
    const handleStateChange = () => {
      setHide(Store.getState().userHidEl.open);
    };
    Store.subscribe(handleStateChange);

  }, []);

    return (
        <div style={hide ? {display:'none'}:{display:'flex'}}  className={`Menu_box ${open ?"Active_menu":'Disable_menu'}`}><ul>

            <li><Link className={activeLink == '/' ? 'Active Menu_link' :' Menu_link'} onClick={() => {
                setActiveLink('/')
              
                  var Wait = localStorage.getItem(`${UserId}wait`);
                  if(Wait) {
                      localStorage.setItem(`${UserId}submitInfo`,true);
                      localStorage.removeItem(`${UserId}wait`)
                  }
            }} to={'/'}>Shop</Link></li>
            <li><Link className={activeLink =='/men'? 'Active Menu_link' :' Menu_link' } onClick={() => {
                setActiveLink('/men')
                var Wait = localStorage.getItem(`${UserId}wait`);
                if(Wait) {
                    localStorage.setItem(`${UserId}submitInfo`,true);
                    localStorage.removeItem(`${UserId}wait`)
                }
            }} to={'/men'}>Men</Link></li>
            <li><Link className={activeLink =='/women' ? 'Active Menu_link' :' Menu_link'} onClick={() => {
                setActiveLink('/women')
                var Wait = localStorage.getItem(`${UserId}wait`);
                if(Wait) {
                    localStorage.setItem(`${UserId}submitInfo`,true);
                    localStorage.removeItem(`${UserId}wait`)
                }
            }} to={'/women'}>Women</Link></li>
            <li><Link className={activeLink == '/combos'? 'Active Menu_link' :' Menu_link'} onClick={() => {
                setActiveLink('/combos')
                var Wait = localStorage.getItem(`${UserId}wait`);
                if(Wait) {
                    localStorage.setItem(`${UserId}submitInfo`,true);
                    localStorage.removeItem(`${UserId}wait`)
                }
            }} to={'/combos'}>Combos</Link></li>
            <li><Link className={activeLink =='/joggers'? 'Active Menu_link' :' Menu_link'} onClick={() => {
                setActiveLink('/joggers')
                var Wait = localStorage.getItem(`${UserId}wait`);
                if(Wait) {
                    localStorage.setItem(`${UserId}submitInfo`,true);
                    localStorage.removeItem(`${UserId}wait`)
                }
            }} to={'/joggers'}>Joggers</Link></li>
        </ul></div>
    )
}
export default Menu