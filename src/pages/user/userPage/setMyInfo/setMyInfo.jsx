import { useForm } from 'react-hook-form';
import './setMyInfo.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SetData from '../../../../hook/setData/setData';
function SetMyInfo() {
    const {register,handleSubmit,getValues,formState:{errors,isSubmitted}} = useForm()

const [shipAddress, setShipAddress] = useState(false);
const [billingAddress, setBillingAddress] = useState(false);

const handleShipAddressChange = () => {
    setShipAddress(!shipAddress);
    if (!billingAddress) {
        setBillingAddress(shipAddress);
    }
};

const handleBillingAddressChange = () => {
    setBillingAddress(!billingAddress);
    if (!shipAddress) {
        setShipAddress(billingAddress);
    }
};
const SetUserInfo = async (data) => {
    return axios.post('http://clothes/users/setInfo.php', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
const {data,mutate,isSuccess,error} = SetData(SetUserInfo,'SetUserData');
const UserId = localStorage.getItem('id');
const HandleSubmit = (data) => {

    if (!shipAddress && !billingAddress) {
        alert('Please select at least one address as default.');
        return;
        
    }
    else {
        
        mutate({
            ...getValues(),
userId:UserId
        })
    }

}
useEffect(()=> {
if(data?.status == 'true') {
    console.log(true);
}
},[data])

return(
    <div className='Set_my_info_container'>
        <div className='Title_container'>
            <div><h1>My Info</h1></div>
            <div><h1>Add Address</h1></div>
        </div>
        <div className='Set_my_info'>
           
                <form action="" onSubmit={handleSubmit(HandleSubmit)} className='Form'>
<div className='First_name_box'>
    <div className='Label_box'><label>First Name*</label></div>
    <div className="Input_box"><input {...register('name',{
        required:'The name field is empty!',
        
    })} required type="text" placeholder='First Name' /></div>
</div>
<div className='Last_name_box'>
    <div className='Label_box'><label>Last Name*</label></div>
    <div className="Input_box"><input {...register('lastname',{
        required:'The lastname field is empty!'
    })} required type="text" placeholder='Last Name' /></div>
</div>
<div className='Country_region_box'>
    <div className='Label_box'><label>Country / Region*</label></div>
    <div className="Input_box"><input {...register('country/region',{
        required:'The Country/Region field is empty!'
    })} required type="text" placeholder='Country / Region' /></div>
</div>
<div className='Company_name_box'>
    <div className='Label_box'><label>Company Name</label></div>
    <div className="Input_box"><input {...register('company',{
  
    })} type="text" placeholder='Company (optional)' /></div>
</div>
<div className='Street_name_box'>
    <div className='Label_box'><label>Street Address*</label></div>
    <div className="Input_box"><input {...register('Street',{
        required:'The street adress field is empty!'
    })} required type="text" placeholder='House number and street name' /></div>
</div>
<div className='Apt_name_box'>
    <div className='Label_box'><label>Apt, suite, unit</label></div>
    <div className="Input_box"><input {...register('home',{
   
    })} type="text" placeholder='apartment, suite, unit, etc. (optional)' /></div>
</div>
<div className='City_name_box'>
    <div className='Label_box'><label>City*</label></div>
    <div className="Input_box"><input {...register('City',{
        required:'The city field is empty!'
    })} required type="text" placeholder='Town / City' /></div>
</div>
<div className='State_box'>
    <div className='Label_box'><label>State*</label></div>
    <div className="Input_box"><input {...register('State',{
        required:'The state field is empty!'
    })} required type="text" placeholder='State' /></div>
</div>
<div className='Phone_box'>
    <div className='Label_box'><label>Phone*</label></div>
    <div className="Input_box"><input {...register('phone',{
        required:'The phone field is empty!'
    })} required type="text" placeholder='Phone' /></div>
</div>
<div className="Postal_code_box">
    <div className='Label_box'><label>Postal Code*</label></div>
    <div className="Input_box"><input {...register('postalcode',{
        required:'The postal code field is empty!'
    })} required type="text" placeholder='Postal Code'  /></div>
</div>
<div className='Delivery_box'>
    <div className='Label_box'><label>Delivery Instruction</label></div>
    <div><textarea {...register('deliveryinstruction',{

    })} name="" id="" placeholder='Delivery Instruction'></textarea></div>
</div>
<div className="Checkbox">
<div className="Set_shiping_box">
<input {...register('shipaddress')} type="checkbox" checked={shipAddress} onChange={handleShipAddressChange} /><span>Set as default shipping address</span>

</div>
<div className="Set_billing_box">
<input {...register('billingaddress')} type="checkbox" checked={billingAddress} onChange={handleBillingAddressChange} /><span>Set as default billing address</span>
</div>
</div>
<div className="Submit_box">
    <div className='Submit'><button>Save</button></div>
    <div className='Cancel_box'><Link to={'/'}>Cancel</Link></div>
</div>
                </form>
            </div>
     
    </div>
)
}
export default SetMyInfo;