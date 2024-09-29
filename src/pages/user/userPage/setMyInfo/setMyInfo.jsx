import { useForm } from 'react-hook-form';
import './setMyInfo.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SetData } from '../../../../hook/setData/setData';
import { Store } from '../../../../redux/redux';
function SetMyInfo() {
    const { register, handleSubmit, getValues, setValue, formState: { errors, isSubmitted } } = useForm();
    const [edit, setEdit] = useState(false);
    const [address, setAddress] = useState('');
    const [addressId, setAddressId] = useState('');
    const Location = useLocation();
    const Navigate = useNavigate();
    const Data = Location.state;

    useEffect(() => {


        if (Data?.address) {
            setAddress(Data?.currentAddress)
            setAddressId(Data?.addressId);
            setEdit(true);
            const address = Data.address;
            setValue('name', address.name);
            setValue('lastname', address.lastname);
            setValue('country/region', address.country);
            setValue('company', address.company);
            setValue('Street', address.street);
            setValue('home', address.home);
            setValue('City', address.city);
            setValue('State', address.state);
            setValue('phone', address.phone);
            setValue('postalcode', address.postalCode);
            setValue('deliveryinstruction', address.delivery);
            setValue('shipaddress', address.shipping);
            setValue('billingaddress', address.billing);
        }
    }, [Data, setValue]);



    const SetUserInfo = async (data) => {
        return axios.post('http://clothes/users/setInfo.php', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
    const EditAddress = async (data) => {
        return axios.post('http://clothes/users/editAddress.php', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
    const { data, mutate, isSuccess, error } = SetData(SetUserInfo, 'SetUserData');
    const { data: EditAddressData, mutate: EditAdressMutate, isSuccess: EditAddressSuccess, error: EditAddressError } = SetData(EditAddress, 'EditAddress');
    const UserId = localStorage.getItem('id');



    const HandleSubmit = (data) => {

        if (edit) {
            EditAdressMutate({
                info: getValues(),
                address: address,
                chooseAddress: getValues().shipaddress && getValues().billingaddress ? 'both' : getValues().shipaddress ? 'shipping' : getValues().billingaddress ? 'billing' : 'address',
                userId: UserId,
                addressId: addressId
            })
        }
        else {
            mutate({
                ...getValues(),
                userId: UserId
            })

        }
    }
    useEffect(() => {
   
        
   if(data?.data == 'full') {
    Store.dispatch({type:'Submited'});
   Navigate('/user/myInfo',{replace:true})
    

    localStorage.removeItem(`${UserId}wait`);
Store.dispatch({type:'Full'})
    
   }
        if (data?.data?.status == 'true_shipping') {
            Store.dispatch({ type: 'Submited' })
            Navigate('/user/myInfo',{replace:true})
            localStorage.setItem(`${UserId}name`, data.data.name)
            localStorage.setItem(`${UserId}address`, 'shipping')
            localStorage.setItem(`${UserId}addressId`,data.data.addressId)
            localStorage.removeItem(`${UserId}wait`)
   
        }
        else if (data?.data?.status == 'true_billing') {


            Store.dispatch({ type: 'Submited' })
            Navigate('/user/myInfo',{replace:true})
            localStorage.setItem(`${UserId}name`, data.data.name)
            localStorage.setItem(`${UserId}address`, 'billing')
            localStorage.removeItem(`${UserId}wait`)
            localStorage.setItem(`${UserId}addressId`,data.data.addressId)
      
        }
        else if (data?.data?.status == 'true_address') {
            Store.dispatch({ type: 'Submited' })
            Navigate('/user/myInfo',{replace:true})
            localStorage.setItem(`${UserId}name`, data.data.name)
            localStorage.setItem(`${UserId}address`, 'address')
            localStorage.removeItem(`${UserId}wait`)
            localStorage.setItem(`${UserId}addressId`,data.data.addressId)
            
        }
        else if (data?.data?.status == 'true_both') {
            Store.dispatch({ type: 'Submited' })
            Navigate('/user/myInfo',{replace:true})
            localStorage.setItem(`${UserId}name`, data.data.name)
            localStorage.setItem(`${UserId}address`, 'shipping')
            localStorage.removeItem(`${UserId}wait`)
            localStorage.setItem(`${UserId}addressId`,data.data.addressId)
           
        }
    }, [data])
    useEffect(() => {
    
        
        if (EditAddressData?.data == 'update') {
            localStorage.removeItem(`${UserId}wait`);
            localStorage.setItem(`${UserId}submitInfo`,true)
            Store.dispatch({ type: 'Submited' });
           
        
         
Navigate('/user/myInfo',{replace:true})

        }

    }, [EditAddressData])



    return (
        <div className='Set_my_info_container'>
            <div className='Title_container'>
                <div><h1>My Info</h1></div>
                <div><h1>Add Address</h1></div>
            </div>
            <div className='Set_my_info'>

                <form action="" onSubmit={handleSubmit(HandleSubmit)} className='Form'>
                    <div className='First_name_box'>
                        <div className='Label_box'><label>First Name*</label></div>
                        <div className="Input_box"><input  {...register('name', {
                            required: 'The name field is empty!',

                        })} required type="text" placeholder='First Name' /></div>
                    </div>
                    <div className='Last_name_box'>
                        <div className='Label_box'><label>Last Name*</label></div>
                        <div className="Input_box"><input  {...register('lastname', {
                            required: 'The lastname field is empty!'
                        })} required type="text" placeholder='Last Name' /></div>
                    </div>
                    <div className='Country_region_box'>
                        <div className='Label_box'><label>Country / Region*</label></div>
                        <div className="Input_box"><input  {...register('country/region', {
                            required: 'The Country/Region field is empty!'
                        })} required type="text" placeholder='Country / Region' /></div>
                    </div>
                    <div className='Company_name_box'>
                        <div className='Label_box'><label>Company Name</label></div>
                        <div className="Input_box"><input  {...register('company')} type="text" placeholder='Company (optional)' /></div>
                    </div>
                    <div className='Street_name_box'>
                        <div className='Label_box'><label>Street Address*</label></div>
                        <div className="Input_box"><input   {...register('Street', {
                            required: 'The street adress field is empty!'
                        })} required type="text" placeholder='House number and street name' /></div>
                    </div>
                    <div className='Apt_name_box'>
                        <div className='Label_box'><label>Apt, suite, unit</label></div>
                        <div className="Input_box"><input  {...register('home', {

                        })} type="text" placeholder='apartment, suite, unit, etc. (optional)' /></div>
                    </div>
                    <div className='City_name_box'>
                        <div className='Label_box'><label>City*</label></div>
                        <div className="Input_box"><input  {...register('City', {
                            required: 'The city field is empty!'
                        })} required type="text" placeholder='Town / City' /></div>
                    </div>
                    <div className='State_box'>
                        <div className='Label_box'><label>State*</label></div>
                        <div className="Input_box"><input  {...register('State', {
                            required: 'The state field is empty!'
                        })} required type="text" placeholder='State' /></div>
                    </div>
                    <div className='Phone_box'>
                        <div className='Label_box'><label>Phone*</label></div>
                        <div className="Input_box"><input  {...register('phone', {
                            required: 'The phone field is empty!'
                        })} required type="text" placeholder='Phone' /></div>
                    </div>
                    <div className="Postal_code_box">
                        <div className='Label_box'><label>Postal Code*</label></div>
                        <div className="Input_box"><input  {...register('postalcode', {
                            required: 'The postal code field is empty!'
                        })} required type="text" placeholder='Postal Code' /></div>
                    </div>
                    <div className='Delivery_box'>
                        <div className='Label_box'><label>Delivery Instruction</label></div>
                        <div><textarea   {...register('deliveryinstruction')}  id="" placeholder='Delivery Instruction'></textarea></div>
                    </div>
                    <div className="Checkbox" style={edit ? {visibility:'hidden'} : {visibility:'visible'}}>
                        <div className="Set_shiping_box">
                            <input  {...register('shipaddress')} type="checkbox" /><span>Set as default shipping address</span>

                        </div>
                        <div className="Set_billing_box">
                            <input  {...register('billingaddress')} type="checkbox" /><span>Set as default billing address</span>
                        </div>
                    </div>
                    <div className="Submit_box">
                        <div className='Submit'><button>Save</button></div>
                        <div className='Cancel_box'><Link to={'/'} onClick={() => {
                            var Wait = localStorage.getItem(`${UserId}wait`);
                            if (Wait) {
                                localStorage.setItem(`${UserId}submitInfo`, true);
                                localStorage.removeItem(`${UserId}wait`)
                             
                            }
                        }}>Cancel</Link></div>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default SetMyInfo;