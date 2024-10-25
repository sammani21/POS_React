import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Order from './pages/Order';
import Register from './pages/Register';
import Login from './pages/Auth/Login';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element = {<ProtectedRoute/>}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<Category />} />
            <Route path="/order" element={<Order />} />
          </Route>

          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
