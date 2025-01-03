import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DeliveryAndPayment from '@pages/DeliveryAndPayment/DeliveryAndPaymentPage';

describe('DeliveryAndPayment Page', () => {
  it('should render the heading', () => {
    render(<DeliveryAndPayment />);
    const heading = screen.getByText('ДОСТАВКА ТА ОПЛАТА');
    expect(heading).toBeInTheDocument();
  });

  it('should render all paragraphs', () => {
    render(<DeliveryAndPayment />);
    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs.length).toBe(4);
    paragraphs.forEach((paragraph) => {
      expect(paragraph.tagName).toBe('P');
    });
  });
});
