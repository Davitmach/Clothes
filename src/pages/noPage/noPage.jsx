import { Link } from 'react-router-dom';
import './noPage.scss';
function NoPage() {
    return(
        <div className='Not_found_page'>
            <div className='Img_box'>
                <div className='Img'><img src={`${process.env.PUBLIC_URL}/noPage/noPage.jpeg`}/></div>
                <div className='Error_404'>
                    <h1>4</h1>
                    <h1>0</h1>
                    <h1>4</h1>
                </div>
            </div>
            <div className='Description_box'>
                <div className='Title'><h1>Oops! Page not found</h1></div>
                <div className='Description'><p>The page you are looking for might have been removed or
                temporarily unavailable.</p></div>
            </div>
            <div className='Go_home'><Link to={'/'}>Back to HomePage</Link></div>
        </div>
    )
}
export default NoPage