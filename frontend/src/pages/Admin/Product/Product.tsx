import { Button, Pagination, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { useSearchParams } from "react-router-dom"; // ✅ thêm dòng này
import { NavLink } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormatCurrent from "../../../services/FormatCurrent";
import { ProductType } from "../../../types/Product";
import axiosInstance from "../../../utils/axios.js";
import errorImage from "../../../image/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg";

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ dùng searchParams
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // ✅ lấy từ URL
  const productsPerPage = 5;
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<{
    products: ProductType[];
    totalPages: number;
    currentPage: number;
  }>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products");
      return data;
    },
  });

  const products = response?.products || [];

  // Thêm dòng này để kiểm tra dữ liệu
  console.log("Product data response:", response);

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/products/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      message.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to delete product");
    },
  });

  const columns: TableProps<ProductType>["columns"] = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => (currentPage - 1) * productsPerPage + index + 1,
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => <>{id.substring(0, 8)}...</>,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (image: string[]) => {
        if (!image || image.length === 0) {
          return (
            <img
              src={errorImage}
              alt="No image available"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid #eee",
              }}
            />
          );
        }
        const imageUrl = image[0]?.replace(/\\/g, "/");
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Product"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : null;
      },
    },
    {
      title: "Name Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <FormatCurrent price={price} />,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (colors: string[]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {colors && colors.length > 0 ? (
            colors.map((colorItem, index) => (
              <div
                key={index}
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: colorItem,
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                }}
                title={colorItem}
              />
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button type="default">
            <NavLink to={`/admin/detail-product/${record._id}`}>Detail</NavLink>
          </Button>
          <Button type="primary">
            <NavLink to={`/admin/edit-product/${record._id}`}>Edit</NavLink>
          </Button>
          <Popconfirm
            title="Delete Product"
            description="Are you sure to delete this product?"
            onConfirm={() => {
              if (!record._id) return message.error("Invalid product ID");
              deleteMutation.mutate(record._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              loading={
                deleteMutation.isPending &&
                deleteMutation.variables === record._id
              }
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() }); // ✅ cập nhật URL
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1
        style={{
          margin: "20px 0",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Products
      </h1>
      <div style={{ display: "flex", margin: "20px 0" }}>
        <Button type="primary">
          <NavLink to={"/admin/create-product"}>Create Product</NavLink>
        </Button>
      </div>
      <Table
        dataSource={currentProducts}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />
      {products.length > productsPerPage && (
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={products.length}
          onChange={handlePageChange}
          align="end"
          style={{ marginTop: "20px", textAlign: "center" }}
        />
      )}
    </>
  );
};

export default Product;
