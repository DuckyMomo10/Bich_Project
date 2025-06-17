import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
    const savedKey = localStorage.getItem("selectedMenuKey");
    if (savedKey) {
      setSelectedKey(savedKey);
    } else {
      setSelectedKey("1");
    }
  }, [navigate]);

  const handleMenuSelect = (e: { key: string }) => {
    setSelectedKey(e.key);
    localStorage.setItem("selectedMenuKey", e.key);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedMenuKey");
    navigate("/admin/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: "#000957", // ✅ Đổi màu header
        }}
      >
        <div
          className="logo"
          style={{ display: "flex", flex: 1, alignItems: "center" }}
        >
          {/* Logo nếu có */}
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            background: "#000957", // ✅ Đổi màu menu header
            borderBottom: "none",
          }}
        >
          <Menu.Item key="1">
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/admin/user">User</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/admin/product">Product</NavLink>
          </Menu.Item>
          {!localStorage.getItem("token") ? (
            <Menu.Item key="5">
              <NavLink to="/admin/login">Login</NavLink>
            </Menu.Item>
          ) : (
            <Menu.Item key="6" onClick={logout}>
              Logout
            </Menu.Item>
          )}
        </Menu>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider style={{ background: "#000957" }}>
          {" "}
          {/* ✅ Đổi màu sidebar */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onSelect={handleMenuSelect}
            style={{ background: "#000957" }} // ✅ Màu menu bên trái
            items={[
              {
                key: "1",
                label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
                icon: <HomeOutlined />,
              },
              {
                key: "2",
                label: <NavLink to="/admin/user">User</NavLink>,
                icon: <UserOutlined />,
              },
              {
                key: "3",
                label: <NavLink to="/admin/product">Products</NavLink>,
                icon: <ShoppingOutlined />,
              },
            ]}
          />
        </Sider>

        {/* Nội dung chính */}
        <Layout>
          <Content style={{ padding: "16px", background: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
