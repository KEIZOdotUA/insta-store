import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import StepName from '@components/Purchase/StepName/StepName';

describe('StepName', () => {
  it('renders without crashing', () => {
    const { container } = render(<StepName>Sample Step</StepName>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the provided children', () => {
    const { getByText } = render(<StepName>Sample Step</StepName>);
    expect(getByText('Sample Step')).toBeInTheDocument();
  });

  it('applies the correct class name', () => {
    const { container } = render(<StepName>Sample Step</StepName>);
    expect(container.firstChild).toHaveClass('purchase__step-name');
  });
});
