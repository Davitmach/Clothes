import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Title() {

    var Location = useLocation();
    useEffect(() => {
        if (Location.pathname == '/') {
            document.title = 'Shop';
        }
        else if (Location.pathname == '/men') {
            document.title = 'Men';
        }
        else if (Location.pathname == '/women') {
            document.title = 'Women';
        }
        else if (Location.pathname == '/combos') {
            document.title = 'Combos';
        }
        else if (Location.pathname == '/joggers') {
            document.title = 'Joggers';
        }
else if(Location.pathname == '/login') {
    document.title = 'Login'
}

        else {
            document.title = 'Not Found';
        }
    }, [Location])
}
export default Title;