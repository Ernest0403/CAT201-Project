import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import AdminHeader from './Component/AdminHeader';
import './App.css';

// Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import Promotions from './pages/admin/Promotions';
import CustomerService from './pages/admin/CustomerService';
import LivingRoomPage from './LivingRoomPage';
import BedroomPage from './BedroomPage';
import KitchenPage from './KitchenPage';
import DiningRoomPage from './DiningRoom';
import WorkRoomPage from './WorkRoom';

const App = () => {
  return (
    <Router>
      <Navbar />
        <Switch>
        {/* Home page route */}
        <Route exact path="/" component={HomePage} />
        
        {/* Category page routes */}
        <Route path="/LivingRoom" component={LivingRoomPage} />
        <Route path="/Bedroom" component={BedroomPage} />
        <Route path="/Kitchen" component={KitchenPage} />
        <Route path="/DiningRoom" component={DiningRoomPage} />
        <Route path="/WorkRoom" component={WorkRoomPage} />
      </Switch>
    </Router>
  );
};

export default App;
