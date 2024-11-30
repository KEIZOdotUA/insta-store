import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render } from '@testing-library/react';
import ScrollPaginator from '@components/shared/ScrollPaginator/ScrollPaginator';

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = [];
  }

  observe(element) {
    this.elements.push(element);
    this.callback([{ isIntersecting: true }]); // Simulate element visibility
  }

  unobserve(element) {
    this.elements = this.elements.filter((el) => el !== element);
  }

  disconnect() {
    this.elements = [];
  }
}

describe('ScrollPaginator', () => {
  const mockItems = Array.from({ length: 25 }, (_, i) => (
    <div key={i} data-testid={`item-${i}`}>
      {`Item ${i + 1}`}
    </div>
  ));

  beforeEach(() => {
    global.IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial items', () => {
    const { queryByTestId } = render(<ScrollPaginator items={mockItems} />);

    for (let i = 0; i < 18; i += 1) {
      expect(queryByTestId(`item-${i}`)).toBeInTheDocument();
    }

    expect(queryByTestId('item-18')).not.toBeInTheDocument();
  });

  it('loads more items when the observer triggers', () => {
    const { queryByTestId } = render(<ScrollPaginator items={mockItems} />);

    // Simulate the IntersectionObserver triggering
    const observer = new MockIntersectionObserver(() => {});
    observer.observe(null);

    for (let i = 0; i < 15; i += 1) {
      expect(queryByTestId(`item-${i}`)).toBeInTheDocument();
    }
  });

  it('cleans up IntersectionObserver on unmount', () => {
    const { unmount } = render(<ScrollPaginator items={mockItems} />);
    const observer = new MockIntersectionObserver(() => {});

    // Unmount the component
    unmount();

    expect(observer.elements).toHaveLength(0);
  });
});
