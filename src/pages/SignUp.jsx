import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { db } from "../firebase.config"
import {setDoc, doc, serverTimestamp} from "firebase/firestore"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {toast} from "react-toastify"
import OAuth from "../components/OAuth"


function SignUp() {
    // show password
    const [showPassword, setShowPassword] = useState(false)
    // form data object for input fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    // destructure
    const { email, password, name } = formData
    
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
            // get auth value from getAuth()
            const auth = getAuth()
            // call create....
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // get user from user credential
            const user = userCredential.user
            // get current user
            updateProfile(auth.currentUser, {
                // name from form
                displayName: name,
            })

            // copy everything from form data (name, email, password)
            const formDataCopy = { ...formData }
            // avoid password being submitted to db by deleting
            delete formDataCopy.password
            // set timestamp to serverTimestamp
            formDataCopy.timestamp = serverTimestamp()

            // update db to users collection
            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')

        } catch (error) {
           toast.error('An error occurred with your registration')
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
                    <input className="nameInput" type="text" placeholder="Name" name="name"
                            id="name" value={name} onChange={onChange} />
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
                        <div className="signUpBar">
                            <p className="signUpText">Sign Up</p>
                            <button className="signUpButton">
                                <ArrowRightIcon fill="#ffff" width="34px" height="34px" />
                            </button>
                        </div>
                    </form>

                    <OAuth />
                    <Link to="/sign-in" className="registerLink">Sign In Instead</Link>
                </main>
            </div>
        </>
    )
}

export default SignUp