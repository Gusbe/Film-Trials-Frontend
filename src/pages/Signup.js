import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.signup({ username, password })
      .then(() => {
        this.setState({
            username: "",
            password: "",
        });
      })
      .catch(error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  removePlaceholder = (e) => e.target.placeholder = "";
  addPlaceholderUsername = (e) => e.target.placeholder = "Username";
  addPlaceholderPassword = (e) => e.target.placeholder = "Password";

  render() {
    const { username, password } = this.state;
    return (
        <div className='signup-page'>
          <div className="background"></div>
          <div className='form-box'>
            <form onSubmit={this.handleFormSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onFocus={this.removePlaceholder} 
                onBlur={this.addPlaceholderUsername}
                value={username}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onFocus={this.removePlaceholder} 
                onBlur={this.addPlaceholderPassword}
                value={password}
                onChange={this.handleChange}
              />
              <input id='form-button' type="submit" value="Signup" />
              <Link className='signup-link' to='/login'>Already have an account? Login.</Link>
            </form>
          </div>
        </div>
    )
  }
}

export default withAuth(Signup);