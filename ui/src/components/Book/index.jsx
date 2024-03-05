import { useState } from 'react';
import './index.css';
import { Card, Space, Button, Modal, Form, Input } from 'antd';

function Book({ book, retrieveBooks }) {

  const [curBook, setCurBook] = useState(book);
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

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const showDetailModal = () => {
    setIsModalDetailOpen(true);
  };
  const handleDetailOk = () => {
    setIsModalDetailOpen(false);
  };
  const handleDetailCancel = () => {
    setIsModalDetailOpen(false);
  };

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

  //udatte the book
  const handSubmit = (curBook) => {

    curBook.id = book.id;

    fetch('http://localhost:8080/book/updateBook/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(curBook),
    })
      .then(response => {
        response.json();
      })
      .then(data => setCurBook(curBook))
      .catch(error => console.error('Error:', error));

    setIsModalOpen(false);

  };

  //delete the book
  const deleteBook = () => {
    fetch('http://localhost:8080/book/deleteBook?id=' + curBook.id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => retrieveBooks())
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className='Book'>
      <Space direction="vertical" size={16}>
        <Card
          title={curBook.title}
          extra={
            <span>
              <Button className='update' type="primary" onClick={showModal}>Update</Button>
              <Button className='delete' type="primary" danger onClick={deleteBook}>delete</Button>
              <a className='detail' href="#" onClick={showDetailModal}>Detail</a>
            </span>}
          style={{
            width: 450,
          }}
        >
          <p>
            <div>
              <span>Author: &nbsp;</span>
              <span>{curBook.author}</span>
            </div>
            <div>
              <span></span>
              <span>Public Year: &nbsp;{curBook.pubYear}</span>
            </div>
          </p>
        </Card>
      </Space>

      <Modal title="update the book" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          onValuesChange={onFormLayoutChange}
          initialValues={curBook}
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


      <Modal title="update the book" open={isModalDetailOpen} onOk={handleDetailOk} onCancel={handleDetailCancel}>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={curBook}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600, }}
        >
          <Form.Item label="Title" name='title'>
            <Input disabled placeholder="input title" />
          </Form.Item>
          <Form.Item label="Author" name='author'>
            <Input disabled placeholder="input author" />
          </Form.Item>
          <Form.Item label="Public year" name='pubYear'>
            <Input disabled placeholder="input public year" />
          </Form.Item>
          <Form.Item label="ISBN" name='isbn'>
            <Input disabled placeholder="input ISBN" />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
}

export default Book;
