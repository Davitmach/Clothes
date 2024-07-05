
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/layout";
import NoPage from "./pages/noPage/noPage";
import Shop from "./pages/shop/home";
import Combos from "./pages/combos/combos";
import Joggers from "./pages/joggers/joggers";
import Men from "./pages/men/men";
import Women from "./pages/women/women";
import Login from "./pages/user/login/login";

function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/"  element={<Shop />} />
          <Route path="/men" element={<Men/>}/>
          <Route path="/women" element={<Women/>}/>
          <Route path="/combos" element={<Combos/>}/>
          <Route path="/joggers" element={<Joggers/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NoPage/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
