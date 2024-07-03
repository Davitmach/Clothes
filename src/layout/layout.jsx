
import './layout.scss';
import { Link, Outlet } from 'react-router-dom';
import Title from '../hook/Title/title';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
function Layout() {
    Title();

    return (
        <>
            <Header />
            <Outlet />
            <Footer/>
        </>
    )
}
export default Layout