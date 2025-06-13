import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, Typography } from "antd";
import axios from "axios";
const { Title, Text } = Typography;
import { Link, useNavigate } from "react-router";
import "../admin.css"
import { FormValues } from "../../../types/FormValues";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await axios.post("http://localhost:8000/api/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      console.log(error || "Đăng ký thất bại");
    }
  })

  const handleSubmit = (values: FormValues) => {
    mutate(values);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
      }}
    >
      <Card
        title={
          <Title level={3} style={{ textAlign: "center", textTransform: "uppercase" }}>
            Login
          </Title>
        }
        style={{
          width: 400,
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          background: "#fff",
        }}
      >
        <Form
          form={form}
          name="login-form"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 5, message: "Password must be at least 5 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ height: "40px", fontSize: "16px", fontWeight: "bold" }}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Text>Don't have an account? </Text>
            <Link
              to="/admin/register"
              style={{ color: "#1890ff", fontWeight: "bold" }}
            >
              Register here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
