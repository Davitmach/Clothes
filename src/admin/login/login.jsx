import { useEffect } from 'react';
import axios from 'axios';
import { SetData } from '../../hook/setData/setData';
import './login.scss';
import { useForm } from 'react-hook-form';
function AdminLogin() {
    const {handleSubmit,register,getValues,formState:{errors}} = useForm();
    const LoginApi = async (info) => {
        return await axios.post('http://clothes/admin/loginAdmin.php', info, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    const {mutate,data,isSuccess,error} = SetData(LoginApi,'LoginAdmin');
    const HandleSubmit=(data)=> {
mutate({
    ...data
})

    }

    useEffect(()=> {
   
        
if(data?.data?.status == 'true') {
    localStorage.setItem('AdminLog',true)
    localStorage.setItem(`AdminId`,data?.data?.id);
    localStorage.setItem(`AdminRole`,data?.data?.role)
    localStorage.setItem(`AdminName`,data?.data?.name)
    window.location.reload()
    
}


    },[data])
return(<div className="Login_container">
    <div className="Title_box"><h1>Login</h1></div>
    <div className="Login_box">
        <form action="" onSubmit={handleSubmit(HandleSubmit)}>
            <div className='Name_box'>
                <label htmlFor="">Name</label>
                <input {...register('name')} type="text" required placeholder='Enter your admin name!' />
            </div>
            <div className='Password_box'>
            <label htmlFor="">Password</label>
            <input {...register('password',{
                minLength:8
            })} type="password" required placeholder='Enter your admin password!' />
            </div>
            <button>Enter</button>
        </form>
    </div>
</div>)
}
export default AdminLogin