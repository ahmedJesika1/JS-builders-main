import { Table, Button, Popconfirm, Badge, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useUserActions from "../hooks/useUserActions";


function Users() {
  const { users, deleteUser, loading } = useUserActions();

  console.log(users);
  

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="bg-white my-6 p-8 rounded-md">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
}

export default Users;
