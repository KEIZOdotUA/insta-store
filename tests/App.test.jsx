import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '@context/AppContextProvider';
import App from '../src/App';

vi.mock('@features/Router/Router', () => ({
  __esModule: true,
  default: () => <div>Mocked Router</div>,
}));

vi.mock('@context/AppContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@context/Purchase/PurchaseContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('@context/AppContextProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>, // eslint-disable-line
}));

describe('App', () => {
  it('default', async () => {
    const { getByText } = render(
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>,
    );

    await waitFor(() => expect(getByText('Mocked Router')).toBeInTheDocument());
  });
});
