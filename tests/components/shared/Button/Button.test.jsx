import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Button from '@components/shared/Button/Button';

describe('Button', () => {
  it('default button', () => {
    const { getByText } = render(<Button onClick={() => {}}>default</Button>);
    const button = getByText('default');
    expect(button).toBeTruthy();
    expect(button).not.toHaveClass('dark-button');
    expect(button).not.toHaveClass('light-button');
    expect(button).not.toHaveClass('disabled-button');
  });

  it('calls onClick', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>onClick</Button>);
    fireEvent.click(getByText('onClick'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies dark class', () => {
    const { getByText } = render(<Button onClick={() => {}} dark>dark</Button>);
    expect(getByText('dark')).toHaveClass('dark-button');
  });

  it('applies light class', () => {
    const { getByText } = render(<Button onClick={() => {}} light>light</Button>);
    expect(getByText('light')).toHaveClass('light-button');
  });

  it('applies disabled class', () => {
    const { getByText } = render(<Button onClick={() => {}} disabled>disabled</Button>);
    expect(getByText('disabled')).toHaveClass('disabled-button');
  });

  it('applies custom class', () => {
    const { getByText } = render(<Button onClick={() => {}} className="custom-class">custom</Button>);
    expect(getByText('custom')).toHaveClass('custom-class');
  });
});
