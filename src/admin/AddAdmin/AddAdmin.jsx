import './AddAdmin.scss';
import axios from 'axios';
import GetData from '../../hook/getData/getData';
import { SetData, SetDataWithQueryClient } from '../../hook/setData/setData';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { logDOM } from '@testing-library/react';
function AddAdmin() {

const AdminId = localStorage.getItem('AdminId')
const [role,setRole] = useState('Jr.Helper')
const [menu,setMenu] = useState(false);

   const GetAdmins = async (id) => {
      const { data } = await axios.get(`http://clothes/admin/getAdmins.php`);
      return data;
    };
  const FuncAdmin= async (info) => {
    return await axios.post("http://clothes/admin/funcAdmin.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const {
   mutate,data: funcData,isSuccess: funcSuccess,error: DelError,} = SetDataWithQueryClient(FuncAdmin, "FuncAdmin","getAdminUsers");
    const { data, isSuccess, error } = GetData(GetAdmins, "getAdminUsers");
    useEffect(()=> {
console.log(funcData);

    },[funcData])

    const DeleteAdmin = (adminId)=> {
      mutate({
      adminId:adminId,
      myId:AdminId,
      payload:'delete'
      })
      
    }

const {register,handleSubmit,formState:{errors}} = useForm()
const Handler = (data)=> {
   const AddAdmin = {...data,role:role}
   mutate({
      payload:'add',
      info:AddAdmin
   })
   
}

 return(<div className='Add_admin_container'>
    <div className='Add_admin_box'>
<form action="" onSubmit={handleSubmit(Handler)}>
   <input {...register('name')} type="text" placeholder='Enter a name!!' required />
   <input {...register('password')} minLength={8} type="text" placeholder='Enter a password!!' required />
<div className="Choose_role_box">
   <div className='Current_role'>{role}<FontAwesomeIcon style={menu ? {transform:'rotate(90deg)',transition:'.4s'} : {transform:'rotate(0)',transition:'.4s'} } onClick={()=> setMenu((e)=> !e)} icon={faAngleRight}/></div>
   <div className='Roles' style={menu? {visibility:'visible',opacity:'1'} : {visibility:'hidden',opacity:'0'}}>
      <ul>
         <li onClick={()=> {setRole('Sr.Helper')
            setMenu(false)}}>Sr.Helper</li>
         <li onClick={()=> {setRole('Mid.Helper')
            setMenu(false)
         }}>Mid.Helper</li>
         <li onClick={()=> {setRole('Jr.Helper')
            setMenu(false)
         }}>Jr.Helper</li>
      </ul>
   </div>
</div>
   <button>Add</button>
</form>
    </div>
    <div className='Admins_box'>
      <table>
         <thead>
            <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Role</td>
            <td>Function</td>
            </tr>
         </thead>
         <tbody>
{data?.map((e)=> (
  <tr>
   <td>{e.id}</td>
   <td>{e.name}</td>
   <td>{e.role}</td>
   <td><button onClick={()=> DeleteAdmin(e.id)}>Ban</button></td>
  </tr>
))}
         </tbody>
      </table>
    </div>
 </div>)   
}

export default AddAdmin