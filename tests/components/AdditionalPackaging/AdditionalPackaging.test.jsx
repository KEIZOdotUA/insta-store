import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useParams, useNavigate } from 'react-router-dom';
import AdditionalPackaging from '@components/AdditionalPackaging/AdditionalPackaging';
import useAppContext from '@contexts/App/useAppContext';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@contexts/App/useAppContext');
vi.mock('@contexts/Shopping/useShoppingContext');
vi.mock('@helpers/dispatchTrackingEvent');
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('AdditionalPackaging', () => {
  const mockPackaging = {
    id: '1',
    name: 'Gift Box',
    price: 100,
  };

  const mockFindCartItem = vi.fn();
  const mockAddCartItem = vi.fn();
  const mockRemoveCartItem = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      packaging: mockPackaging,
    });

    useShoppingContext.mockReturnValue({
      findCartItem: mockFindCartItem,
      addCartItem: mockAddCartItem,
      removeCartItem: mockRemoveCartItem,
    });

    useParams.mockReturnValue({ categorySlug: 'gifts' });
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('default', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('Gift Box')).toBeInTheDocument();
  });

  it('adds packaging', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const addButton = getByText('так');
    fireEvent.click(addButton);

    expect(mockAddCartItem).toHaveBeenCalledWith(mockPackaging);
  });

  it('removes packaging', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const removeButton = getByText('ні');
    fireEvent.click(removeButton);

    expect(mockRemoveCartItem).toHaveBeenCalledWith(mockPackaging.id);
  });

  it('packaging detail', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const packagingName = getByText('Gift Box');
    fireEvent.click(packagingName);

    expect(dispatchTrackingEvent).toHaveBeenCalledWith({
      event: 'view_item',
      ecommerce: {
        currency: 'UAH',
        value: mockPackaging.price,
        items: [
          {
            item_id: mockPackaging.id,
            item_name: mockPackaging.name,
            index: 0,
            price: mockPackaging.price,
            quantity: 1,
          },
        ],
      },
    });

    expect(mockNavigate).toHaveBeenCalledWith('/gifts/1');
  });

  it('packaging is in the cart', () => {
    mockFindCartItem.mockReturnValue(true);

    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('так')).toHaveClass('selected-action');
  });

  it('packaging is not in the cart', () => {
    mockFindCartItem.mockReturnValue(false);

    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('ні')).toHaveClass('selected-action');
  });
});
