import React from "react";
import './css/auth.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''

    })
    const [error, setError] = useState({
        email: '',
        password: ''

    })
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault()
        axios({
            method: 'get',
            url: 'http://localhost:3004/api/users/?email='+formData.email+'&password='+formData.password ,
        }).then(res => {
            var has_error = true;
            res.data.forEach(element => {
                if(formData.password===element.password && formData.email===element.Email){
                    navigate("/home");
                    has_error=false;
                }
            });
            if(has_error){
                setError({...error,password:"Invalide Password"})
            }
        })
    }
    function handelChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }





    return (
        <form onSubmit={e => submitHandler(e)}className="auth-inner">
            <h3>Sign In</h3>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    required
                    onChange={e => handelChange(e)}
                />
               
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    required
                    onChange={e => handelChange(e)}
                />
                {error.password && <span style={{"color":"red"}}>{error.password}</span> }
            </div>
            <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                    </label>
                </div>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" >
                    Submit
                </button>
            </div>
            <p className="account text-right">
                Don't have an account? <a href="/sign-up">Register here</a>
            </p>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>

    );
}

export default Login