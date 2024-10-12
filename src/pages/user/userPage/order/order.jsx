import { useEffect, useRef, useState } from 'react';
import './order.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Order() {
    const  [activeLink,setActiveLink] = useState('active');
    const [visible,setVisible] = useState(true);
    const [width,setWidth] = useState(window.innerWidth);
    const Location = useLocation();
    const menuRef = useRef();

    window.addEventListener('resize',()=> {
        setWidth(window.innerWidth);
        
        
    })
    useEffect(()=> {
var ActiveElement =document.querySelector('.Order_container > .Menu_box .Active');
menuRef.current.style.left = `${ActiveElement.offsetLeft}px`;
menuRef.current.style.width = `${ActiveElement.offsetWidth}px`;

    },[activeLink,width])

    useEffect(()=> {
if(Location.pathname.includes('details/')) {
    setVisible(false)
    
}
else {
    setVisible(true)
}
if(Location.pathname.includes('cancel')) {
    setActiveLink('cancel');
}
else if(Location.pathname.includes('active')) {
    setActiveLink('active');
}
else if(Location.pathname.includes('complete')) {
    setActiveLink('complete');
}
    },[Location.pathname])
return(
    <div className='Order_box'>
        <div className='Title_box' style={visible == true ? {display:'flex'} : {display:'none'}} >
            <h1>My Orders</h1>
        </div>
        <div className='Order_container'>
            <div className='Menu_box' style={visible == true ? {display:'flex'} : {display:'none'}} >
                <div onClick={()=> {
                    setActiveLink('active');
                }} className={`${activeLink == 'active' ? 'Active' :''}`}><Link to={'/user/order/active'}>Active</Link></div>
                <div onClick={()=> {
setActiveLink('cancel');
                }} className={`${activeLink == 'cancel' ? 'Active' :''}`}><Link to={'/user/order/cancel'}>Cancelled</Link></div>
                <div onClick={()=> {
setActiveLink('complete');
                }} className={`${activeLink == 'complete'? 'Active' :''}`}><Link to={'/user/order/complete'}>Completed</Link></div>
                <div className="Slide" ref={menuRef}></div>
            </div>
            <div className='Orders'>
                <Outlet/>
            </div>
        </div>
    </div>
)
}
export default Order;