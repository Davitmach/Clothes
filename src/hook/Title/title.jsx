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
else if(Location.pathname == '/createPass') {
    document.title = 'Create Password'
}
else if(Location.pathname == '/resetVerif') {
    document.title = 'Reset Verefication'
}
else if(Location.pathname == '/signup') {
    document.title = 'Sign Up'
}
// else if(Location.pathname == '/user/order' ||Location.pathname == '/user' ||Location.pathname == '/user/wishlist' || Location.pathname == '/user/cart' || Location.pathname == '/user/myInfo' ||Location.pathname == '/user/setMyInfo') {
//     document.title = 'User'
// }
else if(Location.pathname.includes('user')) {
    document.title = 'User'
}
else if(Location.pathname == '/resetPass') {
    document.title = 'Reset Password'
}
else if(Location.pathname == '/checkMail') {
    document.title = 'Check Mail'
}
else if(Location.pathname == '/admin') {
    document.title = 'Dashboard'
}
else if(  Location.pathname == '/admin/home' ||Location.pathname == '/admin/login' ||Location.pathname == '/admin/admins' ||Location.pathname == '/admin/log' || Location.pathname == '/admin/Users' ||Location.pathname == '/admin/page' ||Location.pathname == '/admin/product' ||Location.pathname == '/admin/admin'  ) {
    document.title = 'Dashboard'
}
else if(Location.pathname.includes('productPage')) {
    document.title = 'Product'
}
else if(Location.pathname == '/cart') {
    document.title = 'Cart'
}
else if(Location.pathname == '/checkout') {
     document.title = 'Checkout'
}
else if(Location.pathname == '/orderPlaced') {
    document.title = 'Order Placed'
}
        else {
            document.title = 'Not Found';
        }
    }, [Location])
}
export default Title;