import {
  Badge,
  Button,
  Form,
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
import useLatestGalleryActions from "../hooks/useLatestGalleryActions";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";

const LatestGallerys = () => {
  const {
    latestGallerys,
    createLatestGallery,
    updateLatestGallery,
    deleteLatestGallery,
    loading,
  } = useLatestGalleryActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingLatestGallery, setEditingLatestGallery] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleCreateLatestGallery = async (values) => {
    try {
      const formData = new FormData();
      formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingLatestGallery) {
        await updateLatestGallery(editingLatestGallery._id, formData);
        setEditingLatestGallery(null);
      } else {
        await createLatestGallery(formData);
        setFileList([])
      }

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save latestGallery", error);
    }
  };

  const handleEditLatestGallery = (latestGallery) => {
    setEditingLatestGallery(latestGallery);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...latestGallery,
      isActive: latestGallery.isActive,
    });

    const imageUrl = `${API_BASE_URL}${latestGallery.image}`;
    setFileList([
      {
        uid: "-1",
        name: latestGallery.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  const handleDeleteLatestGallery = async (id) => {
    try {
      await deleteLatestGallery(id);
    } catch (error) {
      message.error("Failed to delete latestGallery", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingLatestGallery(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "Media",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${API_BASE_URL}${record.image}`}
          alt={record.title}
          className="rounded-md w-[400px]"
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
            onClick={() => handleEditLatestGallery(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this latestGallery?"
            onConfirm={() => handleDeleteLatestGallery(record._id)}
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
        <h1 className="text-2xl font-bold">Latest Gallery</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={latestGallerys}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={
          editingLatestGallery ? "Edit Latest Gallery" : "Create Latest Gallery"
        }
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateLatestGallery}
          layout="vertical"
        >
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Latest Gallery Image"
            valuePropName="file"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
              rules={[{ required: true }]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            {editingLatestGallery ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default LatestGallerys;
