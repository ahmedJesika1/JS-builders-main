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
import useAmenityActions from "../hooks/useAmenityActions";

const Amenities = () => {
  const { amenities, createAmenity, updateAmenity, deleteAmenity, loading } =
    useAmenityActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Create / Update amenity
  const handleSaveAmenity = async (values) => {
    try {
      const formData = new FormData();
      formData.append("label", values.label || "");
      formData.append("isActive", values.isActive);

      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingAmenity) {
        await updateAmenity(editingAmenity._id, formData);
        setEditingAmenity(null);
      } else {
        await createAmenity(formData);
      }

      form.resetFields();
      setFileList([]);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save amenity");
    }
  };

  // Edit amenity
  const handleEditAmenity = (amenity) => {
    setEditingAmenity(amenity);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...amenity,
      isActive: amenity.isActive,
    });

    const imageUrl = `${API_BASE_URL}${amenity.image}`;
    setFileList([
      {
        uid: "-1",
        name: amenity.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  // Delete amenity
  const handleDeleteAmenity = async (id) => {
    try {
      await deleteAmenity(id);
    } catch (error) {
      message.error("Failed to delete amenity");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingAmenity(null);
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
          style={{ width: "80px", borderRadius: "6px" }}
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
            onClick={() => handleEditAmenity(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this amenity?"
            onConfirm={() => handleDeleteAmenity(record._id)}
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
        <h1 className="text-2xl font-bold">All Amenities</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={amenities}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingAmenity ? "Edit Amenity" : "Create Amenity"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSaveAmenity} layout="vertical">
          <Form.Item
            name="label"
            label="Amenity Label"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Amenity Image"
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
            {editingAmenity ? "Update Amenity" : "Create Amenity"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Amenities;
