import React from 'react';
import '../style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// function Register() {
//   const navigate=useNavigate()
//   const [name,setName]=useState('')
//   const [email,setEmail]=useState('')
//   const [password,setPassword]=useState('')

//   function loginPage(){
//     navigate('/Login')
//   }
  
//   async function registerUser(event){
//     event.preventDefault()
//     const res = await fetch("http://localhost:5000/api/auth/register",{
//       method:'POST',
//       headers:{
//         'Content-Type' : 'application/json'
//       },
//       body:JSON.stringify({
//         name,
//         email,
//         password,
//       }),
//     })
//     const data= await res.json()

//     if(data.status==='ok'){
//         navigate('/login')
//     }
//     console.log(data);
//   }
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Default role
  
  function loginPage(){
        navigate('/Login')
      }

  async function registerUser(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });
    const data = await res.json();

    if (data.status === "ok") {
      navigate("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  }

  return (
    <div>
      <div className="container">
        <h2>Registration Form</h2>
        <form onSubmit={registerUser}>
            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={name}
                onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"value={email}
                onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} 
                onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="contractor">Contractor</option>
          <option value="admin">Admin</option>
        </select>
            <div className="form-group">
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
      <div style={{display:'flex',flexDirection:'row' , justifyContent:'space-evenly', marginTop:'50px',alignItems:'center' , fontSize:'20px'}} className="login"> 
                 <b>Already Registered</b>
        <div><button style={{width:'100px',position:'static'}} className='logbut' onClick={loginPage}>Login</button></div>
      </div> 
    </div>
  );
}

export default Register;




// function Register() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("customer"); // Default role

//   async function registerUser(event) {
//     event.preventDefault();
//     const res = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         password,
//         role,
//       }),
//     });
//     const data = await res.json();

//     if (data.status === "ok") {
//       navigate("/login");
//     } else {
//       alert(data.message || "Registration failed");
//     }
//   }

//   return (
//     <div>
//       <h2>Registration Form</h2>
//       <form onSubmit={registerUser}>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="customer">Customer</option>
//           <option value="contractor">Contractor</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }
// export default Register;