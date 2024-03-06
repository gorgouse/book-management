import './App.css';
import React, { useState } from 'react';
import BookList from './components/BookList'
import InputAddBookInfo from './components/InputAddBookInfo'
import { Button, Flex, Modal } from 'antd';


function App() {

  const [bookInfo, setBookInfo] = useState([
    { name: 'title', label: 'Title', value: '' },
    { name: 'author', label: 'Author', value: '' },
    { name: 'pubYear', label: 'Public year', value: '' },
    { name: 'isbn', label: 'ISBN', value: '' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handSubmit = () => {

    const bookData = {};
    
    bookInfo.forEach(e => { bookData[e.name] = e.value });

    fetch('http://localhost:8080/book/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
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

      <Modal title="Create a new book" open={isModalOpen}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handSubmit}>
            Submit
          </Button>
        ]}
      >
        {
          bookInfo.map(e =>
            <InputAddBookInfo
              bookInfo={bookInfo}
              setBookInfo={setBookInfo}
              name={e.name}
              label={e.label}
              value={e.value}
            />
          )
        }

      </Modal >

      <div>
        <BookList     
        bookInfo={bookInfo}
        setBookInfo={setBookInfo} 
        />
      </div>
    </div>
  );
}

export default App;
