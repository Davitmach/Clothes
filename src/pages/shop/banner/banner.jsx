import { Link } from 'react-router-dom';
import './banner.scss';

function Banner() {
return(
    <div className='Banner_box'>
        <div className='Info_box'>
            <div><h1>WE MADE YOUR EVERYDAY FASHION BETTER!</h1></div>
            <div><p>In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p></div>
            <div className='Button'><Link to={'/men'}>Shop Now</Link></div>
        </div>
        <div className='Img_box'></div>
    </div>
)
}
export default Banner