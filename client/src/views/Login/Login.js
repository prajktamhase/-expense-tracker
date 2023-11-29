import { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css"
import React from "react-dom/client";
import { Link } from "react-router-dom";
import Navbar from "./../../component/Navbar/Navbar"
import Footer from "./../../component/Footer/Footer"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
  
    const response = await axios.post('/api/login', {
      email,
      password
    });

    alert(response?.data?.message);

    if (response?.data?.success){
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
     
      window.location.href = "/";
    }
  }

useEffect(() => {
 const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

 if(storageUser?.email){
  alert("You are already logged in !");
  window.location.href = "/";
 }

  },[])

  return (
    <>
      <Navbar />
      <div >

        <div className="login-form-design">
          <form>
            <h1 className="text-center color">Login</h1>

            <div>
              <label htmlFor="email" 
              className="color">Email: </label><br />
              <input type="email" id="email"
                value={email}
                className="box-login"
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }} />
            </div>
            <div>
              <label htmlFor="password" className="color">Password:</label><br />
              <input type="password" id="pasword"
                value={password}
                className="box-login"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }} />
            </div>

            <button type="button"
              className="btn"
              onClick={login}
            >Login</button><br />
            <p>
              <Link to="/signup" className="link">Create a new a
                account?</Link>
            </p>

          </form>
        </div>
      </div>
      <Footer/>
    </>
   
  )
}

export default Login