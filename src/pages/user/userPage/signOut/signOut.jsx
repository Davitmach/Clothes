import { useNavigate } from 'react-router-dom';
import './signOut.scss'
import { Store } from '../../../../redux/redux';
import { useEffect } from 'react';
function SignOut() {
    const Navigate = useNavigate();
    function RemoveStorage() {
     localStorage.removeItem('logged');
 localStorage.removeItem('mail');
 var id =localStorage.getItem('id');
 localStorage.removeItem(`${id}name`);
 localStorage.removeItem('id'); 
 localStorage.removeItem('code')


  
    }

useEffect(()=> {
    RemoveStorage()
    Navigate('/',{replace:true})
    Store.dispatch({
        type:'Logout'
      })

      Store.dispatch({
        type:'NoSubmit'
      })
},[])
}
export default SignOut