import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import InputUpdateBookInfo from './InputUpdateBookInfo';

const mockSetUpdateBook = jest.fn();
const mockUpdateBookInfoChange = jest.fn();
const updateBookList = [
    { name: 'title', label: 'Title', value: '1' },
    { name: 'author', label: 'Author', value: '2' },
    { name: 'pubYear', label: 'Public year', value: '3' },
    { name: 'isbn', label: 'ISBN', value: '4' }
];

test('test update input field for book', () => {
    render(
    <InputUpdateBookInfo
        isDetail={true}
        updateId={1}
        updateBookList={updateBookList}
        name="title"
        label="Title"
        value="newVal"
        setUpdateBook={mockSetUpdateBook}
        updateBookInfoChange={mockUpdateBookInfoChange}
    />)

    expect(screen.getByRole('textbox')).not.toBeNull();
});

