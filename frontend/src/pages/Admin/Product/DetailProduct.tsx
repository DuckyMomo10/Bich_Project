import { Card, Descriptions, Button, Row, Col, Typography, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import ProductImage from "../../../assets/product.jpg";
import FormatCurrent from '../../../services/FormatCurrent';
import axiosInstance from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '../../../types/Product';

const { Title, Text } = Typography;

const DetailProductAdmin = () => {
  const { id } = useParams();

  const getProductById = async () => {
    const { data } = await axiosInstance.get(`/products/product/${id}`);
    return data;
  };

  const { data: product, isLoading, isError, error } = useQuery<ProductType>({
    queryKey: ['productDetail', id],
    queryFn: getProductById,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading product details...</p>;
  if (isError) return <p>Error loading product details: {error?.message}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ padding: '32px 16px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card
        title={<Title level={3} style={{ marginBottom: 0 }}>Chi tiết sản phẩm</Title>}
        style={{
          width: '100%',
          maxWidth: 960,
          margin: '0 auto',
          borderRadius: 12,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <img
              alt="product"
              src={product.images && product.images.length > 0 ? product.images[0] : ProductImage}
              style={{
                width: '100%',
                borderRadius: 10,
                objectFit: 'cover',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Descriptions
              bordered
              size="small"
              column={1}
              labelStyle={{
                background: '#fafafa',
                fontWeight: 600,
                width: 100,
                fontSize: 13,
              }}
              contentStyle={{
                fontSize: 13,
              }}
            >
              <Descriptions.Item label="Tên">{product.name}</Descriptions.Item>
              <Descriptions.Item label="Giá">
                <Text type="danger"><FormatCurrent price={product.price} /></Text>
              </Descriptions.Item>
              <Descriptions.Item label="Chất liệu">{product.material}</Descriptions.Item>
              <Descriptions.Item label="Màu sắc">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.color && product.color.map((colorItem, index) => (
                    <div
                      key={index}
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: colorItem,
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                      }}
                      title={colorItem}
                    />
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Tình trạng">
                <Text type={product.isAvailable ? "success" : "danger"}>
                  {product.isAvailable ? 'Còn hàng' : 'Hết hàng'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Danh mục">{product.category}</Descriptions.Item>
              <Descriptions.Item label="Kỹ thuật" span={2}>{product.specification}</Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={2}>{product.description}</Descriptions.Item>
              <Descriptions.Item label="Cập nhật">{new Date(product.updatedAt).toLocaleDateString()}</Descriptions.Item>
              <Descriptions.Item label="Tạo">{new Date(product.createdAt).toLocaleDateString()}</Descriptions.Item>
            </Descriptions>

            <Space style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <Link to={`/admin/edit-product/${product._id}`}>
                <Button type="primary" size="middle" style={{ borderRadius: 6 }}>
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
