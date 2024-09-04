import { useNavigate } from 'react-router-dom';
import './page.scss'
function Page() {
    const Navigate = useNavigate();
    const Name = localStorage.getItem('AdminName');
    const Role = localStorage.getItem('AdminRole');
    const Logout = ()=> {
localStorage.setItem('AdminLog',false)
// window.location.reload() 
Navigate('/admin/login',{replace:true})
    }
return(
    <div className="Page_container">
    <div className="Name">
        <label htmlFor="">Your Name</label>
        <div>{Name}</div>
    </div>
    <div className="Role">
        <label htmlFor="">Your role</label>
        <div>{Role}</div>
    </div>
    <button onClick={()=> Logout()}>Logout</button>
    </div>
)
}
export default Page;