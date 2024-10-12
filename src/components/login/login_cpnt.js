import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import logo from '../../imges/dusit-zoo-logo.png';
import './login_cpnt.css';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    redirectToReferrer: false,
  };

  mockUser = {
    username: 'admin',
    password: '1234',
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username === this.mockUser.username && password === this.mockUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      this.setState({ redirectToReferrer: true });
    } else {
      this.setState({ errorMessage: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  };

  render() {
    const { username, password, errorMessage, redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Navigate to="/home" />;
    }

    return (
      <div className='wrapper d-flex align-items-center justify-content-center w-100'>
        <div className='login'>
          <img src={logo} alt="Dusit Logo" className='login-logo' />
          <form className='needs-validation' onSubmit={this.handleSubmit}>
            <div className='form-group was-validated mb-1'>
              <label htmlFor="username" className='form-label'>ชื่อผู้ใช้</label>
              <input
                type="text"
                name="username"
                className='form-control'
                value={username}
                onChange={this.handleInputChange}
                required
              />
              <div className="invalid-feedback">
                กรุณากรอกชื่อผู้ใช้ของคุณ
              </div>
            </div>
            <div className='form-group was-validated mb-1'>
              <label htmlFor="password" className='form-label'>รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                className='form-control'
                value={password}
                onChange={this.handleInputChange}
                required
              />
              <div className="invalid-feedback">
                กรุณากรอกรหัสผ่านของคุณ
              </div>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type='submit' className='btn btn-success block w-100 mt-2'>เข้าสู่ระบบ</button>
          </form>
        </div>
      </div>
    );
  }
}
