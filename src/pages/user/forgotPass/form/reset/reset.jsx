import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import SetData from "../../../../../hook/setData/setData";
import axios from "axios";
import CryptoJS from "crypto-js";


function ResetPass() {
    const Navigate = useNavigate();
const Secret_code = '882008';
    const Reset = async (data) => {
        return await axios.post('http://clothes/users/resetPass.php', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };

    const { mutate, isSuccess, error, data } = SetData(Reset, 'reset');

    useEffect(() => {
        if (data && data.data === true) {
            Navigate('/checkMail', { replace: true });
        }
    }, [data]);

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const createCode = (mail) => {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        let Code = '';
        for (let i = 0; i < 5; i++) {
            Code += charset[Math.floor(Math.random() * charset.length)];
        }

        mutate({
            mail: mail.email,
            code: Code
        });
        localStorage.setItem('mail', mail.email);

        const ciphertext = CryptoJS.AES.encrypt(Code, Secret_code).toString();
   localStorage.setItem('code',ciphertext)
    };

    const HandleSubmit = (data) => {
        createCode(data);
    };

    return (
            <div className="Reset_pass_box">
                <form onSubmit={handleSubmit(HandleSubmit)} action="">
                    <label>Email</label>
                    <input {...register('email', {
                        required: 'The field is empty',
                    })} type='email' required />
                    <div className="Error_box">{data ? data.data : ''}</div>
                    <button className="Submit">Send</button>
                    <div className="Back_login"><Link to={'/login'}>Back to Login</Link></div>
                </form>
              
            </div>
      
    );
}

export default ResetPass;
