
import './header.scss'
import Logo from './logo/logo';
import Menu from './menu/menu';
import Search from './search/search';
import UserFunctional from './userFunctional/user';
import OpenMenu from './menuBtn/menuBtn';
import { useLocation } from 'react-router-dom';
import LoginSignup from './loginsignup/logsignup';
import { useEffect, useState } from 'react';
function Header() {
const Location = useLocation();
const [classList,setClass] = useState(false);
useEffect(()=> {
if(Location.pathname == '/login' ||Location.pathname == '/signup' ) {
    setClass(true)
}
else {
    setClass(false)
}
},[Location.pathname])

    return(
        <header className={classList ? 'Login_signup_class' :''}>
            <Logo/>
            <Menu/>
            <Search/>
            <UserFunctional/>
            <OpenMenu/>
            <LoginSignup/>
        </header>
    )
}

export default Header;