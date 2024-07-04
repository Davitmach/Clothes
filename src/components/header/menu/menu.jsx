import anime from 'animejs';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store } from '../../../redux/redux';
function Menu() {
    const [open, setOpen] = useState(Store.getState().open);

    const [activeLink, setActiveLink] = useState('');
    const Location = useLocation();
    useEffect(() => {
        setActiveLink(Location.pathname)
    }, [Location.pathname])

    useEffect(() => {
        anime({
          targets: 'a',
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
          setOpen(Store.getState().open);
        };
        Store.subscribe(handleStateChange);
     
      }, []);
useEffect(()=> {
    Store.dispatch({
        type: 'Open',
        payload: false
      });
},[Location])

     

    return (
        <div className={`Menu_box ${open ?"Active_menu":'Disable_menu'}`}><ul>

            <li><Link className={activeLink == '/' ? 'Active' :''} onClick={() => {
                setActiveLink('/')
            }} to={'/'}>Shop</Link></li>
            <li><Link className={activeLink =='/men'? 'Active' :'' } onClick={() => {
                setActiveLink('/men')
            }} to={'/men'}>Men</Link></li>
            <li><Link className={activeLink =='/women' ? 'Active' :''} onClick={() => {
                setActiveLink('/women')
            }} to={'/women'}>Women</Link></li>
            <li><Link className={activeLink == '/combos'? 'Active' :''} onClick={() => {
                setActiveLink('/combos')
            }} to={'/combos'}>Combos</Link></li>
            <li><Link className={activeLink =='/joggers'? 'Active' :''} onClick={() => {
                setActiveLink('/joggers')
            }} to={'/joggers'}>Joggers</Link></li>
        </ul></div>
    )
}
export default Menu