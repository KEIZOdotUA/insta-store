import {
  vi,
  describe,
  it,
  expect,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ShareButton from '@components/ShareButton/ShareButton';

vi.mock('@components//Button/Button', () => ({
  __esModule: true,
  default: ({ onClick, children }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('@assets/share.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="share-icon" />,
}));

describe('ShareButton', () => {
  const mockShare = vi.fn();
  const mockOnShare = vi.fn();
  const originalNavigator = global.navigator;

  beforeAll(() => {
    global.navigator = {
      ...originalNavigator,
      share: mockShare,
    };
  });

  afterAll(() => {
    global.navigator = originalNavigator;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockProps = {
    title: 'Test Title',
    text: 'Test Text',
    url: 'https://test.com',
    onShare: mockOnShare,
  };

  it('default', () => {
    const { getByTestId } = render(
      <ShareButton
        title={mockProps.title}
        text={mockProps.text}
        url={mockProps.url}
      />,
    );

    expect(getByTestId('share-icon')).toBeInTheDocument();
  });

  it('onClick', () => {
    const { getByRole } = render(
      <ShareButton
        title={mockProps.title}
        text={mockProps.text}
        url={mockProps.url}
      />,
    );

    fireEvent.click(getByRole('button'));

    expect(mockShare).toHaveBeenCalledWith({
      title: mockProps.title,
      text: mockProps.text,
      url: mockProps.url,
    });
  });

  it('OnShare', () => {
    const { getByRole } = render(
      <ShareButton
        title={mockProps.title}
        text={mockProps.text}
        url={mockProps.url}
        onShare={mockProps.onShare}
      />,
    );

    fireEvent.click(getByRole('button'));

    expect(mockOnShare).toHaveBeenCalled();
  });

  it('navigator.share is unavailable', () => {
    delete global.navigator.share;

    const { queryByRole } = render(
      <ShareButton
        title={mockProps.title}
        text={mockProps.text}
        url={mockProps.url}
      />,
    );

    expect(queryByRole('button')).toBeNull();
  });
});
