import React from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Tag, Button } from 'antd';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserAddOutlined,
  InboxOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const DashboardAdmin = () => {
  // Dummy data
  const orderData = [
    {
      key: '1',
      code: '#DH001',
      customer: 'Nguyễn Văn A',
      total: 2500000,
      status: 'Đang xử lý',
      date: '2025-04-04',
    },
    {
      key: '2',
      code: '#DH002',
      customer: 'Trần Thị B',
      total: 1200000,
      status: 'Đã giao',
      date: '2025-04-03',
    },
  ];

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (value: number) => `${value.toLocaleString()} VNĐ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Đã giao' ? 'green' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: '#f9f9f9' }}>
      <Title level={3}>Dashboard Quản Trị</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={128}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Doanh thu hôm nay"
              value={3500000 }
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix="VNĐ"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Khách hàng mới"
              value={12}
              prefix={<UserAddOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Sản phẩm sắp hết hàng"
              value={5}
              prefix={<InboxOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Đơn hàng gần đây">
        <Table columns={columns} dataSource={orderData} pagination={false} />
      </Card>
    </div>
  );
};

export default DashboardAdmin;
