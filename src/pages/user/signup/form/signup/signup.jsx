import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import SetData from "../../../../../hook/setData/setData";
import { Store } from "../../../../../redux/redux";

function Signup() {
const Navigate = useNavigate();

    const Signup_api = async (data) => {
        return axios.post('http://clothes/users/signup.php', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    const [showHide, setShowHide] = useState(false);
    const { register, handleSubmit, getValues, formState: { errors, isValid, isSubmitted } } = useForm();
    const { mutate, error, isSuccess } = SetData(Signup_api, 'Add User')
    const onSubmit = (data) => {
        mutate({
            ...getValues()
        })
    }
    const HandleShow = () => {
        setShowHide(!showHide)
    }


    useEffect(() => {
        if (isSuccess) {
            Store.dispatch({ type: 'Logged' });
            localStorage.setItem('logged', true);
Navigate('/',{replace:true})
        }
    }, [isSuccess])




    return (
        <div className="Form_box">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Mail">
                    <label>Email Address</label>
                    <input    {...register('Email', {
                        required: 'The field is empty!',
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+@[A-Za-z\d]+\.[A-Za-z]{2,}$/,
                            message: 'Invalid email address',
                        },
                    })} type="email" />
                    <div className="Error_box"><p>{errors.Email ? errors.Email.message : ''}</p></div>
                </div>
                <div className="Password">
                    <div className="Label">
                        <div><label>Password</label></div>
                        <div className="Hide_show_pass">
                            <div className="Icon_box" onClick={() => HandleShow()}>{showHide ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</div>
                            <div className="State_name"><span>{showHide ? 'Hide' : 'Show'}</span></div>
                        </div>
                    </div>
                    <div className="Input"><input  {...register('Password', {
                        required: 'The field is empty!',

                    })} minLength={8} type={showHide ? 'text' : 'password'} /></div>

                    <div className="Error_box"><p>{errors.Password ? errors.Password.message : ''}</p></div>
                    <div className="Warn"><label>Use 8 or more characters with a mix of letters, numbers & symbols</label></div>
                    <div className="Forgot_pass"><Link>Forget your password</Link></div>
                </div>


                <div className="Submit"><button onClick={() => {

                }}>Sign Up</button></div>
                <div className="Signup">
                    <div className="Description"><span>Already have an  account?</span></div>
                    <div className="Signup_link"><Link to={'/login'}>Log in</Link></div>
                </div>
            </form>
        </div>
    )
}
export default Signup