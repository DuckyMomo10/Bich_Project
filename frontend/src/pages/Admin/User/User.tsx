import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { NavLink } from "react-router";

interface UserType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const User = () => {
  const columns: TableProps<UserType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="solid" color="primary">
            <NavLink to={`/admin/detail-user/${record.key}`}>Detail</NavLink>
          </Button>
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: UserType[] = [
    {
      key: "1",
      name: "Alice Smith",
      age: 28,
      address: "California No. 1 Apple Street",
      tags: ["admin", "active"],
    },
    {
      key: "2",
      name: "Bob Johnson",
      age: 35,
      address: "Texas No. 1 Ranch Road",
      tags: ["moderator"],
    },
    {
      key: "3",
      name: "Carol White",
      age: 30,
      address: "Florida No. 3 Beach Line",
      tags: ["member", "inactive"],
    },
  ];

  return (
    <>
      <h1
        style={{
          margin: "20px 0",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Users
      </h1>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default User;
