import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CloseButton from '@components/CloseButton/CloseButton';

vi.mock('@assets/close.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="close-svg" />,
}));

vi.mock('@components//Button/Button', () => ({
  __esModule: true,
  default: ({ children, className, onClick }) => (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  ),
}));

describe('CloseButton', () => {
  it('renders with the correct class name and child SVG', () => {
    const { getByRole, getByTestId } = render(<CloseButton onClick={vi.fn()} />);

    const button = getByRole('button');
    const svg = getByTestId('close-svg');

    expect(button).toHaveClass('close-button');
    expect(svg).toBeInTheDocument();
  });

  it('applies additional className if provided', () => {
    const { getByRole } = render(<CloseButton className="extra-class" onClick={vi.fn()} />);
    const button = getByRole('button');

    expect(button).toHaveClass('close-button extra-class');
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(<CloseButton onClick={onClickMock} />);

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
