import {
  // Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  // Switch,
  Table,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useAboutUsActions from "../hooks/useAboutUsActions";
import { truncateText } from "../helpers/truncateText";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";

const AboutUs = () => {
  const { aboutUsData, loading, createAboutUs, updateAboutUs, deleteAboutUs } =
    useAboutUsActions();
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);
  const [expandedMissionText, setExpandedMissionText] = useState(null);
  const [expandedVisionText, setExpandedVisionText] = useState(null);
  const [expandedValueText, setExpandedValueText] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAboutUs, setEditingAboutUs] = useState(null);
  const [fileList, setFileList] = useState([]);
  

  const handleCreateAboutUs = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      formData.append("mission", values.mission || "");
      formData.append("vision", values.vision || "");
      formData.append("value", values.value || "");
      // formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingAboutUs) {
        await updateAboutUs(editingAboutUs._id, formData);
        setEditingAboutUs(null);
      } else {
        await createAboutUs(formData);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save aboutUs", error);
    }
  };

  const handleEditAboutUs = (aboutUs) => {
    setEditingAboutUs(aboutUs);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...aboutUs,
      isActive: aboutUs.isActive,
    });

    const imageUrl = `${API_BASE_URL}${aboutUs.image}`;
    setFileList([
      {
        uid: "-1",
        name: aboutUs.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);
  };

  const handleDeleteAboutUs = async (id) => {
    try {
      await deleteAboutUs(id);
    } catch (error) {
      message.error("Failed to delete aboutUs", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingAboutUs(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // Function to handle the toggle of expanded text
  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };
  const handleMissionSeeMore = (id) => {
    setExpandedMissionText((prevState) => (prevState === id ? null : id));
  };
  const handleVisionSeeMore = (id) => {
    setExpandedVisionText((prevState) => (prevState === id ? null : id));
  };
  const handleValueSeeMore = (id) => {
    setExpandedValueText((prevState) => (prevState === id ? null : id));
  };

  // console.log(aboutUss, "from aboutUss");

  const columns = [
    {
      title: "Heading",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text, record) => {
        const isExpanded = expandedDetailsText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text)}{" "}
              {safeText.length > 100 && (
                <a
                  onClick={() => handleDetailsSeeMore(record._id)}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer hover:border-b hover:border-b-blue-500"
                >
                  {isExpanded ? "See Less" : "See More"}
                </a>
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "Media",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${API_BASE_URL}${record.image}`}
          alt={record.title}
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Mission",
      dataIndex: "mission",
      key: "mission",
      render: (text, record) => {
        const isExpanded = expandedMissionText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text)}{" "}
              {safeText.length > 100 && (
                <a
                  onClick={() => handleMissionSeeMore(record._id)}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer hover:border-b hover:border-b-blue-500"
                >
                  {isExpanded ? "See Less" : "See More"}
                </a>
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "Vision",
      dataIndex: "vision",
      key: "vision",
      render: (text, record) => {
        const isExpanded = expandedVisionText === record._id;
        const safeText = text || "";
        return (
          <div className="flex justify-center items-center gap-1">
            <span>
              {isExpanded ? text : truncateText(text)}{" "}
              {safeText.length > 100 && (
                <a
                  onClick={() => handleVisionSeeMore(record._id)}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer hover:border-b hover:border-b-blue-500"
                >
                  {isExpanded ? "See Less" : "See More"}
                </a>
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text, record) => {
        const isExpanded = expandedValueText === record._id;
        const safeText = text || "";
        return (
          <div>
            <span>
              {isExpanded ? text : truncateText(text)}{" "}
              {safeText.length > 100 && (
                <a
                  onClick={() => handleValueSeeMore(record._id)}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer hover:border-b hover:border-b-blue-500"
                >
                  {isExpanded ? "See Less" : "See More"}
                </a>
              )}
            </span>
          </div>
        );
      },
    },
    // {
    //   title: "Active",
    //   dataIndex: "isActive",
    //   key: "isActive",
    //   render: (isActive) => (
    //     <Badge
    //       count={isActive ? "Yes" : "No"}
    //       style={{
    //         backgroundColor: isActive ? "#52c41a" : "#ff4d4f",
    //         color: "white",
    //       }}
    //     />
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditAboutUs(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this aboutUs?"
            onConfirm={() => handleDeleteAboutUs(record._id)}
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
        <h1 className="text-2xl font-bold">All About Us</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={aboutUsData}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingAboutUs ? "Edit About" : "Create About"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateAboutUs} layout="vertical">
          <Form.Item name="title" label="Heading" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="details"
            label="Details"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mission"
            label="Mission"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="vision" label="Vision" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="value" label="Value" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item> */}
          <Form.Item
            name="image"
            label="Upload About Image"
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
            {editingAboutUs ? "Update About" : "Create About"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AboutUs;
