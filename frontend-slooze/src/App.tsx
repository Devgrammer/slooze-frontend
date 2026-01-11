

import Login from './pages/user/Login';
import { Routes, Route } from "react-router";
import './App.css'
import DashBoard from './pages/dashboard/DashBoard';
import Layout from './Layout';
import Product from './pages/product/Product';
import AddProduct from './pages/product/AddProduct';
import Signup from './pages/user/Signup';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './context/authContext';
import { Spinner } from './components/ui/spinner';






function App() {
  const {isLoading} = useAuth();
  

  if(isLoading){
    return <Spinner className="size-16 flex  mx-auto" />;
  }

  return (
    <Routes>
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
       
          <Route path="dashboard" element={ <ProtectedRoute><DashBoard /> </ProtectedRoute>} />
          <Route path="product" element={<Product />} />
          <Route path="add-product" element={<AddProduct />} />
       
      </Route>
    </Routes>
  );
}

export default App
