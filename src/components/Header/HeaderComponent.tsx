import { Badge, Drawer, Input, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo.png";
import imgProduct from "../../assets/product.jpg"; // ảnh mặc định
import {
  CloseOutlined,
  HeartOutlined,
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
  RestFilled,
} from "@ant-design/icons";
import FormatCurrent from "../../services/FormatCurrent";
import Favourite from "../Favourite";
import Cart from "../Cart";

const HeaderComponent = ({ product }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  // State dùng để lưu nội dung từ ô input tìm kiếm
  const [searchText, setSearchText] = useState("");

  // Hàm để bật/tắt ô tìm kiếm mỗi khi người dùng nhấn nút tìm kiếm
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  // Hàm xử lý khi người dùng nhấn phím trong ô input
  // Nếu nhấn phím "Enter" thì sẽ gọi hàm tìm kiếm
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Hàm thực hiện tìm kiếm: in ra kết quả tìm kiếm và ẩn ô tìm kiếm sau khi thực hiện
  const handleSearch = () => {
    console.log("Search:", searchText);
    setShowSearch(false);
  };

  const showLiked = () => {
    setOpen(true);
  };

  const closeLiked = () => {
    setOpen(false);
  };

  return (
    <Header
      className="nav-header relative"
      style={{
        background: "#ffff",
        width: "100%",
        height: "auto",
        borderBottom: "1px solid #ececec",
        position: "sticky",
        top: -25,
        zIndex: 1000,
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-around">
        <NavLink to={"/"} className="logo pt-5">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <nav className="menu">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="nav-link">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" className="nav-link">
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/only-you" className="nav-link">
                Only You
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-icons flex items-center gap-4 pr-5 text-[20px]">
          <SearchOutlined
            onClick={toggleSearch}
            className="transition-transform duration-100 hover:scale-110"
          />
          <div className={`slide-search ${showSearch ? "active" : ""}`}>
            {showSearch && (
              <>
                <div
                  className="fixed top-0 inset-0 bg-[#888888] opacity-40 z-40"
                  onClick={() => setShowSearch(false)}
                ></div>
                <div className="absolute top-0 right-0 left-0 h-full z-50 bg-white flex justify-center items-center">
                  <div className="relative w-[600px]">
                  <Input
                    type="text"
                    value={searchText}
                    placeholder="Search Product"
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={onSearch}
                    style={{ width: "600px", height: "50px" }}
                  />
                  <SearchOutlined
                    onClick={handleSearch}
                    className="absolute left-[565px] top-[25px]"
                    style={{ zIndex: "100000" }}
                  />
                  <CloseOutlined
                    className="absolute top-[25px] right-[-40px]"
                    style={{ zIndex: "100000" }}
                    onClick={() => setShowSearch(false)}
                  />
                  </div>
                </div>
              </>
            )}
          </div>
          <UserOutlined className="transition-transform duration-100 hover:scale-110" />
          <Cart />
          <Favourite />
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
