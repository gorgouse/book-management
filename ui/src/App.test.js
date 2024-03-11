import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';


test('Create a new book', async () => {
  const mockDeepCopyArray = jest.fn();
  const mockSetBookInfo = jest.fn();
  const mockCancelOpenAddModal = jest.fn();

  render(
    <App
      deepCopyArray={mockDeepCopyArray}
      addBook={mockSetBookInfo}
      cancelOpenAddModal={mockCancelOpenAddModal}
    />);
  await userEvent.click(screen.getByText(/Create a new book/i));
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});

