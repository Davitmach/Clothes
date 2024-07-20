
import './layout.scss';
import { Link, Outlet,useLocation } from 'react-router-dom';
import Title from '../hook/Title/title';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { useEffect } from "react";
import { Store } from '../redux/redux';
function Layout() {
    const Location = useLocation();
    Title();
    
    useEffect(()=> {
    if(Location.pathname == '/login') {
      Store.dispatch({type:'Hide'})
    }
    else if(Location.pathname == '/signup') {
        Store.dispatch({type:'Hide'})
    }
    else if(Location.pathname == '/createPass') {
        Store.dispatch({type:'Hide'})
    }
    else if(Location.pathname == '/resetPass') {
        Store.dispatch({type:'Hide'})
    }
    else if(Location.pathname == '/checkMail') {
        Store.dispatch({type:'Hide'})
    }

    else if(Location.pathname == '/resetVerif') {
        Store.dispatch({type:'Hide'})
    }
    else {
        Store.dispatch({type:'Visible'})
    }
    },[Location.pathname])
    return (
        <>
            <Header />
            <Outlet />
            <Footer/>
        </>
    )
}
export default Layout