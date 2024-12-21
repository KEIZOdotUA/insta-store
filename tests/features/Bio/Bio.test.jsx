import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import Bio from '@features/Bio/Bio';
import useAppContext from '@context/useAppContext';

vi.mock('@context/useAppContext');

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
