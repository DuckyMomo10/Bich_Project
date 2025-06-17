import { Routes, Route } from "react-router-dom";
import "./index.css";
import CreateProduct from "./pages/Admin/Product/CreateProduct.tsx";
import DetailProduct from "./pages/Admin/Product/DetailProduct.tsx";
import Dashboard from "./pages/Admin/Dashboard.tsx";
import EditProduct from "./pages/Admin/Product/EditProduct.tsx";
import Home from "./pages/User/Home.tsx";
import LayoutAdmin from "./layouts/LayoutAdmin.tsx";
import Product from "./pages/Admin/Product/Product.tsx";
import User from "./pages/Admin/User/User.tsx";
import DetailUser from "./pages/Admin/User/DetailUser.tsx";
import AdminRegister from "./pages/Admin/Auth/AdminRegister.tsx";
import AdminLogin from "./pages/Admin/Auth/AdminLogin.tsx";
import ProductDetail from "./pages/User/ProductDetail.tsx";
import Checkout from "./pages/User/Checkout.tsx";
import About from "./pages/User/About.tsx";
import Contact from "./pages/User/Contact.tsx";
import Register from "./pages/User/Register.tsx";
import Login from "./pages/User/Login.tsx";
import Blog from "./pages/User/Blog.tsx";
import CamNhanNheBlog from "./pages/User/CamNhanNheBlog.tsx";
import WoodOfNheVibeBlog from "./pages/User/WoodOfNheVibeBlog.tsx";

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
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/cam-nhan-nhe" element={<CamNhanNheBlog />} />
      <Route path="/blog/wood-of-nhe-vibe" element={<WoodOfNheVibeBlog />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="dashboard" element={<Dashboard />} />

        {/* Product Management */}
        <Route path="product" element={<Product />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="detail-product/:id" element={<DetailProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />

        {/* User Management */}
        <Route path="user" element={<User />} />
        <Route path="detail-user/:id" element={<DetailUser />} />
      </Route>
    </Routes>
  );
}

export default App; 