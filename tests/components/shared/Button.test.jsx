import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Button from '@components/shared/Button/Button';

describe('Button', () => {
  it('renders the button with the correct text', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me!</Button>);
    expect(getByText('Click me!')).toBeTruthy();
  });
});
