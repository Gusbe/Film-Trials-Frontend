import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './providers/AuthProvider';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddLocation from './pages/AddLocation';
import ViewLocation from './pages/ViewLocation';
import Search from './pages/Search';



class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          <Switch>
            <Route path="/search" component={Search}  />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/location/add" component={AddLocation} exact/>
            <Route path="/location/:id" component={ViewLocation}  />
            <Route path="/search/:id" component={Search}  />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
