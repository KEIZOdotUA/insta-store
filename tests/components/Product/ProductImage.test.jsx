import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render } from '@testing-library/react';
import ProductImage from '@components/Product/Image/ProductImage';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

vi.mock('@contexts/Whitelabel/useWhitelabelContext');

describe('ProductImage', () => {
  const mockWhitelabelContext = {
    blobStorageUrl: 'https://mockstorage.com',
  };

  beforeEach(() => {
    useWhitelabelContext.mockReturnValue(mockWhitelabelContext);
  });

  it('default', () => {
    const { getByAltText } = render(
      <ProductImage size="m" id={123} name="Test Product" className="test-class" />,
    );

    const imgElement = getByAltText('Test Product');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://mockstorage.com/m-123.jpg');
    expect(imgElement).toHaveAttribute('class', 'test-class');
    expect(imgElement).toHaveAttribute('alt', 'Test Product');
  });
});
