

import Login from './pages/user/Login';
import { Routes, Route } from "react-router";
import './App.css'
import DashBoard from './pages/dashboard/DashBoard';
import Layout from './Layout';
import Product from './pages/product/Product';
import AddProduct from './pages/product/AddProduct';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Layout />} >
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="product" element={<Product />} />
      <Route path="add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  );
}

export default App
