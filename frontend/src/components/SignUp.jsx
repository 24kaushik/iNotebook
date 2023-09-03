import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: '', password: '', cpassword:'' })
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {name, email, password} = credentials
    const response = await fetch("https://i-notebook-five.vercel.app/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})

    })
    const json = await response.json()
    console.log(json)

    if (json.success) {
      //save the authtoken and redirect
      localStorage.setItem('token', json.authToken)
      props.showAlert('Account created successfully!', "primary")
      navigate('/')
    } else {
      props.showAlert('Email already registered!', "danger")
    }
  }


  return (
    <div>
      <h1 style={{marginBottom:'50px'}}>Create an account to use iNotebook.</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input required onChange={handleChange} type="text" value={credentials.name} className="form-control" id="name" name='name' aria-describedby="emailHelp" style={{ border: "1px solid #b4b4b4" }} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input required onChange={handleChange} type="email" value={credentials.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" style={{ border: "1px solid #b4b4b4" }} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input required minLength='5' onChange={handleChange} type="password" value={credentials.password} className="form-control" name='password' id="password" autoComplete='on' style={{ border: "1px solid #b4b4b4" }} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm password</label>
          <input required minLength='5' onChange={handleChange} type="password" value={credentials.cpassword} className="form-control" name='cpassword' id="cpassword" autoComplete='on' style={{ border: "1px solid #b4b4b4" }} />
          <div id="emailHelp" style={{height: 30}}  className="form-text">{credentials.password === credentials.cpassword ? "" : "Password and Confirm password does not match!"}</div>
        </div>
        <div id="emailHelp" className="form-text my-2">Already have an account? <Link to={'/login'}> Login now.</Link></div>
        <button type="submit" className="btn btn-primary" disabled={credentials.password!==credentials.cpassword}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
