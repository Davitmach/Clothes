import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Info() {
return(
    <div className="Info_box">
        <div className="Title_box"><h1>Check Email</h1></div>
        <div className="Description_box"><p>Please check your email inbox and click on the provided link to reset your
        password . If you don’t receive email,</p><Link to={'/resetVerif'} >Click here to resend</Link></div>
        <div className="Back_login"><FontAwesomeIcon icon={faChevronLeft}/><span className="Title">Back to Login</span> <Link to={'/login'}><span className="Link">Login</span></Link></div>
    </div>
)
}export default Info;