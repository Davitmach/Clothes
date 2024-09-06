import { Link } from 'react-router-dom';
import './slider.scss';

function Slider() {
return(
    <div className='Slider_box' style={{background:`url(${process.env.PUBLIC_URL}/home/banner/banner.jpeg)`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <div className="Info_box">
<div className="Title1"><span>T-shirt / Tops</span></div>
<div className="Title2"><h1>Summer 
Value Pack</h1></div>
<div className="Description"><p>cool / colorful / comfy</p></div>
<div className="Shop_btn"><Link to={'/men'}>Shop Now</Link></div>
        </div>
    </div>
)
}
export default Slider;