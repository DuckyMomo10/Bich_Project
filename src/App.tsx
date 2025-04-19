import { Routes, Route } from "react-router-dom";
import "./index.css";
import CreateProduct from "./pages/Admin/Product/CreateProduct";
import DetailProduct from "./pages/Admin/Product/DetailProduct";
import Dashboard from "./pages/Admin/Dashboard";
import EditProduct from "./pages/Admin/Product/EditProduct";
import Home from "./pages/User/Home";
import LayoutAdmin from "./layouts/LayoutAdmin";
import PrivateRoute from "./routes/PrivateRoute"; // Import PrivateRoute để bảo vệ các route admin
import Product from "./pages/Admin/Product/Product";
import User from "./pages/Admin/User/User";
import DetailUser from "./pages/Admin/User/DetailUser";
import AdminRegister from "./pages/Admin/Auth/AdminRegister";
import AdminLogin from "./pages/Admin/Auth/AdminLogin";
import ProductDetail from "./pages/User/ProductDetail";
import Checkout from "./pages/User/Checkout";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import Register from "./pages/User/Register";
import Login from "./pages/User/login";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes - Protected by PrivateRoute */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Product Management */}
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/detail-product/:id" element={<DetailProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />

        {/* User Management */}
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/detail-user/:id" element={<DetailUser />} />
      </Route>
    </Routes>
  );
}

export default App;
