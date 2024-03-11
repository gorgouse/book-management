import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import BookList from './BookList';


test('test book list', async () => {
    const mockRetrieveBooks = jest.fn();
    const mockSetBookList = jest.fn();

    render(
        <BookList
            bookList={[
                { title: 'title1', author: 'a1', pubYear: '2024', isbn: '12-345-667-23345', label: 'label1', value: 'v1' }
            ]}
            retrieveBooks={mockRetrieveBooks}
            setBookList={mockSetBookList}
        />);

    expect(screen.getByText(/author/i)).toBeInTheDocument();
});

