import './index.css';
import Book from '../Book/Book'
import { useEffect, useState } from 'react';


function BookList({...props}) {

  const { retrieveBooks, bookList, setBookList } = props;

  useEffect(() => {
    retrieveBooks(setBookList);
  }, [])

  return (
    <div>
      {
        bookList.map((book) => {
          return (
            <Book
              book={book}
              setBookList={setBookList}
              retrieveBooks={retrieveBooks}
              {...props}
            />
          )
        })
      }
    </div>
  );

}


export default BookList;
