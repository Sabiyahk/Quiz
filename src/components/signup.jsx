import React from "react";
import { useState } from "react";
import axios from 'axios'
const SignUp = () => {
  const [data, setData] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    password: ""
  })
  const [error, setError] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    password: ""
  })

  const submitHandler = (e) => {
    e.preventDefault()
    if(!(data.password.length>=8)){
      setError({...error,password:"Password should contain minimum 8 characters"})
      return
    }
    axios({
      url: "http://localhost:3004/api/users/?Email=" + data.Email,
      method: 'get',
    }).then(res => {
      if (res.data.length > 0) {
        setError({...error, Email:"User with this email already exist"})
      } else {
        axios({
          url: "http://localhost:3004/api/users/",
          method: 'POST',
          data: data
        }).then(res => {
        })
      }
    })

  }
  function handelChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submitHandler} className="auth-inner">
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="Fname"
          required
          onChange={e => handelChange(e)}
        />
      </div>
      <div className="mb-3">
        <label>Last name</label>
        <input type="text"
          className="form-control"
          placeholder="Last name"
          name="Lname"
          required
          onChange={e => handelChange(e)}
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="Email"
          required
          onChange={e => handelChange(e)}
        />
        {error.Email && <span style={{"color":"red"}}>{error.Email}</span>}
       
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
      <div className="d-grid">
        <button type="submit" className="btn btn-primary" >
          Sign Up
        </button>

      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  )
}
export default SignUp