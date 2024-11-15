import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '@contexts/App/AppContextProvider';
import PurchaseContextProvider from '@contexts/Purchase/PurchaseContextProvider';
import App from '../src/App';

vi.mock('@features/Router/Router', () => ({
  __esModule: true,
  default: () => <div>Mocked Router</div>,
}));

vi.mock('@contexts/App/AppContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@contexts/Purchase/PurchaseContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@contexts/App/AppContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@contexts/Purchase/PurchaseContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>, // eslint-disable-line
}));

describe('App', () => {
  it('default', async () => {
    const { getByText } = render(
      <AppContextProvider>
        <PurchaseContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PurchaseContextProvider>
      </AppContextProvider>,
    );

    await waitFor(() => expect(getByText('Mocked Router')).toBeInTheDocument());
  });
});
