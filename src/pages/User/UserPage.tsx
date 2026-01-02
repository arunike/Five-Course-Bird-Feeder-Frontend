import React, { memo, useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Descriptions, Button, Modal, Form, Input, message } from 'antd';
import { BrowserRouterProps } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import styles from './index.module.less';

const UserPage: React.FC<BrowserRouterProps> = () => {
  const [username, setUsername] = useState('Guest');
  const [loginCount, setLoginCount] = useState(0);
  const [observations, setObservations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
      fetchUserInfo(storedUser);
    }

    if (storedUser) {
      setUsername(storedUser);
      fetchUserInfo(storedUser);

      const history = JSON.parse(localStorage.getItem(`loginHistory_${storedUser}`) || '[]');
      setLoginCount(history.length);
    }

    // Fetch Observations for Chart
    fetch('http://localhost:8080/api/v1/observations/list')
      .then(res => res.json())
      .then(data => {
        // Filter observations by username if storedUser exists
        const filteredData = storedUser ? data.filter((obs: any) => obs.username === storedUser) : [];
        setObservations(filteredData);
      })
      .catch(err => console.error(err));
  }, []);

  const fetchUserInfo = (uName: string) => {
    fetch(`http://localhost:8080/api/v1/users/get/${uName}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => console.error('Failed to fetch user info:', err));
  };

  const chartOptions = useMemo(() => {
    // Group observations by Species
    const speciesCount: Record<string, number> = {};
    observations.forEach(obs => {
      const sp = obs.species || 'Unknown';
      speciesCount[sp] = (speciesCount[sp] || 0) + 1;
    });

    return {
      title: { text: 'My Observations', left: 'center' },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Species',
          type: 'pie',
          radius: ['40%', '70%'],
          data: Object.keys(speciesCount).map(key => ({
            name: key,
            value: speciesCount[key]
          }))
        }
      ]
    };
  }, [observations]);

  const handleEditClick = () => {
    if (user) {
      form.setFieldsValue(user);
      setIsModalVisible(true);
    }
  };

  const handleUpdate = (values: any) => {
    const updatedUser = { ...user, ...values };

    fetch('http://localhost:8080/api/v1/users/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(async (res) => {
        const text = await res.text();
        if (text === "User updated successfully") {
          message.success('Profile updated successfully');
          setIsModalVisible(false);
          setUser(updatedUser);
          setUsername(updatedUser.username);
          localStorage.setItem('username', updatedUser.username);
        } else {
          message.error(text || 'Update failed');
        }
      })
      .catch((err) => {
        console.error(err);
        message.error('An error occurred during update');
      });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12} xl={18}>
          <Card className={styles.welcome}>
            <Row justify='space-between'>
              <Col className={styles.name}>
                Hi, <strong>{username}</strong>! Welcome back to your Bird Watcher Profile.
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.userinfo}
            title='Account Information'
            extra={<Button type="primary" onClick={handleEditClick}>Edit Profile</Button>}
            style={{ marginTop: 16 }}
          >
            <Descriptions bordered layout="vertical" column={{ xs: 1, sm: 2, md: 4 }}>
              <Descriptions.Item label="Username">{user?.username || username}</Descriptions.Item>
              <Descriptions.Item label="First Name">{user?.firstName || '-'}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{user?.lastName || '-'}</Descriptions.Item>
              <Descriptions.Item label="Role">{user?.role || 'Bird Watcher'}</Descriptions.Item>
              <Descriptions.Item label="Total Logins">{loginCount}</Descriptions.Item>
              <Descriptions.Item label="Total Observations">{observations.length}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card className={styles.statistics} title='Observation Analytics' style={{ marginTop: 16 }}>
            <ReactEcharts option={chartOptions} style={{ height: 360, marginTop: 16 }} />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={form.submit}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Username required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="New Password"
            extra="Leave blank to keep current password"
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(UserPage);
