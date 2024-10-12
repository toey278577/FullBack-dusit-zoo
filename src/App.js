import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/navbar/navbar_cpnt';
import Home from './components/home/home_cpnt';
import AnimalTable from './components/table/animal_table_cpnt';
import CreateAnimal from './components/create/create_animal_cpnt';
import EditAnimal from './components/edit/edit_animal_cpnt'
import AnimalTypeTable from './components/table/animal_type_table_cpnt';
import UserTable from './components/table/user_table_cpnt';
import Login from './components/login/login_cpnt';
import Logout from './components/login/logout_cpnt';

// PrivateRoute component สำหรับเส้นทางที่ต้องการการเข้าสู่ระบบ
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Component สำหรับจัดการ Navbar ตามเส้นทาง
const AppWrapper = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/logout'].includes(location.pathname);

  return (
    <>
    <head>
    <link rel="icon" href="/imges/dusit-zoo-logo.png" />
    </head>
      {showNavbar && <Navbar />}
      <div className="container mt-3">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/animals' element={
            <PrivateRoute>
              <AnimalTable />
            </PrivateRoute>
          } />
          <Route path='/animals/create' element={
            <PrivateRoute>
              <CreateAnimal />
            </PrivateRoute>
          } />
          <Route path='/animals/:id' element={
            <PrivateRoute>
              <EditAnimal />
            </PrivateRoute>
          } />
          <Route path='/animal-types' element={
            <PrivateRoute>
              <AnimalTypeTable />
            </PrivateRoute>
          } />
          <Route path='/users' element={
            <PrivateRoute>
              <UserTable />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    );
  }
}
