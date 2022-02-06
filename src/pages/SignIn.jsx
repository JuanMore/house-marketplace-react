import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {toast} from "react-toastify"
import OAuth from "../components/OAuth"

function SignIn() {
    // show password
    const [showPassword, setShowPassword] = useState(false)
    // form data object for input fields
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // destructure
    const { email, password } = formData
    
    // init navigate
    const navigate = useNavigate()

    // define onChange func
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,

            // change
            [e.target.id]: e.target.value

        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Bad User Credentials')
        }
       
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back!
                    </p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input className="emailInput" type="email" placeholder="Email" name="email"
                            id="email" value={email} onChange={onChange} />
                        <div className="passwordInputDiv">
                            <input type={showPassword ? 'text' : 'password'} className="passwordInput"
                                placeholder="Password" id="password" onChange={onChange} />
                            
                            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => (
                                setShowPassword((prevSate) => !prevSate)
                            )}/>
                        </div>

                        <Link to="/forgot-password" className="forgotPasswordLink">
                            Forgot Password
                        </Link>
                        <div className="signInBar">
                            <p className="signInText">Sign In</p>
                            <button className="signInButton">
                                <ArrowRightIcon fill="#ffff" width="34px" height="34px" />
                            </button>
                        </div>
                    </form>

                    <OAuth />
                    <Link to="/sign-up" className="registerLink">Sign Up Instead</Link>
                </main>
            </div>
        </>
    )
}

export default SignIn