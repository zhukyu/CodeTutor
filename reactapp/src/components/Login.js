import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import '../css/Login.css';

function Login(props) {

    const navigate = useNavigate();

    const handleSignUpGhost = () => {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }
    const handleSignInGhost = () => {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }

    const [dataForm, setDataForm] = useState({
        "email": "",
        "password": ""
    });
    const onSignIn = (e) => {
        e.preventDefault();
        if (dataForm.email !== "" && dataForm.password !== "") {
            const _formData = new FormData();
            _formData.append("email", dataForm.email)
            _formData.append("password", dataForm.password)
            axios.post(`/auth/login`, _formData).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('user_name', res.data.user.name);
                    localStorage.setItem('user_id', res.data.user.id);
                    localStorage.setItem('role', res.data.user.role);
                    navigate(0);
                }
            })
        }
    }
    const onSignUp = () => {
        if (dataForm.name !== "" && dataForm.email !== "" && dataForm.password !== "" && dataForm.confirm_password !== "") {
            const _formData = new FormData();
            _formData.append("name", dataForm.name)
            _formData.append("email", dataForm.email)
            _formData.append("password", dataForm.password)
            _formData.append("confirm_password", dataForm.confirm_password)
            
            axios.post(`/auth/register`, _formData).then(res => {
                if (res.status === 200) {
                    console.log(res);
                    navigate(0);
                }
            })
        }
    }

    return (props.trigger) ? (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <Link to="#" className="social"><i className="fab fa-facebook-f"></i></Link>
                        <Link to="#" className="social"><i className="fab fa-google-plus-g"></i></Link>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" className="input input-name" placeholder="Name" onChange={
                        (e) => setDataForm({ ...dataForm, "name": e.target.value })
                    } />
                    <input type="email" className="input input-email" placeholder="Email" onChange={
                        (e) => setDataForm({ ...dataForm, "email": e.target.value })
                    } />
                    <input type="password" className="input input-password" placeholder="Password" onChange={
                        (e) => setDataForm({ ...dataForm, "password": e.target.value })
                    } />
                    <input type="password" className="input input-password-confirm" placeholder="Confirm Password" onChange={
                        (e) => setDataForm({ ...dataForm, "confirm_password": e.target.value })
                    } />
                    <Button id="signUp-btn" onClick={onSignUp}>Sign Up</Button>
                    <span className="ghost-mobile" id="signIn-mobile" onClick={handleSignInGhost}>Sign In</span>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <Link to="#" className="social"><i className="fab fa-facebook-f"></i></Link>
                        <Link to="#" className="social"><i className="fab fa-google-plus-g"></i></Link>
                    </div>
                    <span>or use your account</span>
                    <input type="email" className="input input-email" placeholder="Email" onChange={
                        (e) => setDataForm({ ...dataForm, "email": e.target.value })
                    } />
                    <input type="password" className="input input-password" placeholder="Password" onChange={
                        (e) => setDataForm({ ...dataForm, "password": e.target.value })
                    } />
                    <Link to="#" className="forgot-password">Forgot your password?</Link>
                    <Button id="signIn-btn" onClick={onSignIn}>Sign In</Button>
                    <span className="ghost-mobile" id="signUp-mobile" onClick={handleSignUpGhost}>Sign Up</span>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={handleSignInGhost}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={handleSignUpGhost}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    ) : ""
}

export default Login
