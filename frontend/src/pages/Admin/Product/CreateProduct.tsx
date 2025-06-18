import React, { useState } from "react";
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
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ProductType } from "../../../types/Product";

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm<ProductType>();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post("/products/create", formData);
      return data;
    },
    onSuccess: () => {
      message.success("Tạo sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/product");
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Tạo sản phẩm thất bại");
      console.error(error);
    },
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
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
    return false; // Prevent auto upload
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

    // Tạo preview cho các file mới
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

  const onFinish = async (values: ProductType) => {
    try {
      const formData = new FormData();

      // Append all form fields
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'color' && Array.isArray(value)) {
          value.forEach(colorItem => {
            formData.append(key, colorItem.toString());
          });
        } else {
          formData.append(key, value.toString());
        }
      });

      // Append images
      fileList.forEach((file) => {
        if (file.originFileObj instanceof File) {
          formData.append("images", file.originFileObj);
        }
      });

      await mutationCreate.mutateAsync(formData);
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
    }
  };

  return (
    <div>
      <h1
        style={{
          margin: "20px 0",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Tạo Sản Phẩm Mới
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form<ProductType>
          form={form}
          layout="vertical"
          style={{ width: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Giá Sản Phẩm"
            name="price"
            validateTrigger="onChange"
            rules={[
              { required: true, message: "Vui lòng nhập giá sản phẩm!" },
              {
                type: "number",
                min: 0,
                message: "Giá phải là số và lớn hơn 0!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập giá sản phẩm"
            />
          </Form.Item>

          <Form.Item
            label="Chất Liệu"
            name="material"
            rules={[{ required: true, message: "Vui lòng nhập chất liệu!" }]}
          >
            <Input placeholder="Nhập chất liệu" />
          </Form.Item>

          <Form.Item
            label="Màu Sắc"
            name="color"
            rules={[
              { required: true, message: "Vui lòng chọn ít nhất một màu!" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn màu sắc"
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
            label="Thông Số Kỹ Thuật"
            name="specification"
            rules={[
              { required: true, message: "Vui lòng nhập thông số kỹ thuật!" },
            ]}
          >
            <Input.TextArea placeholder="Nhập thông số kỹ thuật sản phẩm 
            " />
          </Form.Item>

          <Form.Item
            label="Mô Tả Sản Phẩm"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Danh Mục Sản Phẩm"
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              showSearch
              placeholder="Chọn danh mục"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Tủ gỗ", label: "Tủ gỗ" },
                { value: "Kệ gỗ", label: "Kệ gỗ" },
                { value: "Bàn gỗ", label: "Bàn gỗ" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Hình Ảnh Sản Phẩm"
            extra="Tối đa 5 ảnh, mỗi ảnh không quá 2MB"
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
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 150, height: 45 }}
              loading={mutationCreate.isPending}
            >
              Tạo Sản Phẩm
            </Button>
          </Form.Item>
        </Form>
      </div>

      {previewImage && (
        <Image
          style={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default CreateProduct;
