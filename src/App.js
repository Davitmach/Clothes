import {
  Navigate,
  BrowserRouter,
  Routes,
  Route,
  useRoutes,
  useLocation,
} from "react-router-dom";
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
import Admin from "./admin/admin";
import Users from "./admin/users/users";
import AdminLogin from "./admin/login/login";
import Page from "./admin/page/page";
import AddAdmin from "./admin/AddAdmin/AddAdmin";
import Log from "./admin/log/log";
import useCheckBan from "./hook/checkBan/checkBan";
import Product from "./admin/product/product";
import ProductPage from "./pages/productPage/productPage";
import Description from "./pages/productPage/description/description";
import Comments from "./pages/productPage/comments/comment";
import Questions from "./pages/productPage/questions/questions";
import { useEffect } from "react";
import Checkout from "./pages/user/userPage/checkout/checkout";
import Order from "./pages/user/userPage/order/order";
import OrderPlaced from "./pages/orderPlaced/orderPlaced";
import Active from "./pages/user/userPage/order/active/active";
import Cancel from "./pages/user/userPage/order/cancel/cancel";
import Complete from "./pages/user/userPage/order/complete/complete";
import Details from "./pages/user/userPage/order/details/details";
import axios from "axios";
import GetData from "./hook/getData/getData";
function App() {
  useCheckBan();

  const id = localStorage.getItem('id');
  const GetOrderDate = async (id) => {
    const { data } = await axios.get(
      `http://clothes/order/checkStatus.php?id=${id}`
    );
    return data;
  };
  const {data} = GetData(()=> GetOrderDate(id),'getOrderDate');
  useEffect(()=> {
console.log(data,'qqa');

  },[data])
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Shop />} />
            <Route path="men" element={<Men />} />
            <Route path="orderPlaced" element={<OrderPlaced />} />
            <Route path="/productPage/:id" element={<ProductPage />}>
              <Route index element={<Navigate to="description" replace />} />
              <Route path="description" element={<Description />} />
              <Route path="comments" element={<Comments />} />
              <Route path="questions" element={<Questions />} />
            </Route>
            <Route path="women" element={<Women />} />
            <Route path="cart" element={<Cart />} />
            <Route path="combos" element={<Combos />} />
            <Route path="joggers" element={<Joggers />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="user" element={<UserPage />}>
              <Route path="myInfo" element={<MyInfo />} />
              <Route path="signOut" element={<SignOut />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="cart" element={<Cart />} />
              <Route path="setMyInfo" element={<SetMyInfo />} />
              <Route path="order" element={<Order />} >
              <Route path="details/:id" element={<Details/>}/>
              <Route index element={<Navigate to="active" replace />} />
              <Route path="active" element={<Active/>}/>
              <Route path="cancel" element={<Cancel/>}/>
              <Route path="complete" element={<Complete/>}/>
              </Route>
            </Route>
            <Route path="resetPass" element={<ResetPass />} />
            <Route path="checkMail" element={<CheckMail />} />
            <Route path="resetVerif" element={<ResetVerif />} />
            <Route path="createPass" element={<CreatePass />} />
            <Route path="admin" element={<Admin />}>
              <Route path="Users" element={<Users />} />
              <Route path="login" element={<AdminLogin />} />
              <Route path="page" element={<Page />} />
              <Route path="admins" element={<AddAdmin />} />
              <Route path="log" element={<Log />} />
              <Route path="product" element={<Product />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
