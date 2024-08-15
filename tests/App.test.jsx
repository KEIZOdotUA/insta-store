import {
  render,
  fireEvent,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import App from '../src/App';

vi.mock('@components/Header/Header', () => ({
  default: vi.fn(() => <div>Mocked Header</div>),
}));

vi.mock('@components/Bio/Bio', () => ({
  default: vi.fn(() => <div>Mocked Bio</div>),
}));

vi.mock('@components/Product/List/ProductsList', () => ({
  default: vi.fn(() => <div>Mocked ProductsList</div>),
}));

vi.mock('@components/Sidebar/Sidebar', () => ({
  default: vi.fn(({ visible, sidebarToggler }) => (
    <div>
      {`Mocked Sidebar ${visible ? 'Visible' : 'Hidden'}`}
      <button type="button" onClick={sidebarToggler}>Toggle Sidebar</button>
    </div>
  )),
}));

vi.mock('@contexts/Whitelabel/WhitelabelContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@contexts/Cart/CartContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('App Component', () => {
  it('default', () => {
    const { getByText } = render(<App />);

    expect(getByText('Mocked Header')).toBeInTheDocument();
    expect(getByText('Mocked Bio')).toBeInTheDocument();
    expect(getByText('Mocked ProductsList')).toBeInTheDocument();
    expect(getByText('Mocked Sidebar Hidden')).toBeInTheDocument();
  });

  it('sidebar visibility', () => {
    const { getByText } = render(<App />);

    const toggleButton = getByText('Toggle Sidebar');
    expect(getByText('Mocked Sidebar Hidden')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(getByText('Mocked Sidebar Visible')).toBeInTheDocument();
  });
});
