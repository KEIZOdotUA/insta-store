import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from '@components/Menu/Menu';

vi.mock('@components/shared/Button/Button', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <button type="button" onClick={onClick}>
      close
    </button>
  ),
}));

vi.mock('@components/shared/Transition/Transition', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@components/Menu/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

describe('Menu', () => {
  it('default', () => {
    const mockMenuToggler = vi.fn();

    const { getByText } = render(
      <MemoryRouter>
        <Menu visible menuToggler={mockMenuToggler} />
      </MemoryRouter>,
    );

    const closeButton = getByText('close');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockMenuToggler).toHaveBeenCalled();

    expect(getByText('головна')).toBeInTheDocument();
    expect(getByText('про нас')).toBeInTheDocument();
    expect(getByText('Contact Us')).toBeInTheDocument();
  });
});
