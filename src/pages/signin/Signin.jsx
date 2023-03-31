import React, { useState } from "react"
import TextField from '@mui/material/TextField';
import "./Signin.css"
import { signin, signup } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";


const emailRegex = /^[A-Za-z0-9][A-Za-z0-9+-]*[.]?[A-Za-z0-9+-]+@[A-Za-z0-9][A-Za-z0-9+-]*(.[A-Za-z0-9]+)?.[A-Za-z]{2,6}$/
const passwordRegex = /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/

const Signin = props => {

    const [loginObj, setLoginObj] = useState({
        email: "",
        password: ""
    })

    const [validityObj, setValidityObj] = useState({
        emailHelper: "",
        isEmailInvalid: false,
        passwordHelper: "",
        isPasswordInvalid: false
    })

    const navigate = useNavigate();

    function onEmailChange(event) {
        setLoginObj((prev) => {return {...prev,email: event.target.value}})
    }
    function onPasswordChange(event) {
        setLoginObj((prev) => {return {...prev,password: event.target.value}})
    }
    async function onSubmit() {
        let isEmailValid = emailRegex.test(loginObj.email)
        let passwordValid = passwordRegex.test(loginObj.password)
        console.log(loginObj)
         if(!isEmailValid){
            setValidityObj(prev => {return{...prev,isEmailInvalid:true, emailHelper:"Invalid email"}})
         }else{
            setValidityObj(prev => {return{...prev,isEmailInvalid:false, emailHelper:""}})
         }
         if(!passwordValid){
            setValidityObj(prev => {return{...prev,isPasswordInvalid:true, passwordHelper:"Invalid password"}})
         }else{
            setValidityObj(prev => {return{...prev,isPasswordInvalid:false, passwordHelper:""}})
         }
         if(isEmailValid && passwordValid){
            try {
                 const result = await signin(loginObj)
                 const token = result.data.token;
                 localStorage.setItem("auth", token)
                navigate("dashboard")
            }catch(e){
                alert(e.response.data.message)
            }
         }
    }

    function createAccount(event) {
        navigate("signup");
    }


    return (
        <div className="container">
            <div className="container_image">
                <img src="/google_PNG102344.png" />
            </div>
            <h1 className="container_heading">
                Sign in
            </h1>
            <p className="container_para1">
                Use your Google Account
            </p>
            <div className="container_field">
                <TextField
                    id="outlined-basic"
                    label="Email or phone"
                    variant="outlined"
                    error={validityObj.isEmailInvalid}
                    helperText={validityObj.emailHelper} 
                    onChange={onEmailChange}/>
            </div>

            {/* <div>
                <a href="/">Forgot email?</a>
            </div> */}

            <div className="container_field">
                <TextField
                    id="outlined-basic"
                    label="Enter your password"
                    variant="outlined"
                    error={validityObj.isPasswordInvalid}
                    helperText={validityObj.passwordHelper}
                    onChange={onPasswordChange} />

            </div>
            <div className="container_link">
                <a href="/">Forgot password?</a>
            </div>
            <p className="container_para2">
                Not your computer? Use Guest mode to sign in privately.
            </p>
            <div className="container_link">
                <a href="/">Learn more</a>
            </div>
            <div className="container_footer">
                <a onClick={createAccount} className="button_primary">Create account</a>
                <button onClick={onSubmit} className="button_info">Next</button>
            </div>
        </div>
    )
}



export default Signin


