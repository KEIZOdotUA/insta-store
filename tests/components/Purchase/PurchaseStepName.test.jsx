import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PurchaseStepName from '@components/Purchase/StepName/PurchaseStepName';

describe('StepName', () => {
  it('renders without crashing', () => {
    const { container } = render(<PurchaseStepName>Sample Step</PurchaseStepName>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the provided children', () => {
    const { getByText } = render(<PurchaseStepName>Sample Step</PurchaseStepName>);
    expect(getByText('Sample Step')).toBeInTheDocument();
  });

  it('applies the correct class name', () => {
    const { container } = render(<PurchaseStepName>Sample Step</PurchaseStepName>);
    expect(container.firstChild).toHaveClass('purchase__step-name');
  });
});
