import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import Bio from '@components/Bio/Bio';
import useAppContext from '@contexts/App/useAppContext';

vi.mock('@contexts/App/useAppContext');

describe('Bio', () => {
  it('default', () => {
    const mockBio = '<strong>Test Bio</strong>';
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          bio: mockBio,
        },
      },
    });

    const { getByText } = render(<Bio />);

    expect(getByText('Test Bio')).toBeTruthy();
    expect(getByText('Test Bio').tagName).toBe('STRONG');
  });
});
