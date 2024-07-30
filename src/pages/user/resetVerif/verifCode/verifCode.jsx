import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import SetData from "../../../../hook/setData/setData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function VerifCode() {
const Navigate = useNavigate();
    const Secret_code = '882008';
    const Code = localStorage.getItem('code');
 
    const bytes = CryptoJS.AES.decrypt(Code, Secret_code);
    const originalCode = bytes.toString(CryptoJS.enc.Utf8);


    const [active, setActive] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const Submit = (data) => {
        
        if (originalCode === data.code) {
            setActive(true)
          
        }
        else {
       
            setActive(false)
        }
    }
    useEffect(() => {
      if(active==true) {
Navigate('/createPass',{replace:true});
      }
    }, [active])
    return (
        <div className="Verif_Code_box">
            <div className="Title_box">
                <div className="Title"><h1>Verification</h1></div>
                <div className="Description"><p>Verify your code.</p></div>
            </div>
            <div className="Verfication_box">
                <form action="" onSubmit={handleSubmit(Submit)}>
                    <label>Verification Code </label>
                    <input {...register('code', {
                        required: 'The field is empty!'
                    })} type="text" />
                    <div className="Error_box"></div>
                    <button>Verify Code</button>
                </form>
            </div>
        </div>
    );
}

export default VerifCode;
