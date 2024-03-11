import { useState } from 'react';
import './index.css';
import { Card, Space, Button, Modal, Form, Input } from 'antd';
import InputUpdateBookInfo from '../InputUpdateBookInfo/InputUpdateBookInfo'

function Book({ book, setBookList, retrieveBooks, deleteBook, updateBookDetail, ...props }) {

  const [curBook, setCurBook] = useState(book);
  const [updateBook, setUpdateBook] = useState(
    {
      updateId: book.id,
      updateBookList: [
        { name: 'title', label: 'Title', value: book.title },
        { name: 'author', label: 'Author', value: book.author },
        { name: 'pubYear', label: 'Public year', value: book.pubYear },
        { name: 'isbn', label: 'ISBN', value: book.isbn }
      ]
    }
  );

  const { updateId, updateBookList } = updateBook;

  const [isModalOpen, setIsModalOpen] = useState({
    isUpdateModalOpen: false,
    isDetailsModalOpen: false,
  })

  const { isUpdateModalOpen, isDetailsModalOpen } = isModalOpen;

  const handleShowUpdateModal = () => {
    setIsModalOpen({
      isUpdateModalOpen: true,
      isDetailsModalOpen
    })
  }

  const handleShowDetailsModal = () => {
    setIsModalOpen({
      isUpdateModalOpen,
      isDetailsModalOpen: true
    })
  }

  const handleUpdateCancel = () => {
    setIsModalOpen({
      isUpdateModalOpen: false,
      isDetailsModalOpen
    })
  }

  const handleDetailCancel = () => {
    setIsModalOpen({
      isUpdateModalOpen,
      isDetailsModalOpen: false
    })
  }

  const handleUpdateBookDetail = () => {
    updateBookDetail(book.id, updateBookList, setCurBook, setIsModalOpen);
  }

  const handleDeleteBook = () => {
    deleteBook(curBook.id, setBookList);
  }

  return (
    <div className='Book'>
      <Space direction="vertical" size={16}>
        <Card
          title={curBook.title}
          extra={
            <span>
              <Button className='update' type="primary" onClick={handleShowUpdateModal}>Update</Button>
              <Button className='delete' type="primary" danger onClick={handleDeleteBook}>delete</Button>
              <a className='detail' href="#" onClick={handleShowDetailsModal}>Detail</a>
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

      {/* modal for updating */}
      <Modal title="update the book" open={isUpdateModalOpen} onCancel={handleUpdateCancel}
        footer={[
          <Button key="cancel" onClick={handleUpdateCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateBookDetail}>
            Submit
          </Button>
        ]}
      >
        {updateBookList && updateBookList.map((e) =>
          <InputUpdateBookInfo
            key={e.name}
            isDetail={false}
            updateId={updateId}
            updateBookList={updateBookList}
            updateBook={updateBook}
            setUpdateBook={setUpdateBook}
            name={e.name}
            label={e.label}
            value={e.value}
            {...props}
          />
        )}
      </Modal>

      {/* modal for details */}
      <Modal title="update the book" open={isDetailsModalOpen} onCancel={handleDetailCancel}
        footer={[
          <Button key="cancel" type="primary" onClick={handleDetailCancel}>
            OK
          </Button>,
        ]}
      >
        {updateBookList && updateBookList.map((e) =>
          <InputUpdateBookInfo
            isDetail={true}
            updateId={updateId}
            updateBookList={updateBookList}
            updateBook={updateBook}
            setUpdateBook={setUpdateBook}
            name={e.name}
            label={e.label}
            value={e.value}
          />
        )}
      </Modal>


    </div>
  );
}

export default Book;