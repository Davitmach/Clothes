import './emptyWish.scss';
import { Link } from 'react-router-dom';
function EmptyWish() {
return(
<div className='Wish_empty_box'>
    <div className="Empty">
    <div className='Icon_box'><svg width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="85" cy="85" r="85" fill="#F0F9F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M85.4787 63.46C79.2557 56.2078 68.8785 54.257 61.0815 60.8978C53.2845 67.5387 52.1868 78.6418 58.3098 86.4959C63.4007 93.0261 78.8074 106.799 83.8569 111.256C84.4218 111.755 84.7043 112.005 85.0338 112.103C85.3214 112.188 85.636 112.188 85.9236 112.103C86.2531 112.005 86.5355 111.755 87.1005 111.256C92.15 106.799 107.557 93.0261 112.648 86.4959C118.771 78.6418 117.807 67.4688 109.876 60.8978C101.945 54.3269 91.7017 56.2078 85.4787 63.46Z" stroke="#28A642" stroke-width="6.225" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
    <div className='Info_box'>
        <div><h1>Your wishlist is empty.</h1></div>
        <div><span>You don’t have any products in the wishlist yet. You will find a lot
        of interesting products on our Shop page.</span></div>
    </div>
    <div className='Shop_btn'><Link to={'/men'}>Continue Shopping</Link></div>
</div>
</div>
)
}
export default EmptyWish;