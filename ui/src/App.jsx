import './App.css';
import React, { useState } from 'react';
import BookList from './components/BookList'
import { Button, Flex, Modal, Form, Input } from 'antd';


function App() {

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    console.log('layout', layout);
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
      : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handSubmit = (book) => {

    fetch('http://localhost:8080/book/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

    setIsModalOpen(false);
  };

  return (
    <div className='App'>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" onClick={showModal}>Create a new book</Button>
      </Flex>
      <Modal title="Create a new book" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          onValuesChange={onFormLayoutChange}
          onFinish={handSubmit}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600, }}
        >
          <Form.Item label="Title" name='title'>
            <Input placeholder="input title" />
          </Form.Item>
          <Form.Item label="Author" name='author'>
            <Input placeholder="input author" />
          </Form.Item>
          <Form.Item label="Public year" name='pubYear'>
            <Input placeholder="input public year" />
          </Form.Item>
          <Form.Item label="ISBN" name='isbn'>
            <Input placeholder="input ISBN" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div>
        <BookList />
      </div>
    </div>
  );
}

export default App;
