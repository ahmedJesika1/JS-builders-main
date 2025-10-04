import {
  Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Switch,
  Table,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";
import useFeaturedActions from "../hooks/useFeaturedActions";

const FeaturedManager = () => {
  const { featured, createFeatured, updateFeatured, deleteFeatured, loading } =
    useFeaturedActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Create / Update featured
  const handleSaveFeatured = async (values) => {
    try {
      const formData = new FormData();
      formData.append("label", values.label || "");
      formData.append("isActive", values.isActive);

      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingItem) {
        await updateFeatured(editingItem._id, formData);
        setEditingItem(null);
      } else {
        await createFeatured(formData);
      }

      form.resetFields();
      setFileList([]);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save featured item");
    }
  };

  // Edit featured
  const handleEditFeatured = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...item,
      isActive: item.isActive,
    });

    const imageUrl = `${API_BASE_URL}${item.image}`;
    setFileList([
      {
        uid: "-1",
        name: item.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  // Delete featured
  const handleDeleteFeatured = async (id) => {
    try {
      await deleteFeatured(id);
    } catch (error) {
      message.error("Failed to delete featured item");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${API_BASE_URL}${record.image}`}
          alt={record.label}
          style={{
            width: "100px",
            height: "80px",
            borderRadius: "6px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Badge
          count={isActive ? "Yes" : "No"}
          style={{
            backgroundColor: isActive ? "#52c41a" : "#ff4d4f",
            color: "white",
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditFeatured(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this featured item?"
            onConfirm={() => handleDeleteFeatured(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white my-6 p-8 rounded-md">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Featured Items</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={featured}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingItem ? "Edit Featured Item" : "Create Featured Item"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSaveFeatured} layout="vertical">
          <Form.Item
            name="label"
            label="Featured Label"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Featured Image"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingItem ? "Update Featured" : "Create Featured"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FeaturedManager;
