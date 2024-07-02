import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Title() {
    var Location = useLocation();
    useEffect(()=> {
    if(Location.pathname == '/') {
     document.title = 'Home';
    }
    else if(Location.pathname == '/about') {
     document.title = 'About';
    }
    else if(Location.pathname == '/blog') {
     document.title = 'Blog';
    }
    else {
     document.title = 'Not Found';
    }
    },[Location])
}
export default Title;