import Or from './or/or'
import Signin from './signin/form'
import AnotherMethod from './withGoogleTwitter/anotherMethod'
function LoginMethod() {
return(
 <div className="Login_method_box">
    <div className="Title_box"><h1>Sign In Page</h1> </div>
    <AnotherMethod/>
    <Or/>
    <Signin/>
 </div>   
)
}
export default LoginMethod