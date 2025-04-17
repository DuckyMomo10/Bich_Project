import React from 'react';
import { Card, Descriptions, Button, Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom'; // Chú ý: sử dụng 'react-router-dom' thay vì 'react-router'
import ProductImage from "../../../assets/product.jpg";
import FormatCurrent from '../../../services/FormatCurrent';

const { Title, Text } = Typography;

const DetailProductAdmin = () => {
  const product = {
    id: 1,
    name: 'Áo thun nam',
    image: ProductImage,
    price: 200000,
    material: 'Cotton',
    color: 'Đỏ',
    size: 'L',
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
      <Card
        title={<Title level={3} style={{ marginBottom: 0 }}>Chi tiết sản phẩm</Title>}
        style={{
          width: '100%',
          maxWidth: 900,
          margin: '0 auto',
          borderRadius: 12,
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.1)',
        }}
      >
        
        <Row gutter={[32, 32]}>
          <Col span={10}>
            <img
              alt="product"
              src={product.image}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              
            />
          </Col>
          <Col span={14}>
            <Descriptions
              title="Thông tin sản phẩm"
              bordered
              column={1}
              size="middle"
              labelStyle={{ width: 200 }}
            >
              <Descriptions.Item label="Tên sản phẩm">
                <Text strong>{product.name}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Giá">
                <Text type="danger" strong>
                  <FormatCurrent price={product.price} />
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Chất liệu">{product.material}</Descriptions.Item>
              <Descriptions.Item label="Màu sắc">{product.color}</Descriptions.Item>
              <Descriptions.Item label="Kích thước">{product.size}</Descriptions.Item>
            </Descriptions>

            <Space style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <Link to={`/admin/edit-product/${product.id}`}>
                <Button type="primary" size="large" style={{ borderRadius: 8 }}>
                  Chỉnh sửa
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DetailProductAdmin;
