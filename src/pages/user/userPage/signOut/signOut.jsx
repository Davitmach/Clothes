import { useNavigate } from 'react-router-dom';
import './signOut.scss'
import { Store } from '../../../../redux/redux';
import { useEffect } from 'react';
function SignOut() {
    const Navigate = useNavigate();
    function RemoveStorage() {
     localStorage.removeItem('logged');
 localStorage.removeItem('mail');
 localStorage.removeItem('id');

    }

useEffect(()=> {
    RemoveStorage()
    Navigate('/',{replace:true})
    Store.dispatch({
        type:'Logout'
      })
},[])
}
export default SignOut