import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchOverlay from '@components/Search/Overlay/SearchOverlay';
import useHiddenOverflow from '@hooks/useHiddenOverflow';

vi.mock('@components/shared/Transition/Transition', () => ({
  __esModule: true,
  default: ({ children, visible }) => (
    <div data-testid="transition" style={{ opacity: visible ? 1 : 0 }}>
      {visible ? children : null}
    </div>
  ),
}));

vi.mock('@hooks/useHiddenOverflow', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('@helpers/constValues', () => ({
  __esModule: true,
  default: 300,
}));

describe('SearchOverlay', () => {
  it('renders children and manages visibility correctly', () => {
    const { rerender } = render(
      <SearchOverlay visible={false}>
        <div>Test Content</div>
      </SearchOverlay>,
    );

    const transitions = screen.getAllByTestId('transition');
    expect(transitions[0]).toHaveStyle('opacity: 0');
    expect(transitions[1]).toHaveStyle('opacity: 0');
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();

    rerender(
      <SearchOverlay visible>
        <div>Test Content</div>
      </SearchOverlay>,
    );

    expect(transitions[0]).toHaveStyle('opacity: 1');
    expect(transitions[1]).toHaveStyle('opacity: 1');
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls useHiddenOverflow with the correct parameters', () => {
    render(
      <SearchOverlay visible>
        <div>Test Content</div>
      </SearchOverlay>,
    );

    expect(useHiddenOverflow).toHaveBeenCalledWith({ forceUsage: true });
  });
});
