import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useAppContext from '@context/useAppContext';
import Menu from '@features/Menu/Menu';

vi.mock('@context/useAppContext');
vi.mock('@components//CloseButton/CloseButton', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <button type="button" onClick={onClick}>
      close
    </button>
  ),
}));

vi.mock('@components//Transition/Transition', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@features/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

const mockAppContext = {
  whitelabel: {
    shop: { name: 'whitelabel' },
  },
  categories: [
    {
      id: 1,
      name: 'Category 1',
      slug: 'Category1',
      show: true,
    },
    {
      id: 2,
      name: 'Category 2',
      slug: 'Category2',
      show: true,
    },
    {
      id: 3,
      name: 'Category 3',
      slug: 'Category3',
      show: false,
    },
  ],
  features: [
    {
      id: 1,
      name: 'Feature 1',
      slug: 'Feature1',
      show: true,
    },
    {
      id: 2,
      name: 'Feature 2',
      slug: 'Feature2',
      show: true,
    },
    {
      id: 3,
      name: 'Feature 3',
      slug: 'Feature3',
      show: false,
    },
  ],
};

useAppContext.mockReturnValue(mockAppContext);

describe('Menu', () => {
  it('default', () => {
    const mockMenuToggler = vi.fn();

    const { queryByText } = render(
      <MemoryRouter>
        <Menu visible menuToggler={mockMenuToggler} />
      </MemoryRouter>,
    );

    const closeButton = queryByText('close');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockMenuToggler).toHaveBeenCalled();

    expect(queryByText('whitelabel')).toBeInTheDocument();
    expect(queryByText('Category 1')).toBeInTheDocument();
    expect(queryByText('Category 2')).toBeInTheDocument();
    expect(queryByText('Category 3')).not.toBeInTheDocument();
    expect(queryByText('Feature 1')).toBeInTheDocument();
    expect(queryByText('Feature 2')).toBeInTheDocument();
    expect(queryByText('Feature 3')).not.toBeInTheDocument();
    expect(queryByText('Contact Us')).toBeInTheDocument();
  });
});
