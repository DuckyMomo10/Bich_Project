import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  message,
  Image,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { NavLink, useNavigate, useParams } from "react-router";
import axiosInstance from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductType } from "../../../types/Product";

const EditProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm<ProductType>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const getProduct = async () => {
    const { data } = await axiosInstance.get(`/products/product/${id}`);
    return data;
  };

  const { data: product, isLoading } = useQuery<ProductType>({
    queryKey: ["product", id],
    queryFn: getProduct,
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
      const initialFileList: UploadFile[] = product.images.map(
        (imgUrl, index) => ({
          uid: imgUrl,
          name: `image-${index}.png`,
          status: "done",
          url: imgUrl,
          response: { url: imgUrl },
        })
      );
      setFileList(initialFileList);
    }
  }, [product, form]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Bạn chỉ có thể tải lên file ảnh!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 2MB!");
      return Upload.LIST_IGNORE;
    }
    if (fileList.length >= 5) {
      message.error("Chỉ được tải tối đa 5 ảnh!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleUploadChange = async ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    if (newFileList.length > 5) {
      message.error("Chỉ được tải tối đa 5 ảnh!");
      return;
    }
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (file.originFileObj && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file;
      })
    );
    setFileList(updatedFileList);
  };

  const editProduct = async (formData: FormData) => {
    await axiosInstance.put(`/products/update/${id}`, formData);
  };

  const editMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate("/admin/product");
    },
    onError: (error: any) => {
      message.error(
        error.response?.data?.message || "Cập nhật sản phẩm thất bại!"
      );
      console.error(error);
    },
  });

  const handleSubmit = (values: ProductType) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "images"
        ) {
          if (key === 'color' && Array.isArray(value)) {
            value.forEach(colorItem => {
              formData.append(key, colorItem.toString());
            });
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      fileList.forEach((file) => {
        if (file.originFileObj instanceof File) {
          formData.append("images", file.originFileObj);
        } else if (file.url) {
          formData.append("existingImages", file.url);
        }
      });

      editMutation.mutate(formData);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      message.error("Có lỗi xảy ra khi chuẩn bị dữ liệu sản phẩm.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        <h1
          style={{
            margin: "20px 0",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Edit Product
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form<ProductType>
            form={form}
            layout="vertical"
            style={{ width: "600px" }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the product name!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="Product Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the product price!
                    </span>
                  ),
                },
                {
                  type: "number",
                  min: 0,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Price must be a number and greater than 0!
                    </span>
                  ),
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter product price"
              />
            </Form.Item>

            <Form.Item
              label="Material"
              name="material"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the material!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter material" />
            </Form.Item>

            <Form.Item
              label="Color"
              name="color"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please select at least one color!
                    </span>
                  ),
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select colors"
                style={{ width: "100%" }}
                options={[
                  { value: "#50311d", label: "Nâu đậm (#50311d)" },
                  { value: "#806248", label: "Nâu xám (#806248)" },
                  { value: "#a5907b", label: "Be ấm (#a5907b)" },
                  { value: "#d4cabe", label: "Cát nhạt (#d4cabe)" },
                  { value: "#ffb900", label: "Vàng đậm (#ffb900)" },
                  { value: "#ffcd48", label: "Vàng nhạt (#ffcd48)" },
                  { value: "#ffdb7b", label: "Hồng đào (#ffdb7b)" },
                  { value: "#ffe8b0", label: "Kem nhạt (#ffe8b0)" },
                ]}
                allowClear
                maxTagCount={3}
                maxTagTextLength={15}
                optionLabelProp="label"
                optionRender={(option) => {
                  const value = option.value as string;
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: value,
                          border: "1px solid #d9d9d9",
                          borderRadius: "4px",
                        }}
                      />
                      <span>{option.label}</span>
                    </div>
                  );
                }}
              />
            </Form.Item>

            <Form.Item
              label="Product Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please enter the product description!
                    </span>
                  ),
                },
              ]}
            >
              <Input.TextArea placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
              label="Thông Số Kỹ Thuật"
              name="specification"
              rules={[
                { required: true, message: "Vui lòng nhập thông số kỹ thuật!" },
              ]}
            >
              <Input.TextArea placeholder="Nhập thông số kỹ thuật (ví dụ: CPU, RAM, màn hình, kích cỡ)" />
            </Form.Item>

            <Form.Item
              label="Product Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "#ff4d4f",
                        display: "flex",
                        fontWeight: "normal",
                      }}
                    >
                      Please select a category!
                    </span>
                  ),
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a category"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "Shirt", label: "Shirt" },
                  { value: "Jacket", label: "Jacket" },
                  { value: "Pants", label: "Pants" },
                  { value: "Shoes", label: "Shoes" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Product Images"
              extra="Max 5 images, each not more than 2MB"
            >
              <Upload
                listType="picture-card"
                multiple
                beforeUpload={beforeUpload}
                fileList={fileList}
                onChange={handleUploadChange}
                onPreview={handlePreview}
                onRemove={(file) =>
                  setFileList((prev) =>
                    prev.filter((item) => item.uid !== file.uid)
                  )
                }
                maxCount={5}
              >
                {fileList.length >= 5 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item>
              <NavLink to="/admin/product">
                <Button
                  type="primary"
                  style={{ margin: "10px", width: "150px", height: "45px" }}
                >
                  Back to Product
                </Button>
              </NavLink>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "150px", height: "45px" }}
                loading={editMutation.isPending}
              >
                Edit Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {previewImage && (
        <Image
          style={{ display: "none" }}
          preview={{
            visible: previewOpen,
            title: previewTitle,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default EditProduct;
