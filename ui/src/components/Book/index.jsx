import { useState } from 'react';
import './index.css';
import { Card, Space, Button, Modal, Form, Input } from 'antd';
import InputUpdateBookInfo from '../InputUpdateBookInfo'

function Book({ book, retrieveBooks }) {

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

  // submit for updating the book
  const handleUpdateBook = () => {

    const bookData = { id: book.id };
    updateBookList.forEach(e => { bookData[e.name] = e.value });

    curBook.id = book.id;
    fetch('http://localhost:8080/book/updateBook/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
      .then(response => {
        response.json();
      })
      .then(data => {
        setCurBook(bookData)

      })
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
              <Button className='update' type="primary" onClick={handleShowUpdateModal}>Update</Button>
              <Button className='delete' type="primary" danger onClick={deleteBook}>delete</Button>
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
          <Button key="submit" type="primary" onClick={handleUpdateBook}>
            Submit
          </Button>
        ]}
      >
        {updateBookList && updateBookList.map((e) =>
          <InputUpdateBookInfo
            isDetail={false}
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