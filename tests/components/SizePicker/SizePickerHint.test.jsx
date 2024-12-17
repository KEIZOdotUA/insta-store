import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SizePickerHint from '@components/SizePicker/Hint/SizePickerHint';
import Button from '@components/Button/Button';
import Hint from '@components/Hint/Hint';
import parse from 'html-react-parser';

vi.mock('@components/Button/Button');
vi.mock('@components/Hint/Hint');
vi.mock('html-react-parser', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('SizePickerHint', () => {
  const mockHint = '<p>Size guide content</p>';
  const mockParsedContent = 'Size guide content';

  beforeEach(() => {
    Button.mockImplementation(({ className, onClick, children }) => (
      <button className={className} onClick={onClick} type="button">
        {children}
      </button>
    ));
    Hint.mockImplementation(({ content, onClose }) => (
      <div>
        <div>{content}</div>
        <button onClick={onClose} type="button">Close</button>
      </div>
    ));
    parse.mockImplementation((html) => html === mockHint && mockParsedContent);
  });

  it('renders the button with the correct text', () => {
    const { getByText } = render(<SizePickerHint hint={mockHint} />);
    const button = getByText('Як визначити розмір');
    expect(button).toBeInTheDocument();
  });

  it('opens the Hint when the button is clicked', () => {
    const { getByText } = render(<SizePickerHint hint={mockHint} />);
    const button = getByText('Як визначити розмір');

    fireEvent.click(button);

    expect(parse).toHaveBeenCalledWith(mockHint);
    expect(getByText(mockParsedContent)).toBeInTheDocument();
  });

  it('closes the Hint when the close button is clicked', () => {
    const { getByText, queryByText } = render(<SizePickerHint hint={mockHint} />);
    const button = getByText('Як визначити розмір');

    // Open the Hint
    fireEvent.click(button);
    expect(getByText(mockParsedContent)).toBeInTheDocument();

    // Close the Hint
    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(queryByText(mockParsedContent)).toBeNull();
  });

  it('does not render the Hint initially', () => {
    const { queryByText } = render(<SizePickerHint hint={mockHint} />);
    expect(queryByText(mockParsedContent)).toBeNull();
  });
});
