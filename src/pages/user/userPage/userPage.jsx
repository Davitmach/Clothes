import './userPage.scss'
import { Link, Outlet, useLocation} from "react-router-dom";
import { useState,useEffect } from 'react';
import { Store } from "../../../redux/redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {faUser,faHeart} from '@fortawesome/free-regular-svg-icons'

function UserPage() {
    const Navigate = useNavigate();

    const [submit, setSubmit] = useState(Store.getState().userInfoSubmit.submited);
    const [activeLink,setActive] = useState('');
    useEffect(() => {
        const handleStateChange = () => {
          setSubmit(Store.getState().userInfoSubmit.submited);
        };
        Store.subscribe(handleStateChange);
    
      }, []);

      const GetName = ()=> {
        return(
            <h1>Hello </h1>
        );
      }
      useEffect(()=> {
if(submit == false) {
Navigate('setMyInfo',{replace:true})
setActive('myinfo')
}
      },[])
const HandleActiveLink = (link)=> {
    setActive(link)
}
return(
    <>
 
    <div className="User_page_container">
    <div className="Choose_page_container">
        <div className="Title_box">
            {submit ? <div className="Title">{submit ? GetName() : ''}</div> : ''}

<div className="Description"><p>Welcome to your Account</p></div>
        </div>
        <div className='Change_page_box'>
            <div><Link className={`${activeLink == 'cart' ? 'Active' :''}`} onClick={()=> HandleActiveLink('cart')}  to={'cart'}>
            <div className='Icon_box'><FontAwesomeIcon icon={faBagShopping}/></div>
            <div><span>My orders</span></div>
            </Link></div>
            <div><Link  className={`${activeLink == 'wishlist' ? 'Active' :''}`} onClick={()=> HandleActiveLink('wishlist')} to={'wishlist'}>
            <div className='Icon_box'><FontAwesomeIcon icon={faHeart}/></div>
            <div><span>Wishlist</span></div>
            </Link></div>
            <div><Link  className={`${activeLink == 'myinfo' ? 'Active' :''}`} onClick={()=> HandleActiveLink('myinfo')} to={submit ? 'myInfo' : 'setMyInfo'}>
            <div className='Icon_box'><FontAwesomeIcon icon={faUser}/></div>
            <div><span>My info</span></div>
            </Link></div>
            <div><Link to={'signOut'}>
            <div className='Icon_box'><FontAwesomeIcon icon={faRightFromBracket}/></div>
            <div><span>Sign out</span></div>
            </Link></div>
        </div>
    </div>
    <div className="Container_box">{<Outlet/>}</div>
    </div>

    </>
)
}
export default UserPage;