import React, { useState } from "react"
import TextField from '@mui/material/TextField';
import "./Signup.css"
import { signup } from "../../services/userService";
import { useNavigate } from "react-router-dom";


const emailRegex = /^[A-Za-z0-9][A-Za-z0-9+-]*[.]?[A-Za-z0-9+-]+@[A-Za-z0-9][A-Za-z0-9+-]*(.[A-Za-z0-9]+)?.[A-Za-z]{2,6}$/
const passwordRegex = /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
const firstnameRegex = /^[A-Z]{1}[a-z]{2,}$/
const lastnameRegex = /^[A-Z]{1}[a-z]{2,}$/

const Signup = props => {

    const [signupObj, setsignupObj] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        confirmpassword: ""
    })

    const [validityObj, setValidityObj] = useState({
        emailHelper: "",
        isEmailInvalid: false,
        passwordHelper: "",
        isPasswordInvalid: false,
        firstNameHelper: "",
        isFirstNameInvalid: false,
        lastNameHelper: "",
        isLastNameInvalid: false,
        confirmPasswordHelper: "",
        isConfirmPasswordInvalid: false,
    })

    const navigate = useNavigate();

    function onEmailChange(event) {
        setsignupObj((prev) => { return { ...prev, email: event.target.value } })
    }
    function onPasswordChange(event) {
        setsignupObj((prev) => { return { ...prev, password: event.target.value } })
    }
    function onfirstnameChange(event) {
        setsignupObj((prev) => { return { ...prev, firstname: event.target.value } })
    }
    function onlastnameChange(event) {
        setsignupObj((prev) => { return { ...prev, lastname: event.target.value } })
    }
    function onconfirmpasswordChange(event) {
        setsignupObj((prev) => { return { ...prev, confirmpassword: event.target.value } })
    }


   async function onSubmit() {
        let isEmailValid = emailRegex.test(signupObj.email)
        let passwordValid = passwordRegex.test(signupObj.password)
        let firstnameValid = firstnameRegex.test(signupObj.firstname)
        let lastnameValid = lastnameRegex.test(signupObj.lastname)


        console.log(signupObj)

        if (!isEmailValid) {
            setValidityObj(prev => { return { ...prev, isEmailInvalid: true, emailHelper: "Invalid email" } })
        } else {
            setValidityObj(prev => { return { ...prev, isEmailInvalid: false, emailHelper: "" } })
        }

        if (!passwordValid) {
            setValidityObj(prev => { return { ...prev, isPasswordInvalid: true, passwordHelper: "Invalid password" } })
        } else {
            setValidityObj(prev => { return { ...prev, isPasswordInvalid: false, passwordHelper: "" } })
        }

        if (!firstnameValid) {
            setValidityObj(prev => { return { ...prev, isFirstNameInvalid: true, firstNameHelper: "Invalid firstname" } })
        } else {
            setValidityObj(prev => { return { ...prev, isFirstNameInvalid: false, firstNameHelper: "" } })
        }

        if (!lastnameValid) {
            setValidityObj(prev => { return { ...prev, isLastNameInvalid: true, lastNameHelper: "Invalid lastname" } })
        } else {
            setValidityObj(prev => { return { ...prev, isLastNameInvalid: false, lastNameHelper: "" } })
        }

        if (passwordValid && signupObj.password != signupObj.confirmpassword) {
            setValidityObj(prev => { return { ...prev, isConfirmPasswordInvalid: true, confirmPasswordHelper: "Password does not match" } })
        } else {

            setValidityObj(prev => { return { ...prev, isConfirmPasswordInvalid: false, confirmPasswordHelper: "" } })
        }

        if (isEmailValid && passwordValid && firstnameValid && signupObj.password == signupObj.confirmpassword) {
            
            try{
                await signup(signupObj)
                navigate("/")
            }catch(e){

            }  
        }
    }
    function goToLogin(event){
        navigate("/")
    }

    return (
        <div className="container_signup">
            <div className="container_details">
                <div className="container_details_image">
                    <img src="/google_PNG102344.png" />
                </div>
                <h1 className="container_details_heading">
                    Create your Google Account
                </h1>
                <div className="container_details_field container_field_split2">
                    <TextField
                        id="outlined-basic"
                        label="First name"
                        variant="outlined"
                        size="small"
                        error={validityObj.isFirstNameInvalid}
                        helperText={validityObj.firstNameHelper}
                        onChange={onfirstnameChange} />

                    <TextField
                        id="outlined-basic"
                        label="Last name"
                        variant="outlined"
                        size="small"
                        error={validityObj.isLastNameInvalid}
                        helperText={validityObj.firstNameHelper}
                        onChange={onlastnameChange} />
                </div>
                <div className="container_details_field">
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        size="small"
                        error={validityObj.isEmailInvalid}
                        helperText={validityObj.emailHelper}
                        onChange={onEmailChange}
                    />
                    <p className="container_details_field_hint">You can use letters, numbers and full stops</p>
                </div>
                <div className="container_details_link">
                    <a href="/">Use my current email address instead</a>
                </div>
                <div className="container_details_field container_field_split2">
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        size="small"
                        error={validityObj.isPasswordInvalid}
                        helperText={validityObj.passwordHelper}
                        onChange={onPasswordChange} />

                    <TextField
                        id="outlined-basic"
                        label="Confirm"
                        variant="outlined"
                        size="small"
                        error={validityObj.isConfirmPasswordInvalid}
                        helperText={validityObj.confirmPasswordHelper}


                        onChange={onconfirmpasswordChange} />
                    <p className="container_details_field_hint">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                </div>
                <div className="container_details_footer">
                    <a onClick= {goToLogin} className="button_primary">Sign in instead</a>
                    <button className="button_info" onClick={onSubmit}>Next</button>
                </div>
            </div>
            <div className="container_logo">
                <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" height="244" width="244" alt="Google" />
                <p>One account. All of Google working for you.</p>
            </div>

        </div>
    )
}



export default Signup
