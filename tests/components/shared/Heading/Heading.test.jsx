import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Heading from '@components/shared/Heading/Heading';

describe('Heading', () => {
  it('renders the provided children inside an h1 element', () => {
    const { getByText } = render(<Heading>Test Heading</Heading>);

    expect(getByText('Test Heading')).toBeInTheDocument();
    expect(getByText('Test Heading').tagName).toBe('H1');
  });
});
