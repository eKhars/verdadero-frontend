import LoginForm from "../components/auth/loginForm.jsx";
import SocialButtons from "../components/auth/socialButtons.jsx";
import Rights from "../components/auth/rights.jsx";
function LoginPage (){
    return(
        <div>
            <LoginForm/>
            
            <Rights/>
        </div>
    )
}
export default LoginPage;