import {
  message,
  // Badge,
  Button,
  // Form,
  // Input,
  // message,
  // Modal,
  Popconfirm,
  // Switch,
  Table,
} from "antd";
import {
  //   EditOutlined,
  DeleteOutlined,
  //   PlusSquareOutlined,
} from "@ant-design/icons";
import useJobApplicantActions from "../hooks/useJobApplicantActions";
import { API_BASE_URL } from "../shared/config";
// import { useState } from "react";

const JobApplicants = () => {
  const { jobApplicants, loading, deleteJobApplicant } = useJobApplicantActions();

  const handleDeleteJobApplicant = async (id) => {
    try {
      await deleteJobApplicant(id);
    } catch (error) {
      message.error("Failed to delete jobApplicant", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CV/Resume",
      dataIndex: "pdf",
      key: "pdf",
      render: (_, record) =>
        record.pdf ? (
          <Button type="link">
            <a
              href={API_BASE_URL + record.pdf}
              download
              target="_blank"
              // rel="noopener noreferrer"
            >
              Download
            </a>
          </Button>
        ) : (
          <p>No Files.</p>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <Popconfirm
            title="Are you sure to delete this jobApplicant?"
            onConfirm={() => handleDeleteJobApplicant(record._id)}
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
        <h1 className="text-2xl font-bold">All JobApplicants</h1>
      </div>

      <Table
        dataSource={jobApplicants}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default JobApplicants;
