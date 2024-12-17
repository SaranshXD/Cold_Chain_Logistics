import React from 'react';
import '../style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
//   const [name,setName]=useState('')
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  function signUp(){
    navigate('/register')
  }
  const decodeToken = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.role; // Extract role
  };
  
  async function loginUser(event){
    event.preventDefault()
    console.log('hello')
    const res = await fetch("http://localhost:5000/api/auth/login",{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        email,
        password,
      }),
    })
    const data= await res.json()
    if(data.token){
      // console.log(data)
      localStorage.setItem('token',data.token) 
      // console.log(token)
      const role = decodeToken(data.token);
      alert('Login Successfull')
      if (role === "admin") {
        navigate("/dash1");
      } else if (role === "contractor") {
        navigate("/dashContractor");
      } else {
        navigate("/dashCustomer");
      }
      navigate('/dash1')
      
      
      
    }
    else{
      alert('Please enter correct email and password')
    }
    console.log(data);
    
  }

  return (
    <div>
      <div className="container">
        <h2>Login Form</h2>
        <form onSubmit={loginUser}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email}
                onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} 
                onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div className="form-group">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
    <div style={{display:'flex',flexDirection:'row' , justifyContent:'space-evenly', marginTop:'50px',alignItems:'center' , fontSize:'22px'}} className="login"> 
                 <b>Haven't Registered Yet?</b>
        <div><button style={{width:'125px',position:'static'}} className='logbut' onClick={signUp}>SignUp</button></div>
      </div> 
    </div>
  );
}

export default Login;
