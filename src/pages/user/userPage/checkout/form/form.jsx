import './form.scss';
import { useForm } from 'react-hook-form';
import { SetData } from '../../../../../hook/setData/setData';
import { useEffect } from 'react';
import axios from 'axios';
function Form(props) {
    var Title = props.name;
    var State = props.state;

   
    
    const UserId = localStorage.getItem('id');
    const {register,handleSubmit,formState:{isSubmitted}} = useForm();
    const SetInfo = async (info) => {
        return await axios.post('http://clothes/product/setInfo.php', info, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    const {data,mutate} = SetData(SetInfo,'setInfo');
    useEffect(()=> {
        
        
if(data?.data?.status == 'submit') {
    localStorage.setItem(`${UserId}name`,data.data.name);
    localStorage.setItem(`${UserId}address`,data.data.address);
    localStorage.setItem(`${UserId}submitInfo`,true);
    localStorage.setItem(`${UserId}addressId`,data.data.id)
    window.location.reload();
    
}


    },[data])
    const HandleSubmit = (data)=> {
        mutate({
            address:Title,
            data:data,
            userId:UserId,
            state:State
        })
        
    }

return(
    <div className={`${Title}_box`}>
<div className='Title_box'><h1>{Title} Details</h1></div>
<div className='Form'>
    <form action="" onSubmit={handleSubmit(HandleSubmit)}>
        <div>
            <div className='Title_box'><h1>First Name*</h1></div>
            <div><input {...register('name',{
                required:true
            })} type="text" placeholder='First Name' /></div>
        </div>
        <div>
            <div className='Title_box'><h1>Last Name*</h1></div>
            <div><input {...register('lastname',{
                required:true
            })} type="text" placeholder='Last Name' /></div>
        </div>
        <div>
            <div className='Title_box'><h1>Country / Region*</h1></div>
            <div><input {...register('region',{
                required:true
            })} type="text" placeholder='Country / Region' /></div>
        </div>
        <div>
            <div className='Title_box'><h1>Company Name</h1></div>
            <div><input {...register('company')} type="text" placeholder='Company (optional)' /></div>
        </div>
        <div>
            <div className='Title_box'><h1>Street Address*</h1></div>
            <div><input {...register('address',{
                required:true
            })} type="text" placeholder='House number and street name'/></div>
        </div>
        <div>
            <div className='Title_box'><h1>Apt, suite, unit</h1></div>
            <div><input {...register('house')} type="text" placeholder='apartment, suite, unit, etc. (optional)' /></div>
        </div>
        <div className="Row">
        <div className='City'>
            <div className='Title_box'><h1>City*</h1></div>
            <div><input {...register('city',{
                required:true
            })} type="text" placeholder='Town / City' /></div>
        </div>
        <div className='State'>
            <div className='Title_box'><h1>State*</h1></div>
            <div><input {...register('state',{
                required:true
            })} type="text" placeholder='State' /></div>
        </div>
        <div className='Postal'>
            <div className='Title_box'><h1>Postal Code*</h1></div>
            <div><input {...register('postalCode',{
                required:true
            })} type="text" placeholder='Postal Code' /></div>
        </div>
        </div>
        <div>
            <div className='Title_box'><h1>Phone*</h1></div>
            <div><input {...register('number',{
                required:true,
                 pattern: {
                    value: /^\+?[1-9]\d{1,14}$/, // Регулярное выражение для проверки номера телефона
                    message: 'Введите корректный номер телефона'
                  }
            })} type="text" placeholder='Phone' /></div>
        </div>
        <div className="Submit_info">
            <button>Continue to delivery</button>
        </div>
      
    </form>
</div>
    </div>
)
}
export default Form;