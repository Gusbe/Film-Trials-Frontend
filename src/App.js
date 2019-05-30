import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';


import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './providers/AuthProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddLocation from './pages/AddLocation';
import UpdateLocation from './pages/UpdateLocation';
import ViewLocation from './pages/ViewLocation';
import Search from './pages/Search';
import SearchMap from './pages/SearchMap';
import NotFound from './pages/NotFound';
require('dotenv').config();



class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          <Switch>
            <Route path="/" component={SearchMap} exact />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/location/add" component={AddLocation} exact/>
            <Route path="/location/:id/update" component={UpdateLocation}  />
            <Route path="/location/:id" component={ViewLocation}  />
            <Route path="/search/:id" component={Search}  />
            <Route path="/search" component={Search}  />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </AuthProvider>
    )
  }
}

export default App;
