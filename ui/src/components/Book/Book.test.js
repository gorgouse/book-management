import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Book from './Book';


test('test book', async () => {

    const book = { title: 'title1', author: 'a1', pubYear: '2024', isbn: '12-345-667-23345', label: 'label1', value: 'v1' }

    const mockSetBookList = jest.fn();

    const mockRetrieveBooks = jest.fn();

    const mockDeleteBook = jest.fn();

    const mockUpdateBookDetail = jest.fn();



    render(
        <Book
            book={book}
            retrieveBooks={mockRetrieveBooks}
            setBookList={mockSetBookList}
            deleteBook={mockDeleteBook}
            updateBookDetail={mockUpdateBookDetail}
        />);

    //click update
    await userEvent.click(screen.getByText(/Update/i));

    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();

    //click cancel
    await userEvent.click(screen.getByText(/Cancel/i));

    //click detail
    await userEvent.click(screen.getByText(/Detail/i));
});

