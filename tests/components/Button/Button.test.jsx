import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Button from '@components/Button/Button';

describe('Button', () => {
  it('renders a default button', () => {
    const { getByText } = render(<Button>default</Button>);
    const button = getByText('default');
    expect(button).toBeTruthy();
    expect(button).not.toHaveClass('dark-button');
    expect(button).not.toHaveClass('light-button');
    expect(button).not.toHaveClass('disabled-button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>onClick</Button>);
    fireEvent.click(getByText('onClick'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw if onClick is not provided', () => {
    const { getByText } = render(<Button>no onClick</Button>);
    const button = getByText('no onClick');
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it('applies the dark class when dark prop is true', () => {
    const { getByText } = render(<Button dark>dark</Button>);
    expect(getByText('dark')).toHaveClass('dark-button');
  });

  it('applies the light class when light prop is true', () => {
    const { getByText } = render(<Button light>light</Button>);
    expect(getByText('light')).toHaveClass('light-button');
  });

  it('applies the disabled class when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>disabled</Button>);
    expect(getByText('disabled')).toHaveClass('disabled-button');
  });

  it('applies a custom class when provided', () => {
    const { getByText } = render(<Button className="custom-class">custom</Button>);
    expect(getByText('custom')).toHaveClass('custom-class');
  });

  it('renders as a submit button when submit prop is true', () => {
    const { getByText } = render(<Button submit>submit</Button>);
    const button = getByText('submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders as a button by default when submit prop is false', () => {
    const { getByText } = render(<Button>default</Button>);
    const button = getByText('default');
    expect(button).toHaveAttribute('type', 'button');
  });
});
