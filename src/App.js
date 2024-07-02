
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/layout";
import NoPage from "./pages/noPage/noPage";
import Home from "./pages/home/home";
import Blog from "./pages/blog/blog";
import About from "./pages/about/about";



function App() {



  
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
