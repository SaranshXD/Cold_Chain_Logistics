// import React, { useEffect } from 'react'
// import { useState } from 'react';


// export default function Dashboard() {
//     // const navigate= useNavigate()
   
//     const [info,setInfo]=useState('')
    
    
    
    
//     useEffect(() => {
//       const token=localStorage.getItem('token')
//       console.log('in use effect')
//       async function fetchit(){
//         console.log('inside fetch it')
//         const res = await fetch("http://localhost:1337/dashboard",{
//           method:'POST',
//           headers:{
//             'Content-Type' : 'application/json'
//           },
//           body:JSON.stringify({
//             token
//           }),
//         })

//         const data= await res.json()

//         console.log(data)
//         console.log('hello')
//       }
//       fetchit()
//     },[]);

//   return (
//     <div>
//         Dashboard{info}
//     </div>
//   )
// }
