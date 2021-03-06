import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: "",
    notFilledFields: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then((data) => {
        // if(data.response.data.status === 422) {
        //   this.setState({
        //     notFilledFields: true
        //   })
        // }
      });
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  removePlaceholder = (e) => e.target.placeholder = "";
  addPlaceholderUsername = (e) => e.target.placeholder = "Username";
  addPlaceholderPassword = (e) => e.target.placeholder = "Password";

  render() {
    const { username, password, notFilledFields } = this.state;
    return (
        <div className='login-page'>
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
              <input id='form-button' type="submit" value="Login" />
              {notFilledFields ? <p>Missing some fields</p>: null}
              <Link className='signup-link' to='/signup'>Create your account to add film locations</Link>
            </form>
          </div>
        </div>
    )
  }
}

export default withAuth(Login);