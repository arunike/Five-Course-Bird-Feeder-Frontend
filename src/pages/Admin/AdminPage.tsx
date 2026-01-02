import React, { memo, useEffect, useState } from 'react';
import { Card, Table, Tag, Tabs, Button, message, Modal, Form, Input, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { BrowserRouterProps } from 'react-router-dom';

const { TabPane } = Tabs;

const AdminPage: React.FC<BrowserRouterProps> = () => {
    const [observations, setObservations] = useState([]);
    const [users, setUsers] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isEditVisible, setIsEditVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<any>({});
    const [form] = Form.useForm();

    const role = localStorage.getItem('role');
    const isAdmin = role === 'admin';

    const fetchAll = () => {
        setLoading(true);
        Promise.all([
            fetch('http://localhost:8080/api/v1/observations/list').then(res => res.json()),
            fetch('http://localhost:8080/api/v1/users/').then(res => res.json()),
            fetch('http://localhost:8080/api/v1/video/list').then(res => res.json())
        ]).then(([obsData, userData, vidData]) => {
            setObservations(obsData);
            setUsers(userData);
            setVideos(vidData);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
            message.error("Failed to load admin data");
        });
    };

    useEffect(() => {
        if (isAdmin) {
            fetchAll();
        }
    }, [isAdmin]);

    if (!isAdmin) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <Card bordered>
                    <h3>🚫 Access Denied</h3>
                    <p>You do not have permission to view the Admin Dashboard.</p>
                </Card>
            </div>
        );
    }

    // --- COLUMNS ---
    const obsColumns = [
        { dataIndex: 'id', title: 'ID', width: 80 },
        {
            dataIndex: 'species',
            title: 'Species',
            render: (text: string) => <Tag color='blue'>{text}</Tag>
        },
        {
            dataIndex: 'confidence',
            title: 'Confidence',
            render: (confidence: number) => `${(confidence * 100).toFixed(1)}%`
        },
        {
            dataIndex: 'timestamp',
            title: 'Timestamp',
            render: (timestamp: string) => new Date(timestamp).toLocaleString()
        },
        {
            dataIndex: 'count',
            title: 'Count',
            width: 80
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Button danger size="small" type="text" onClick={() => handleDeleteObservation(record.id)}>Delete</Button>
            )
        }
    ];

    const userColumns = [
        { dataIndex: 'username', title: 'Username' },
        {
            title: 'Name',
            render: (_: any, record: any) => `${record.firstName} ${record.lastName}`
        },
        { dataIndex: 'role', title: 'Role' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => {
                const isUserAdmin = record.role === 'admin';
                return (
                    <>
                        <Button
                            danger={isUserAdmin}
                            type={isUserAdmin ? "primary" : "primary"}
                            size="small"
                            onClick={() => handleRoleChange(record.username, isUserAdmin ? 'user' : 'admin')}
                            style={{ marginRight: 8 }}
                        >
                            {isUserAdmin ? "Revoke Admin" : "Make Admin"}
                        </Button>
                        <Button type="link" size="small" onClick={() => handleOpenEdit(record)}>Edit</Button>
                        <Button danger size="small" type="text" onClick={() => handleDeleteUser(record.username)}>Delete</Button>
                    </>
                );
            }
        }
    ];

    const videoColumns = [
        {
            dataIndex: 'filename',
            title: 'Filename',
            render: (filename: string, record: any) => (
                <a href={record.url} target="_blank" rel="noopener noreferrer">{filename}</a>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Button danger size="small" type="text" onClick={() => handleDeleteVideo(record.filename)}>Delete</Button>
            )
        }
    ];

    const handleRoleChange = (username: string, newRole: string) => {
        if (confirm(`Change role of ${username} to ${newRole}?`)) {
            fetch(`http://localhost:8080/api/v1/users/role/${username}/${newRole}`)
                .then(res => res.text())
                .then(msg => {
                    message.success(msg);
                    fetchAll();
                });
        }
    }

    const handleDeleteObservation = (id: number) => {
        if (confirm(`Delete observation ${id}?`)) {
            fetch(`http://localhost:8080/api/v1/observations/delete/${id}`, { method: 'DELETE' })
                .then(() => {
                    message.success("Observation deleted");
                    fetchAll();
                });
        }
    }

    const handleDeleteUser = (username: string) => {
        if (confirm(`Delete user ${username}?`)) {
            fetch(`http://localhost:8080/api/v1/users/remove/${username}`)
                .then(() => {
                    message.success("User deleted");
                    fetchAll();
                });
        }
    }

    const handleOpenEdit = (user: any) => {
        setEditingUser({ ...user });
        setIsEditVisible(true);
        setTimeout(() => {
            form.setFieldsValue(user);
        }, 100);
    };

    const handleSaveUser = () => {
        form.validateFields().then((values) => {
            const toSave = { ...editingUser, ...values };

            fetch('http://localhost:8080/api/v1/users/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toSave)
            })
                .then(res => res.text())
                .then(msg => {
                    message.success(msg);
                    setIsEditVisible(false);
                    fetchAll();
                })
                .catch(err => message.error("Failed to update user"));
        });
    };

    const handleDeleteVideo = (filename: string) => {
        if (confirm(`Delete ${filename}?`)) {
            fetch(`http://localhost:8080/api/v1/video/delete/${filename}`, { method: 'GET' })
                .then(() => {
                    message.success("Video deleted");
                    fetchAll(); // Refresh
                });
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card title='Admin Dashboard' bordered
                extra={<Button onClick={fetchAll} icon={<ReloadOutlined />} shape="circle" type="text" />}>

                <Tabs defaultActiveKey="observations">
                    <TabPane tab="Bird Logs" key="observations">
                        <div style={{ padding: '10px 0' }}>
                            <Table
                                dataSource={observations}
                                columns={obsColumns}
                                rowKey='id'
                                loading={loading}
                                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                            />
                        </div>
                    </TabPane>

                    <TabPane tab="User Management" key="users">
                        <div style={{ padding: '10px 0' }}>
                            <Table
                                dataSource={users}
                                columns={userColumns}
                                rowKey='id'
                                loading={loading}
                                pagination={{ defaultPageSize: 10 }}
                            />
                        </div>
                    </TabPane>

                    <TabPane tab="Video Archive" key="videos">
                        <div style={{ padding: '10px 0' }}>
                            <Table
                                dataSource={videos}
                                columns={videoColumns}
                                rowKey='filename'
                                loading={loading}
                                pagination={{ defaultPageSize: 10 }}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Card>

            <Modal
                title="Edit User"
                visible={isEditVisible}
                onCancel={() => setIsEditVisible(false)}
                onOk={handleSaveUser}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="username" label="Username">
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" extra="Leave empty to keep unchanged">
                        <Input />
                    </Form.Item>
                    <Form.Item name="firstName" label="First Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Role">
                        <Select>
                            <Select.Option value="user">User</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default memo(AdminPage);
