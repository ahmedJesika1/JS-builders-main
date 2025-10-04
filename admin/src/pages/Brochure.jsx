import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useBrochureActions from "../hooks/useBrochureActions";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";

const Brochure = () => {
  const { brochures, loading, createBrochure, updateBrochure, deleteBrochure } =
    useBrochureActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBrochure, setEditingBrochure] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Create or Update Brochure
  const handleCreateBrochure = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("successStory", values.successStory);
      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      if (editingBrochure) {
        await updateBrochure(editingBrochure._id, formData);
        setEditingBrochure(null);
      } else {
        await createBrochure(formData);
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch {
      message.error("Failed to save brochure");
    }
  };

  // Edit Brochure
  const handleEditBrochure = (brochure) => {
    setEditingBrochure(brochure);
    setIsModalVisible(true);
    form.setFieldsValue({
      title: brochure.title,
      description: brochure.description,
      successStory: brochure.successStory,
    });

    setFileList(
      brochure.image
        ? [
            {
              uid: "-1",
              name: brochure.image.split("/").pop(),
              status: "done",
              url: brochure.image,
            },
          ]
        : []
    );
  };

  // Delete Brochure
  const handleDeleteBrochure = async (id) => {
    try {
      await deleteBrochure(id);
    } catch (error) {
      message.error("Failed to delete brochure");
    }
  };

  // Cancel Modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingBrochure(null);
    form.resetFields();
  };

  const columns = [
    { title: "Heading", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Success Story", dataIndex: "successStory", key: "successStory" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) =>
        record.image ? (
          <img
            src={`${API_BASE_URL}${record.image}`}
            alt={record.title}
            style={{ width: 80, height: 50, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditBrochure(record)}
          />
          <Popconfirm
            title="Are you sure to delete this brochure?"
            onConfirm={() => handleDeleteBrochure(record._id)}
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
    <div className="w-full bg-white my-6 p-8 rounded-md">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={brochures}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingBrochure ? "Edit Profile" : "Create Profile"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateBrochure} layout="vertical">
          <Form.Item name="title" label="Heading" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="successStory" label="Success Story">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Service Image"
            valuePropName="fileList"
            getValueFromEvent={(e) =>
              Array.isArray(e) ? e : e?.fileList || []
            }
            rules={[
              { required: !editingBrochure, message: "Image is required" },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {editingBrochure ? "Update Profile" : "Create Profile"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Brochure;
