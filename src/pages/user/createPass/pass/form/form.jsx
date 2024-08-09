import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SetData } from "../../../../../hook/setData/setData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Form() {
    const [showHide, setShowHide] = useState(false);
const Navigate = useNavigate();
    const Email = localStorage.getItem('mail')
    const {register,handleSubmit, formState: { errors }} = useForm()
      const ResetVerifApi = async (data) => {
        return await axios.post('http://clothes/users/resetVerif.php', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    const { mutate, data, isSuccess } = SetData(ResetVerifApi,'resetVerif');

const [error,setError] = useState(false);
    const HandleShow = () => {
        setShowHide(!showHide)
    }

    const HandleSubmit = (data)=> {

        if(data.pass !== data.conf) {
            setError(true)
      
        }
        else {
            setError(false)
     mutate({
        email:Email,
        pass: data.pass
     })
        }
     

    }

 

            useEffect(()=> {
if(data && data.data == true) {
    Navigate('/',{replace:true})
}
            },[data])
    return (
        <div className="Create_pass_form">
            <form  onSubmit={handleSubmit(HandleSubmit)} action="">
               
                <div className="Password_box">
                <label htmlFor="">Password</label>
                    <div className="Input_box"><input {...register('pass',{
                        minLength:8,
                        required:'The Field id empty!'
                    })}  minLength={8} type={showHide ? 'password' :'text'} />
                    </div>
                    <div className="Hide_show" onClick={()=> HandleShow()}>{showHide ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</div>
                </div>
                <div className="Confirm_box">
                    <label htmlFor="">Confirm Password</label>
                    <input {...register('conf', {
                        required:'The Field id empty!'
                    })} type="text" />
<div className="Error_box">{error == true? 'the password is not the same, check again' :''}{data ? data.data :''}</div>
                </div>
                <button>Reset Password</button>
            </form>
        </div>
    )
}
export default Form