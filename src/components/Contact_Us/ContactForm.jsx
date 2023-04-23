import React from 'react'
import './Auth.css'
import { useState } from 'react'
import axios from 'axios'
 const ContactForm =()=> {
    const [data,setData] = useState({
        name:'',
        email:'',
        message:'',
    })
    function submitHandler(e){
        e.preventDefault()
        axios({
            url:"http://localhost:3004/api/contact/",
            method:"POST",
            data:data
        }).then(res=>{
            // setData(res.data)
            console.log(res.data);
        })
    }
    function handelChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
     
        return (
            <form onSubmit={e=>submitHandler(e)} className='auth-inner'>
                <h3>Contact Us</h3>
                <div className="mb-3">
                    <label>Enter your Name</label>
                    <input
                        type="Text"
                        className="form-control"
                        placeholder="Enter Name"
                        name='name'
                        onChange={e=>handelChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Enter Email</label>
                    <input
                        type="Email"
                        className="form-control"
                        placeholder="Enter Email"
                        name='email'
                        onChange={e=>handelChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Massage</label>
                    <textarea
                        type="textarea"
                        className="form-control"
                        placeholder='Massage Here'
                        name='message'
                        onChange={e=>handelChange(e)}
                        
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        );
    }

export default ContactForm