import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link ,useNavigate} from "react-router-dom";
import { SetData } from "../../../../../hook/setData/setData";
import axios from "axios";
import { Store } from "../../../../../redux/redux";

function Signin() {
    const Navigate = useNavigate();

    const Login = async (data) => {
        return axios.post('http://clothes/users/signin.php', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
    const { mutate, isSuccess, error, data } = SetData(Login, 'Login');
useEffect(()=> {
console.log(data?.data);

},[data])
    useEffect(() => {
            if (data &&data?.data?.status  === 'true') {
           console.log(data?.data?.name);
           
Store.dispatch({
    type:'Logged'
})
Navigate('/user',{replace:true})
localStorage.setItem('logged',true)
localStorage.setItem('id',data.data.id)
var id = localStorage.getItem('id');
           localStorage.setItem(`${id}submitInfo`,true);
           localStorage.setItem(`${id}address`,data?.data?.address);
           localStorage.setItem(`${id}name`,data?.data?.name);
           localStorage.setItem(`${id}addressId`,data?.data?.addressId)
           }
      
    }, [isSuccess])
const ErrorInput=()=> {
    if(data?.data?.status !== 'true') {

    }
  
}

    const [showHide, setShowHide] = useState(false);
    const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm();
    const onSubmit = (data) => {
       ErrorInput()
        mutate({
            ...getValues()
        })
        

    }
    const HandleShow = () => {
        setShowHide(!showHide)
    }

    return (
        <div className="Form_box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Name_mail">
                    <label>User name or email address</label>
                    <input     {...register('Name_mail', {
                        required: 'The field is empty!',

                    })} type="text" />
                    <div className="Error_box"><p>{errors.Name_mail ? errors.Name_mail.message : ''}</p></div>
                </div>
                <div className="Password">
                    <div className="Label">
                        <div><label>Password</label></div>
                        <div className="Hide_show_pass">
                            <div className="Icon_box" onClick={() => HandleShow()}>{showHide ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</div>
                            <div className="State_name"><span>{showHide ? 'Hide' : 'Show'}</span></div>
                        </div>
                    </div>
                    <div className="Input"><input   {...register('Password', {
                        required: 'The field is empty!',

                    })} type={showHide ? 'text' : 'password'} /></div>
                    <div className="Error_box"><p>{data?.data == false? "Uncorrect password or email!": ''}</p></div>

                    <div className="Forgot_pass"><Link to={'/resetPass'}>Forget your password</Link></div>
                </div>


                <div className="Submit"><button>Sign In</button></div>
                <div className="Signup">
                    <div className="Description"><span>Don’t have an account? </span></div>
                    <div className="Signup_link"><Link to={'/signup'}>Sign up</Link></div>
                </div>
            </form>
        </div>
    )
}
export default Signin