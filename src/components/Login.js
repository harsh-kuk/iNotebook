import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const[credentials,setCredentials]=useState({email:"",password:""})
    const navigate=useNavigate();
    const handleSubmit= async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password}), 
      });
      const json= await response.json();
      console.log(json);
      if(json.success){
        // save the auth token and redirect it 
        localStorage.setItem('token',json.authtoken);
        props.showAlert("Logged in successfully","Success")
        navigate("/");
      }
      else{
        props.showAlert("invalid credentials","Danger")
      }

    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div className='container mt-2'>
      <h2>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password}  onChange={onchange} id="password" name="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
