import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import Bio from '@components/Bio/Bio';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

vi.mock('@contexts/Whitelabel/useWhitelabelContext');

describe('Bio', () => {
  it('default', () => {
    const mockBio = '<strong>Test Bio</strong>';
    useWhitelabelContext.mockReturnValue({
      shop: {
        bio: mockBio,
      },
    });

    const { getByText } = render(<Bio />);

    expect(getByText('Test Bio')).toBeTruthy();
    expect(getByText('Test Bio').tagName).toBe('STRONG');
  });
});
