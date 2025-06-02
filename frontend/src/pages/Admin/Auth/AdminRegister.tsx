import React from 'react'
import { Button, Card, Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
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
      <Card title={<Title level={3} style={{ textAlign: "center" }}>Register</Title>}
        style={{
          width: 400,
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          background: "#fff",
        }}>
        <Form
          name="basic"
          layout="vertical"
          form={form}
          // onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input username!" },
              { min: 3, message: "Username must be at least 3 characters!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter your email"}
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" },
                { min: 5, message: "Password must be at least 5 characters!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ height: "40px", fontSize: "16px", fontWeight: "bold" }}
            >
              Register
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Text>Already have an account? </Text>
            <a href="/admin/login" style={{ color: "#1890ff", fontWeight: "bold" }}>
              Login here
            </a>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register
