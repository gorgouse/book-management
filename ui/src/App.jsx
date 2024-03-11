import './App.css';
import React, { useState, useMemo, useCallback } from 'react';
import BookList from './components/BookList/BookList'
import InputAddBookInfo from './components/InputAddBookInfo/InputAddBookInfo'
import { Button, Flex, Modal } from 'antd';


function App(props) {

  const { deepCopyArray, addBook, cancelOpenAddModal, addBookInputChange, updateBookInfoChange } = props;

  const initBookData = useMemo(() => [
    { name: 'title', label: 'Title', value: '' },
    { name: 'author', label: 'Author', value: '' },
    { name: 'pubYear', label: 'Public year', value: '' },
    { name: 'isbn', label: 'ISBN', value: '' }
  ], []);

  const [bookInfo, setBookInfo] = useState(deepCopyArray(initBookData));

  const [bookList, setBookList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancelOpenAddModal = useCallback(() => {
    cancelOpenAddModal(setIsModalOpen, setBookInfo);
  }, []);

  const handleAddBook = useCallback(() => {
    addBook(bookInfo, setIsModalOpen, setBookInfo);
  }, [bookInfo]);



  return (
    <div className='App'>
      <Flex gap="small" wrap="wrap">
        <Button id="addBookBtn" type="primary" onClick={showModal}>Create a new book</Button>
      </Flex>

      <Modal id="addBookModal" key="addBookModal" title="Create a new book" open={isModalOpen} onCancel={handleCancelOpenAddModal}
        footer={[
          <Button key="cancel" onClick={handleCancelOpenAddModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddBook}>
            Submit
          </Button>
        ]}
      >
        {
          bookInfo && bookInfo.map(e =>
            <InputAddBookInfo
              key={e.name}
              bookInfo={bookInfo}
              setBookInfo={setBookInfo}
              name={e.name}
              label={e.label}
              value={e.value}
              addBookInputChange={addBookInputChange}
            />
          )
        }

      </Modal >

      <div>
        <BookList
          {...props}
          bookList={bookList}
          setBookList={setBookList}
          bookInfo={bookInfo}
          setBookInfo={setBookInfo}
          updateBookInfoChange={updateBookInfoChange}
        />
      </div>
    </div>
  );
}

export default App;
