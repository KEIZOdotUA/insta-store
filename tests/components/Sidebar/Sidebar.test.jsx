import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '@components/Sidebar/Sidebar';

vi.mock('@components/ConfirmationNotification/ConfirmationNotification');

describe('Sidebar', () => {
  const mockSidebarToggler = vi.fn();

  beforeEach(() => {
    mockSidebarToggler.mockClear();
    vi.mock('@components/shared/Transition/Transition', () => ({
      __esModule: true,
      default: vi.fn(({ children }) => <div>{children}</div>),
    }));
    vi.mock('@components/Cart/Cart', () => ({
      __esModule: true,
      default: vi.fn(({ onOrder }) => <div role="button" tabIndex="0" onClick={onOrder} onKeyDown={onOrder}>Mocked Cart</div>),
    }));
    vi.mock('@components/OrderDetails/OrderDetails', () => ({
      __esModule: true,
      default: vi.fn(({ onOrder }) => <div role="button" tabIndex="0" onKeyDown={onOrder} onClick={onOrder}>Mocked OrderDetails</div>),
    }));
    vi.mock('@components/ConfirmationNotification/ConfirmationNotification', () => ({
      __esModule: true,
      default: vi.fn(() => <div>Mocked ConfirmationNotification</div>),
    }));
  });

  it('default', () => {
    const { getByText } = render(
      <Sidebar visible sidebarToggler={mockSidebarToggler} />,
    );

    expect(getByText('Mocked Cart')).toBeInTheDocument();
  });

  it('OrderDetails', () => {
    const { getByText } = render(
      <Sidebar visible sidebarToggler={mockSidebarToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    expect(getByText('Mocked OrderDetails')).toBeInTheDocument();
  });

  it('ConfirmationNotification ', () => {
    const { getByText } = render(
      <Sidebar visible sidebarToggler={mockSidebarToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));
    expect(getByText('Mocked ConfirmationNotification')).toBeInTheDocument();
  });

  it('resets', async () => {
    const { getByText, getByAltText } = render(
      <Sidebar visible sidebarToggler={mockSidebarToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));

    fireEvent.click(getByAltText('close'));

    await waitFor(() => {
      expect(mockSidebarToggler).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      fireEvent.click(getByAltText('close'));
      expect(getByText('Mocked Cart')).toBeInTheDocument();
    });
  });

  it('sidebarToggler', async () => {
    const { getByAltText } = render(
      <Sidebar visible sidebarToggler={mockSidebarToggler} />,
    );

    fireEvent.click(getByAltText('close'));

    await waitFor(() => {
      expect(mockSidebarToggler).toHaveBeenCalledTimes(1);
    });
  });

  it('продовжити покупки', async () => {
    const { getByText } = render(
      <Sidebar visible sidebarToggler={mockSidebarToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));

    fireEvent.click(getByText('продовжити покупки'));

    await waitFor(() => {
      expect(mockSidebarToggler).toHaveBeenCalledTimes(1);
      expect(getByText('Mocked Cart')).toBeInTheDocument();
    });
  });
});
