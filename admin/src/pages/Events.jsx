import {
  Badge,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  // Select,
  Switch,
  Table,
  Upload,
  DatePicker,
  Space,
  TimePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useEventActions from "../hooks/useEventActions";
// import { Option } from "antd/es/mentions";
import { useState } from "react";
import { API_BASE_URL } from "../shared/config";
import { truncateText } from "../helpers/truncateText";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Events = () => {
  const { events, createEvent, updateEvent, deleteEvent, loading } =
    useEventActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingEvent, setEditingEvent] = useState(null);
  const [expandedDetailsText, setExpandedDetailsText] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedTime, setFormattedTime] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleDetailsSeeMore = (id) => {
    setExpandedDetailsText((prevState) => (prevState === id ? null : id));
  };

  const onDateChange = (date, dateString) => {
    console.log(date, "date from events");
    console.log(dateString, "dateString from events.........");
    setFormattedDate(dateString);
    form.setFieldValue("date", date);
  };

  const onTimeChange = (time, timeString) => {
    console.log(time, "time from event");
    console.log(timeString, "timeString from event");
    setFormattedTime(timeString);
    form.setFieldValue("time", time);
  };

  const handleCreateEvent = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("details", values.details || "");
      formData.append("location", values.location || "");
      formData.append("link", values.link || "");

      formData.append("date", formattedDate);
      formData.append("time", formattedTime);
      formData.append("isActive", values.isActive);

      // Only append the photo if it's being changed
      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (editingEvent) {
        await updateEvent(editingEvent._id, formData);
        setEditingEvent(null);
      } else {
        await createEvent(formData);
      }

      form.resetFields();
      setIsModalVisible(false);
      setFileList([]);
    } catch (error) {
      message.error("Failed to save event", error);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsModalVisible(true);

    const dateObj = event.date ? dayjs(event.date, "DD-MM-YYYY") : null;
    const timeObj = event.time ? dayjs(event.time, "h:mm A") : null;

    form.setFieldsValue({
      ...event,
      date: dateObj,
      time: timeObj,
      isActive: event.isActive,
    });

    const imageUrl = `${API_BASE_URL}${event.image}`;
    setFileList([
      {
        uid: "-1",
        name: event.image.split("/").pop(),
        status: "done",
        url: imageUrl,
      },
    ]);

    setFormattedDate(event.date || "");
    setFormattedTime(event.time || "");
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
    } catch (error) {
      message.error("Failed to delete event", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingEvent(null);
    setFileList([]);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "Title",
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
      title: "Event Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Event Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Event Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Event Time",
      dataIndex: "time",
      key: "time",
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
            onClick={() => handleEditEvent(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this event?"
            onConfirm={() => handleDeleteEvent(record._id)}
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
        <h1 className="text-2xl font-bold">All Events</h1>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          <PlusSquareOutlined /> Add New
        </Button>
      </div>

      <Table
        dataSource={events}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingEvent ? "Edit Event" : "Create Event"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateEvent} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
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
            name="location"
            label="Event Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label="Event Link"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-between items-center gap-3">
            <Form.Item name="date" label="Event Date" className="w-1/2 flex">
              {/* <Input /> */}
              <Space direction="vertical">
                <DatePicker onChange={onDateChange} format="DD-MM-YYYY" />
              </Space>
            </Form.Item>
            <Form.Item name="time" label="Event Time" className="w-1/2 flex">
              {/* <Input /> */}
              <TimePicker
                onChange={onTimeChange}
                use12Hours
                format="h:mm A"
                defaultOpenValue={dayjs("12:00 AM", "h:mm A")}
              />
            </Form.Item>
          </div>

          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Event Image"
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
            {editingEvent ? "Update Event" : "Create Event"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Events;
