import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const handleResponseMsg = (messageApi, msg, type) => {
  messageApi.open({
    type,
    content: msg
  });
}

const deepCopyArray = (array) => {
  const data = { array };
  const newData = JSON.parse(JSON.stringify(data));
  return newData.array;
}

const retrieveBooks = (setBookList) => {
  fetch('http://localhost:8080/book/retrieveBookList')
    .then(response => response.json())
    .then(data => setBookList(data))
    .catch(error => console.error('Error:', error));
}

const addBookInputChange = (e, name, bookInfo, setBookInfo) => {
  const curVal = e.target.value;
  const newBookInfo = Array.from(bookInfo);
  newBookInfo.forEach(e => {
    if (e.name === name) {
      e.value = curVal;
    }
  });
  setBookInfo(newBookInfo);
}

const updateBookInfoChange = (e, updateId, name, updateBookList, setUpdateBook) => {
  const curVal = e.target.value;
  const newUpdateBookList = Array.from(updateBookList);
  newUpdateBookList.forEach(e => {
    if (e.name === name) {
      e.value = curVal;
    }
  });
  setUpdateBook({
    updateId,
    updateBookList: newUpdateBookList
  });
}

//add book
const addBook = (bookInfo, setIsModalOpen, setBookInfo, initBookData, messageApi, setBookList) => {
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
    .then(data => {
      if (data.status == 200 || data == true) {
        setIsModalOpen(false);
        setBookInfo(deepCopyArray(initBookData));
        retrieveBooks(setBookList)
      } else {
        handleResponseMsg(messageApi, data.message, 'error')
      }
    })
    .catch(error => handleResponseMsg(messageApi, error, 'error'));
};

// submit for updating the book
const updateBookDetail = (id, updateBookList, setCurBook, setIsModalOpen) => {
  const bookData = { id };
  updateBookList.forEach(e => { bookData[e.name] = e.value });
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
      setCurBook(bookData);
    })
    .catch(error => console.error('Error:', error));
  setIsModalOpen(false);
};


//delete the book
const deleteBook = (id, setBookList) => {
  fetch('http://localhost:8080/book/deleteBook?id=' + id, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => retrieveBooks(setBookList))
    .catch(error => console.error('Error:', error));
}

const cancelOpenAddModal = (setIsModalOpen, setBookInfo, initBookData) => {
  setIsModalOpen(false);
  setBookInfo(deepCopyArray(initBookData));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      handleResponseMsg={handleResponseMsg}
      retrieveBooks={retrieveBooks}
      updateBookDetail={updateBookDetail}
      deleteBook={deleteBook}
      deepCopyArray={deepCopyArray}
      addBook={addBook}
      cancelOpenAddModal={cancelOpenAddModal}
      addBookInputChange={addBookInputChange}
      updateBookInfoChange={updateBookInfoChange}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
