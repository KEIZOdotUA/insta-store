import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SizePickerHint from '@components/SizePicker/Hint/SizePickerHint';
import Modal from '@components/Modal/Modal';
import parse from 'html-react-parser';

vi.mock('@components//Modal/Modal');
vi.mock('html-react-parser');

describe('SizePickerHint', () => {
  const mockHint = 'Size guide content';
  const mockParse = vi.fn((html) => html);

  beforeEach(() => {
    Modal.mockImplementation(({ children, onClose }) => (
      <div>
        <button onClick={onClose} type="button">Close</button>
        {children}
      </div>
    ));
    parse.mockImplementation(mockParse);
  });

  it('default', () => {
    const { getByText, queryByText } = render(<SizePickerHint hint={mockHint} />);

    const hintElement = getByText('Як визначити розмір');
    expect(hintElement).toBeInTheDocument();

    expect(queryByText('Size guide content')).toBeNull();

    fireEvent.click(hintElement);

    expect(parse).toHaveBeenCalledWith(mockHint);
    expect(getByText('Size guide content')).toBeInTheDocument();
  });

  it('onClose', () => {
    const { getByText } = render(<SizePickerHint hint={mockHint} />);

    const hintElement = getByText('Як визначити розмір');
    fireEvent.click(hintElement);

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(closeButton).not.toBeInTheDocument();
  });

  it('opens the modal when triggered by keyboard events', () => {
    const { getByText } = render(<SizePickerHint hint={mockHint} />);

    const hintElement = getByText('Як визначити розмір');
    fireEvent.keyDown(hintElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(parse).toHaveBeenCalledWith(mockHint);
    expect(getByText('Size guide content')).toBeInTheDocument();
  });
});
