import './index.css';
import Book from '../Book'
import { useEffect, useState } from 'react';


function BookList({...props}) {

  const [bookList, setBookList] = useState([]);

  const retrieveBooks = () => {

    fetch('http://localhost:8080/book/retrieveBookList')
      .then(response => response.json())
      .then(data => setBookList(data))
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    retrieveBooks();
  }, [])

  return (
    <div>
      {
        bookList.map((book) => {
          return <Book book={book} {...props} retrieveBooks={retrieveBooks} />
        })
      }
    </div>
  );

}


export default BookList;
