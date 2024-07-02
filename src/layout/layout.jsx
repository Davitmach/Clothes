
import './layout.scss';
import { Link, Outlet } from 'react-router-dom';
import Title from '../hook/Title/title';

function Layout() {
  Title();

return(
    <>
    <header>Header</header>
    <Outlet/>
    <footer>Footer</footer>
    </>
)
}
export default Layout