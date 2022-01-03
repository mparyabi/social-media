import './login.css';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from "@material-ui/core";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {isfetching,dispatch} = useContext(AuthContext);
    const formHandler = (e) =>{
        e.preventDefault();  // to prevent refresh the page
        loginCall({email:email.current.value ,password:password.current.value} , dispatch)
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">LamaSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Lamasocial
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={formHandler}>
                        <input className="loginInput" type="email" placeholder="Email" ref={email} required></input>
                        <input className="loginInput" type="password" placeholder="Password" ref={password} required minLength="6"></input>
                        <button className="loginButton" type="submit" disabled={isfetching}>
                            {isfetching ? <CircularProgress color='white' size="15px"/> : "Login"}
                            </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                        {isfetching ? <CircularProgress color='white' size="15px"/> : "Create a new Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
