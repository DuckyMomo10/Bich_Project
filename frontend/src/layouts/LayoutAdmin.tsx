import { Layout, Menu } from "antd";
import { HomeOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";

const LayoutAdmin = () => {
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("selectedMenuKey");
    if (savedKey) {
      setSelectedKey(savedKey);
    } else {
      setSelectedKey("1");
    }
  }, []);

  const handleMenuSelect = (e: { key: string }) => {
    setSelectedKey(e.key);
    localStorage.setItem("selectedMenuKey", e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: "#ac6b09", // ✅ Đổi màu header
        }}
      >
        <div className="logo" style={{ display: "flex", flex: 1, alignItems: "center" }}>
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
            background: "#ac6b09", // ✅ Đổi màu menu header
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
          <Menu.Item key="5">
            <NavLink to="/admin/login">Login</NavLink>
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink to="/admin/logout">Logout</NavLink>
          </Menu.Item>
        </Menu>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider style={{ background: "#ac6b09" }}> {/* ✅ Đổi màu sidebar */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onSelect={handleMenuSelect}
            style={{ background: "#ac6b09" }} // ✅ Màu menu bên trái
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
