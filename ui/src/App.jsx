import './App.css';
import React, { useMemo, useState } from 'react';
import BookList from './components/BookList'
import InputAddBookInfo from './components/InputAddBookInfo'
import { Button, Flex, Modal } from 'antd';


function App() {

  const initBookData = useMemo(() => [
    { name: 'title', label: 'Title', value: '' },
    { name: 'author', label: 'Author', value: '' },
    { name: 'pubYear', label: 'Public year', value: '' },
    { name: 'isbn', label: 'ISBN', value: '' }
  ])

  const deepCopyArray = (array) => {
    const data = { array };
    const newData = JSON.parse(JSON.stringify(data));
    return newData.array;
  }

  const [bookInfo, setBookInfo] = useState(deepCopyArray(initBookData));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBookInfo(deepCopyArray(initBookData));
  };

  const handAddBook = () => {
    
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
    setBookInfo(deepCopyArray(initBookData));

  };

  return (
    <div className='App'>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" onClick={showModal}>Create a new book</Button>
      </Flex>

      <Modal title="Create a new book" open={isModalOpen} onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handAddBook}>
            Submit
          </Button>
        ]}
      >
        {
          bookInfo && bookInfo.map(e =>
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
