import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Returns from '@pages/Returns/ReturnsPage';

describe('Returns Page', () => {
  it('should render the heading', () => {
    render(<Returns />);
    const heading = screen.getByText('ПОВЕРНЕННЯ ТА ОБМІН');
    expect(heading).toBeInTheDocument();
  });

  it('should render all paragraphs', () => {
    render(<Returns />);
    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs.length).toBe(2);
    paragraphs.forEach((paragraph) => {
      expect(paragraph.tagName).toBe('P');
    });
  });
});
