import { useForm } from "react-hook-form";
import {  useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Signin() {
  let refEl = useRef();
    const [showHide, setShowHide] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const onSubmit = (data) => {
      
        
    }
    const HandleShow = () => {
        setShowHide(!showHide)
    }

    return (
        <div className="Form_box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Name_mail">
                    <label>User name or email address</label>
                    <input    {...register('Name_mail', {
                        required: 'The field is empty!',
                     
                    })} type="text" />
                    <div className="Error_box"><p>{errors.Name_mail?errors.Name_mail.message:'' }</p></div>
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
                     
                    })} type={showHide ? 'text':'password'} /></div>
                    <div className="Error_box"><p>{errors.Password?errors.Password.message:'' }</p></div>
                    <div className="Forgot_pass"><Link>Forget your password</Link></div>
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