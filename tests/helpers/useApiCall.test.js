import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import axios from 'axios';
import useAppContext from '@contexts/App/useAppContext';
import useApiCall from '@helpers/useApiCall';

vi.mock('axios');
vi.mock('@contexts/App/useAppContext');

describe('useApiCall', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends a POST request to the correct URL with the correct payload', () => {
    const mockCreateOrderUrl = 'https://example.com/api/orders';
    const mockContext = {
      whitelabel: { createOrderUrl: mockCreateOrderUrl },
    };
    useAppContext.mockReturnValue(mockContext);

    const sendOrder = useApiCall();

    const mockId = '123';
    const mockCartItems = [
      { id: 'item1', quantity: 2, price: 50 },
      { id: 'item2', quantity: 1, price: 30 },
    ];
    const mockDetails = {
      name: 'John Doe',
      phone: '123456789',
    };

    sendOrder(mockId, mockCartItems, mockDetails);

    expect(axios.post).toHaveBeenCalledWith(mockCreateOrderUrl, {
      id: mockId,
      items: mockCartItems,
      details: mockDetails,
    });
  });

  it('throws an error if the context is missing the whitelabel object', () => {
    useAppContext.mockReturnValue({});

    const sendOrder = useApiCall();

    expect(() => sendOrder('123', [], {})).toThrowError('Cannot read properties of undefined (reading \'createOrderUrl\')');
  });
});
