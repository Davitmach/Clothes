import { useState } from 'react';
import './header.scss'
import Logo from './logo/logo';
import Menu from './menu/menu';
import Search from './search/search';
import UserFunctional from './userFunctional/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import OpenMenu from './menuBtn/menuBtn';
import { Store } from '../../redux/redux';
function Header() {

//   const [menu,setMenu]=  useState(false);
    return(
        <header>
            <Logo/>
            <Menu/>
            <Search/>
            <UserFunctional/>
            <OpenMenu/>
            {/* <div onClick={()=> {
                setMenu(!menu)
            }} className='Menu_btn'>{menu ?<FontAwesomeIcon icon={faBars}/> :<FontAwesomeIcon icon={faXmark}/> }</div> */}
        </header>
    )
}

export default Header;