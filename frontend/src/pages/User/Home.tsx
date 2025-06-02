import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import HeaderComponent from "../../components/Header/HeaderComponent";
import CardProduct from "../../components/CardProduct";
import { ProductType } from "../../types/Product";
import FooterComponent from "../../components/Footer/FooterComponent";
import Instagram from "../../assets/instagram.png";
import { mockProducts } from "../../types/mockProduct";

const Home = () => {
  const products = [
    {
      id: "sp01",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 299000,
      material: "Cotton 100%",
      color: "Trắng",
      size: "M",
    },
    {
      id: "sp02",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 199000,
      material: "Polyester",
      color: "Đen",
      size: "L",
    },
    {
      id: "sp03",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 399000,
      material: "Jean",
      color: "Xanh",
      size: "32",
    },
    {
      id: "sp04",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 299000,
      material: "Cotton 100%",
      color: "Trắng",
      size: "M",
    },
    {
      id: "sp05",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 299000,
      material: "Cotton 100%",
      color: "Trắng",
      size: "M",
    },
    {
      id: "sp06",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 299000,
      material: "Cotton 100%",
    },
    {
      id: "sp07",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 299000,
      material: "Cotton 100%",
    },
    {
      id: "sp08",
      name: "Bàn chữ L kết hợp kệ lưu trữ",
      price: 299000,
      material: "Cotton 100%",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px",
          alignItems: "center",
          background: "#2e3e38",
          height: "8rem",
        }}
      >
        <h1
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "4rem",
            letterSpacing: "0.06rem",
            fontWeight: 600,
          }}
        >
          NHẸ VIBE
        </h1>
      </div>
      {/* Header */}
      <HeaderComponent />
      {/* Content */}
      <Content style={{ padding: "16px", background: "#fff" }}>
        <h1
          className="heading-popular"
          style={{ textAlign: "center", fontSize: 30, marginBottom: "20px" }}
        >
          Popular Products
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 12px",
          }}
        >
          {mockProducts.map((p) => (
            <CardProduct key={p.id} product={p} />
          ))}
        </div>
      </Content>
      <Layout>
        <Layout>
          <Content style={{ padding: "16px", background: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      {/* Sticky Instagram Button */}
      <a
        href="https://www.instagram.com/nhevibe.furnicozy?igsh=cGxoaWR0Ynpia25t&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: "fit-content",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#ffddc8",
          color: "#fff",
          padding: "8px 8px", // Giảm padding để làm nút nhỏ hơn
          borderRadius: "50%", // Duy trì hình tròn
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontWeight: "bold",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <img src={Instagram} alt="Instagram" width={40} height={40} />{" "}
        {/* Giảm kích thước icon */}
      </a>

      {/* Footer */}
      <FooterComponent />
    </Layout>
  );
};

export default Home;
