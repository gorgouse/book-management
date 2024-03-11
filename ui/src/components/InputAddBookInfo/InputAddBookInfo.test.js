import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import InputAddBookInfo from './InputAddBookInfo';


const bookData = () => [
  { name: 'title', label: 'Title', value: '' },
  { name: 'author', label: 'Author', value: '' },
  { name: 'pubYear', label: 'Public year', value: '' },
  { name: 'isbn', label: 'ISBN', value: '' }
]

test('test add input field for book', async () => {
  const mockSetBookInfo = jest.fn();
  const mockAddBookInputChange = jest.fn();

  render(
    <InputAddBookInfo
      bookData={bookData}
      setBookInfo={mockSetBookInfo}
      name="title"
      label="Title"
      value="newVal"
      addBookInputChange={mockAddBookInputChange}
    />);

  await userEvent.click(screen.getByText(/Submit/i));

  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});

