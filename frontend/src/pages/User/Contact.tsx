import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import { Card, Typography, Space } from "antd";
import {
  PhoneOutlined,
  InstagramOutlined,
  // FacebookOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import Instagram from "../../assets/instagram.png";

const { Title, Text, Link } = Typography;

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] text-gray-800">
      <HeaderComponent />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <Card className="max-w-xl w-full shadow-xl rounded-2xl">
          <Space
            direction="vertical"
            size="large"
            className="w-full text-center"
          >
            <Title level={2} style={{ color: "#c29958" }}>
              Contact with Nhẹ Vibe
            </Title>

            <Space direction="vertical" size="middle" className="w-full">
              <div className="flex items-center justify-center gap-2">
                <PhoneOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
                <Text>Phone number:</Text>
                <Link
                  href="tel:0983192454"
                  className="text-blue-600 underline hover:text-blue-800 transition-all duration-300 ease-in-out"
                >
                  0983 192 454
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2">
                <InstagramOutlined
                  style={{ fontSize: "20px", color: "#d62976" }}
                />
                <Text>Instagram:</Text>
                <Link
                  href="https://www.instagram.com/nhevibe.furnicozy?igsh=cGxoaWR0Ynpia25t&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @nhevibe.furnicozy
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2">
                <FacebookFilled
                  style={{ fontSize: "20px", color: "#1877f2" }}
                />
                <Text>Facebook:</Text>
                <Link
                  href="https://www.facebook.com/share/1L5JRFQyhh/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nhẹ Vibe trên Facebook
                </Link>
              </div>
            </Space>
          </Space>
        </Card>
      </main>

      {/* Floating Instagram Button */}
      <a
        href="https://www.instagram.com/nhevibe.furnicozy?igsh=cGxoaWR0Ynpia25t&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-[#ffddc8] p-2 rounded-full shadow-lg transition transform hover:scale-110"
      >
        <img src={Instagram} alt="Instagram" width={40} height={40} />
      </a>

      <FooterComponent />
    </div>
  );
};

export default Contact;
