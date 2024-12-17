import React from 'react'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
// import Dash1 from './pages/dash1.js';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Dash1 from './pages/dash1.js';
import { Navigate } from 'react-router-dom';
import Inv from './pages/Inv.js';
import OrderDashboard from './pages/Orders.js';
import DashContractor from './pages/dashContractor.js';
import DashCustomer from './pages/dashCustomer.js'
import { Inventory } from '@mui/icons-material';



export default function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route path='/login'  exact Component ={Login}/>
        <Route path='/register'exact element={<Register/>}/>
        <Route path='/inv'exact element ={<Inv/>}/>
        <Route path='/dash1'exact element={<Dash1/>}/>
        <Route path='/order'exact element={<OrderDashboard/>}/>
        <Route path='/dashContractor'exact element={<DashContractor/>}/>
        <Route path='/dashCustomer'exact element={<DashCustomer/>}/>

        <Route path="/" element={<Navigate to="/register" replace={true} />}></Route>
        

      </Routes>
     </Router>
    </div>
  )
}
