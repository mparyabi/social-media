import './register.css';
import { useRef } from 'react';
import axios from 'axios';
import {useHistory} from "react-router";

export default function Register() {
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const username = useRef();
    const history = useHistory();

    const handleClick = async (e) =>{
        e.preventDefault();  // to prevent refresh the page
        if (password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Password is not match!");
        } else {
            const user = {
                username: username.current.value,
                password: password.current.value,
                email: email.current.value,
            }
            try{
            await axios.post("/auth/register" , user);
            history.push("/login");
            }
            catch(error){
             console.log(error);
            }
        }
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
                    <form className="loginBox" onSubmit={handleClick}>
                    <input className="loginInput" placeholder="User Name" ref={username} required></input>
                        <input className="loginInput" placeholder="Email" ref={email} required type="email"></input>
                        <input className="loginInput" placeholder="Password" ref={password} required type="password" minLength="6"></input>
                        <input className="loginInput" placeholder="Password again" ref={passwordAgain} required type="password"></input>
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
