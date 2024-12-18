import React, { useEffect } from 'react'
// import jwt from 'jsonwebtoken'
import {jwtDecode} from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Grid } from "@mui/material";
import { Dashboard, Inventory2, ShoppingCart, Thermostat, Directions, Store, Logout } from "@mui/icons-material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function DashCustomer(){
    const navigate= useNavigate()

    async function populateQuote() {
        // const res = await fetch('http://localhost:5000/api/quote',{
        //     headers:{
        //         'x-access-token': localStorage.getItem('token')
        //     }
        // })
        
        // const data= res.json()
        // console.log(data)
        console.log("hello")
    }
    
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const user = jwtDecode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            }
            else{
                populateQuote()
            }
        }
    },[])

    
    const drawerWidth = 240;

  // Sample data for charts
  const data = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 20 },
    { name: "Thu", value: 27 },
    { name: "Fri", value: 18 },
    { name: "Sat", value: 23 },
    { name: "Sun", value: 34 },
  ];

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> ,route:"/dash1"},
    // { text: "Inventory", icon: <Inventory2 /> , route: "/inv"},
    { text: "Orders", icon: <ShoppingCart /> , route:"/order" },
    { text: "Monitoring", icon: <Thermostat /> ,route:'/conditions' },
    { text: "Routes", icon: <Directions /> ,route:'/routes'},
    { text: "Warehouse", icon: <Store /> },
  ];
    // async function populateQuote(){
    //     const req = await fetch('http://localhost:1337/fetchUser',{
    //        headers:{
    //         'x-access-token':localStorage.getItem('token')
    //        } 
    //     })
    //     const data = req.json()
    //     console.log(data)
    // }
    
  return (
    <Box sx={{ display: "flex" }}>
    {/* Sidebar */}
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar>
        <Typography width={{width:'100%'}} fontWeight={{fontWeight:'400'}} color='darkblue' borderRadius={{borderRadius:'10px'}} boxShadow={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.06), 0 6px 20px 0 rgba(0, 0, 0, 0.04)'}} variant="h6"> Cold Chain Logistics</Typography>
      </Toolbar>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}
           onClick={() => {
            
            
              navigate(item.route);
          
          }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>

    {/* Main Content */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      {/* Top Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#007bff", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Dashboard Widgets */}
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h5">281</Typography>
              <Typography color="textSecondary">Bookings</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h5">2,300</Typography>
              <Typography color="textSecondary">Today's Users</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h5">$34k</Typography>
              <Typography color="textSecondary">Revenue</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h5">91</Typography>
              <Typography color="textSecondary">New Followers</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Graph Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Sales
              </Typography>
              <LineChart width={400} height={200} data={data}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Website Views
              </Typography>
              <LineChart width={400} height={200} data={data}>
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Box>
  );
}
