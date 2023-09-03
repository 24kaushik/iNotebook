import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("https://i-notebook-five.vercel.app/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)

        })
        const json = await response.json()
        console.log(json)

        if (json.success){
            //save the authtoken and redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert("Logged in succesfully", "success")
            navigate('/')
        }else{
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    return (
        <div>
            <h1 style={{marginBottom:'50px'}}>Login to continue to iNotebook.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} onChange={handleChange} name="email" className="form-control" id="email" aria-describedby="emailHelp" style={{ border: "1px solid #b4b4b4" }} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={handleChange} autoComplete="on" name="password" className="form-control" id="password" style={{ border: "1px solid #b4b4b4" }} />
                </div>
                <div id="emailHelp" className="form-text my-2">Dont have an account? <Link to={'/signup'}>Create one.</Link></div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
