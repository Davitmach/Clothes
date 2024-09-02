import './myInfo.scss';
import GetData from '../../../../hook/getData/getData';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SetDataWithQueryClient } from '../../../../hook/setData/setData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../../../../redux/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
function MyInfo() {
    const UserId = localStorage.getItem('id');
    const Address = localStorage.getItem(`${UserId}address`);
    const AddressId = localStorage.getItem(`${UserId}addressId`);


    const Navigate = useNavigate();
    const { ref, inView, entry } = useInView({
        
        threshold: 0.6,
      });
      useEffect(()=> {
console.log(inView);

      },[inView])
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()
    const [name, setName] = useState(false);
    const [password, setPassword] = useState(false);
    const [email, setEmail] = useState(false);
    const [phone, setPhone] = useState(false);
    const [Default, setDefault] = useState('');
    const GetApiFn = async (id) => {
        const { data } = await axios.get(`http://clothes/users/getInfo.php?info=${AddressId}/${Address}`)
        return data
    }

    const ChangeUserInfo = async (info) => {
        return await axios.post('http://clothes/users/changeUserInfo.php', info, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }


    const { data, error, isSuccess } = GetData(() => GetApiFn(UserId), ['getUserInfo']);
    const { mutate, error: mutateError, data: mutateData } = SetDataWithQueryClient(ChangeUserInfo, 'ChangeUserInfo', 'getUserInfo')

    const HandleSubmit = (data) => {


    }

    const ChangeStateBtn = (input) => {



        if (input == 'Name') {
            setName(true);
        }
        else if (input == 'Email') {
            setEmail(true);
        }
        else if (input == 'Password') {
            setPassword(true);
        }
        else if (input == 'Phone') {
            setPhone(true);
        }
        if (input == 'Name' && name) {
            setName(false);
            mutate({
                userId: UserId,
                type: 'Name',
                payload: getValues().name,
                address: Address
            })
        }
        else if (input == 'Email' && email) {
            mutate({
                userId: UserId,
                type: 'Email',
                payload: getValues().email,

            })
            setEmail(false);
        }
        else if (input == 'Phone' && phone) {
            mutate({
                userId: UserId,
                type: 'Phone',
                payload: getValues().phone,
                address: Address
            })
            setPhone(false);
        }
        else if (input == 'Password' && password) {
            mutate({
                userId: UserId,
                type: 'Password',
                payload: getValues().password
            })
            setPassword(false)
        }


    }






    // GET ADDRESS




    const FetchGetAddress = async (id) => {
        const { data } = await axios.get(`http://clothes/users/getAddress.php?id=${id}`)
        return data;
    }


    const { data: AddressData, error: AddressError, isSuccess: AddressSuccess } = GetData(() => FetchGetAddress(UserId), 'getUserAddress')
    useEffect(() => {
        console.log(data);

    }, [data])

var Delay = 0;
    const groupAddresses = (addresses, itemsPerGroup) => {
        const groups = [];
        for (let i = 0; i < addresses.length; i += itemsPerGroup) {
            groups.push(addresses.slice(i, i + itemsPerGroup));
        }
        return groups;
    };

    const groupedAddresses = AddressData ? groupAddresses(AddressData, 4) : [];


    const DeleteAddressApi = async (info) => {
        return await axios.post('http://clothes/users/deleteAddress.php', info, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    const SetDefaultApi = async (info) => {
        return await axios.post('http://clothes/users/setDefault.php', info, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    const { mutate: DeleteMutate, isSuccess: DeleteSuccess, error: DeleteError, data: DeleteData } = SetDataWithQueryClient((DeleteAddressApi), 'DeleteAddress', 'getUserAddress');
    const DeleteAddress = (id, addressType) => {
        DeleteMutate({
            id: id,
            addressType: addressType,
            userId: UserId
        })

    }
    useEffect(() => {
        if (DeleteData?.data) {
            localStorage.setItem(`${UserId}name`, DeleteData.data.name);
            localStorage.setItem(`${UserId}addressId`, DeleteData.data.id);
            localStorage.setItem(`${UserId}address`, DeleteData.data.address)
            window.location.reload()



        }
        if (DeleteData?.data == false) {
            Store.dispatch({ type: 'NoSubmit' });
            localStorage.removeItem(`${UserId}address`);
            localStorage.removeItem(`${UserId}addressId`);
            localStorage.removeItem(`${UserId}name`);
            localStorage.removeItem(`${UserId}submitInfo`)
        }

    }, [DeleteData])

    const { mutate: SetDefMutate, isSuccess: SetDefSuccess, error: SetDefError, data: SetDefData } = SetDataWithQueryClient((SetDefaultApi), 'SetDefaultAddress', 'getUserAddress')

    const HandleDef = (id, payload, userId) => {
        SetDefMutate({
            addressId: id,
            payload: payload,
            userId: userId
        })

    }


    useEffect(() => {
        console.log(SetDefData);

        if (SetDefData?.data) {
            localStorage.setItem(`${UserId}name`, SetDefData?.data?.name);
            localStorage.setItem(`${UserId}addressId`, SetDefData?.data?.id);
            localStorage.setItem(`${UserId}address`, SetDefData?.data?.address)
            window.location.reload();
        }

    }, [SetDefData])
    return (
        <div className='My_info_container'>
            <div className='Title_container'>
                <div className="Title_box">
                    <h1>My Info</h1>
                </div>
                <div className="Description_box"><span>Contact Details</span></div>
            </div>
            <div className='My_info_box'>
                <div className="Information_container">
                    <form action="" onSubmit={handleSubmit(HandleSubmit)}>
                        <div className='Name_box'>
                            <div className='Info_box'>
                                <div className='Title_box'><h1>Your Name</h1></div>
                                <div className="User_info">

                                    <div className="Info" style={name ? { visibility: 'hidden' } : { visibility: "visible" }}><span>{data?.name}</span></div>
                                    <div className='Input'><input style={name ? { border: '1px solid #807D7E' } : { border: 'none', visibility: "hidden" }} {...register('name')} type="text" disabled={!name} /></div>

                                </div>
                                <div className="Error_box">
                                    <p></p>
                                </div>
                            </div>
                            <div className='Change_or_add_btn'><button onClick={() => ChangeStateBtn('Name')} >{name ? 'Confirm ' : 'Change'}</button></div>
                        </div>
                        <div className='Email_box'>
                            <div className='Info_box'>
                                <div className='Title_box'><h1>Email Address</h1></div>
                                <div className="User_info">
                                    <div className="Info"><span style={email ? { visibility: 'hidden' } : { visibility: "visible" }}>{data?.email}</span></div>
                                    <div className='Input'><input style={email ? { border: '1px solid #807D7E' } : { border: 'none', visibility: "hidden" }} {...register('email')} type='email' disabled={!email} /></div>

                                </div>
                                <div className="Error_box">
                                    <p></p>
                                </div>
                            </div>
                            <div className='Change_or_add_btn'><button onClick={() => ChangeStateBtn('Email')} >{email ? 'Confirm ' : 'Change'}</button></div>
                        </div>
                        <div className='Phone_box'>
                            <div className='Info_box'>
                                <div className='Title_box'><h1>Phone Number</h1></div>
                                <div className="User_info">
                                    <div className="Info"><span style={phone ? { visibility: 'hidden' } : { visibility: "visible" }}>{data?.phone}</span></div>
                                    <div className='Input'><input style={phone ? { border: '1px solid #807D7E' } : { border: 'none', visibility: "hidden" }} {...register('phone')} type="text" disabled={!phone} /></div>
                                </div>
                                <div className="Error_box">
                                    <p></p>
                                </div>
                            </div>
                            <div className='Change_or_add_btn'><button onClick={() => ChangeStateBtn('Phone')} >{phone ? 'Confirm ' : 'Change'}</button></div>
                        </div>
                        <div className='Password_box'>
                            <div className='Info_box'>
                                <div className='Title_box'><h1>Password</h1></div>
                                <div className="User_info">
                                    <div className="Info"><span style={password ? { visibility: 'hidden' } : { visibility: "visible" }}>• • • • • • • • • •</span></div>
                                    <div className='Input'><input style={password ? { border: '1px solid #807D7E' } : { border: 'none', visibility: "hidden" }} minLength={8} {...register('password')} type="text" disabled={!password} /></div>
                                </div>
                                <div className="Error_box">
                                    <p></p>
                                </div>
                            </div>
                            <div className='Change_or_add_btn'><button onClick={() => ChangeStateBtn('Password')} >{password ? 'Confirm ' : 'Change'}</button></div>
                        </div>
                    </form>
                </div>
                <div className="Address_container">
                    <div className='Title_box'>
                        <div><h1>Address</h1></div>
                        <div className='Add_address'><button onClick={(event) => {
                            event.preventDefault()
                            Store.dispatch({ type: 'NoSubmit' });
                            localStorage.removeItem(`${UserId}submitInfo`)
                            localStorage.setItem(`${UserId}wait`, UserId)
                            Navigate('/user', { replace: true })
                        }}>Add New</button></div>
                    </div>
                    <div className='Addresses_box' ref={ref}>
                  
                            {  groupedAddresses.map((group, index) => (
                                <div className="box" key={index}>
                                    { group.map((address, idx) => (
                                       
                                        <div style={inView ?{animation:`FadeIn .5s ${Delay+=100}ms ease-in-out forwards`}: {animation:'none'}}  className="address" key={idx}>
                                         
                                            <div className={`Set_default ${Default == address.id ? 'Open' : 'Close'}`} style={!address.billing && !address.shipping ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                                <div className='Address'>
                                                    <button onClick={() => HandleDef(address.id, 'shipping', UserId)}>Shipping</button>
                                                    <button onClick={() => HandleDef(address.id, 'billing', UserId)}>Billing</button>
                                                </div>
                                                <div className='Close_btn'><button onClick={() => setDefault('')}><FontAwesomeIcon icon={faXmark} /></button></div>
                                            </div>
                                            <div className='Info_box'>
                                                <div className="Name_box">
                                                    <h1>{address.name} {address.lastname}</h1>
                                                </div>
                                                <div className="Phone_box"><span>{address.phone}</span></div>
                                            </div>
                                            <div className="Home">{address.home ? address.home + ' ' + address.street : address.street}</div>
                                            <div className="Delivery">
                                                {address.delivery ? (<><div className='Delivery_box'>{address.delivery.length > 16 ? address.delivery.substring(0, 16) + '...' : address.delivery}</div>{address.shipping ? (<div className='Default_address'>Default shipping address</div>) : address.billing ? (<div className='Default_address'>Default billing address</div>) : ''}</>) : (<div className='Default'>{address.shipping ? (<div className='Default_address'>Default shipping address</div>) : address.billing ? (<div className='Default_address'>Default billing address</div>) : ''}</div>)}
                                            </div>
                                            <div className='Func_box'>
                                                <div className='Remove_btn'><button className='Btn' onClick={() => DeleteAddress(address.id, address.shipping ? 'shipping' : address.billing ? 'billing' : 'address')}>Remove</button></div>
                                                <div className='Edit_btn'><button className='Btn' onClick={() => {
                                                    Store.dispatch({ type: 'NoSubmit' });
                                                    localStorage.removeItem(`${UserId}submitInfo`)
                                                    localStorage.setItem(`${UserId}wait`, UserId)
                                                    Navigate('/user', { replace: true })
                                                    Navigate(`/user/setMyInfo`, { replace: false, state: { address: address, currentAddress: address.shipping ? 'shipping' : address.billing ? 'billing' : 'address', addressId: address.id } })
                                                }}>Edit</button></div>
                                                {!address.billing && !address.shipping ? (<div className='Set_default_btn'> <button onClick={() => setDefault(address.id)}>Set as default</button></div>) : ''}
                                            </div>
                                        </div>
                                        
                                    ))}
                                </div>
                            ))}
                     
                    </div>

                </div>
            </div>
        </div>
    )
}
export default MyInfo