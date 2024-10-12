import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('isLoggedIn');
  }

  render() {
    return <Navigate to="/login" />;
  }
}
