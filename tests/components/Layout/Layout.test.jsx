import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Layout from '@components/Layout/Layout';

vi.mock('@components/Header/Header', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mock Header</div>),
}));

vi.mock('@components/Menu/Menu', () => ({
  __esModule: true,
  default: vi.fn(({ visible, menuToggler }) => (
    <div role="button" onClick={menuToggler} onKeyDown={menuToggler} tabIndex={0}>
      {visible ? 'Mock Menu Visible' : 'Mock Menu Hidden'}
    </div>
  )),
}));

vi.mock('@components/Purchase/Purchase', () => ({
  __esModule: true,
  default: vi.fn(({ visible, purchaseToggler }) => (
    <div role="button" onClick={purchaseToggler} onKeyDown={purchaseToggler} tabIndex={0}>
      {visible ? 'Mock Purchase Visible' : 'Mock Purchase Hidden'}
    </div>
  )),
}));

vi.mock('react-router-dom', () => ({
  __esModule: true,
  Outlet: vi.fn(() => <div>Mock Outlet</div>),
}));

describe('Layout', () => {
  it('default', () => {
    const { getByText } = render(<Layout />);

    expect(getByText('Mock Header')).toBeInTheDocument();
    expect(getByText('Mock Menu Hidden')).toBeInTheDocument();
    expect(getByText('Mock Purchase Hidden')).toBeInTheDocument();
    expect(getByText('Mock Outlet')).toBeInTheDocument();
  });

  it('menuToggler', async () => {
    const { getByText } = render(<Layout />);

    fireEvent.click(getByText('Mock Menu Hidden'));

    expect(getByText('Mock Menu Visible')).toBeInTheDocument();
  });

  it('purchaseToggler', () => {
    const { getByText } = render(<Layout />);

    fireEvent.click(getByText('Mock Purchase Hidden'));

    expect(getByText('Mock Purchase Visible')).toBeInTheDocument();
  });
});
