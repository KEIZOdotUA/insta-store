import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import Menu from '@components/Menu/Menu';

vi.mock('@contexts/App/useAppContext');
vi.mock('@components/shared/CloseButton/CloseButton', () => ({
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

vi.mock('@components/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

const mockAppContext = {
  categories: [
    { id: 1, name: 'Category 1', slug: 'Category1' },
    { id: 2, name: 'Category 2', slug: 'Category2' },
  ],
};

useAppContext.mockReturnValue(mockAppContext);

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
    expect(getByText('Category 1')).toBeInTheDocument();
    expect(getByText('Category 2')).toBeInTheDocument();
    expect(getByText('про нас')).toBeInTheDocument();
    expect(getByText('Contact Us')).toBeInTheDocument();
  });
});
