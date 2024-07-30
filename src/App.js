
import { BrowserRouter, Routes, Route,useRoutes} from "react-router-dom";
import Layout from "./layout/layout";
import NoPage from "./pages/noPage/noPage";
import Shop from "./pages/shop/home";
import Combos from "./pages/combos/combos";
import Joggers from "./pages/joggers/joggers";
import Men from "./pages/men/men";
import Women from "./pages/women/women";
import Login from "./pages/user/login/login";
import Signup from "./pages/user/signup/signup";
import UserPage from "./pages/user/userPage/userPage";
import ResetPass from "./pages/user/forgotPass/forgotPass";
import CheckMail from "./pages/user/checkMail/checkMail";
import ResetVerif from "./pages/user/resetVerif/resetVerif";
import CreatePass from "./pages/user/createPass/createPass";
import MyInfo from "./pages/user/userPage/myInfo/myInfo";
import SignOut from "./pages/user/userPage/signOut/signOut";
import WishList from "./pages/user/userPage/wishList/wishList";
import Cart from "./pages/user/userPage/cart/cart";
import SetMyInfo from "./pages/user/userPage/setMyInfo/setMyInfo";
function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/"  element={<Shop />} />
          <Route path="men" element={<Men/>}/>
          <Route path="women" element={<Women/>}/>
          <Route path="combos" element={<Combos/>}/>
          <Route path="joggers" element={<Joggers/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="user" element={<UserPage/>}>
          
          <Route path="myInfo" element={<MyInfo/>}/>
          <Route path="signOut" element={<SignOut/>}/>
          <Route path="wishlist" element={<WishList/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="setMyInfo" element={<SetMyInfo/>}/>
          
          </Route>
          <Route path="resetPass" element={<ResetPass/>}/>
          <Route path="checkMail" element={<CheckMail/>}/>
          <Route path="resetVerif" element={<ResetVerif/>}/>
          <Route path="createPass" element={<CreatePass/>}/>
      
          <Route path="*" element={<NoPage/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
