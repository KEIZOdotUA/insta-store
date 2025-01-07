import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ImageSlider from '@components/ImageSlider/ImageSlider';

vi.mock('@components/ImageSlider/Button/ImageSliderButton', () => ({
  __esModule: true,
  default: vi.fn(({ active, onClick }) => (
    <button
      data-testid="slider-button"
      className={active ? 'active' : ''}
      onClick={onClick}
      type="button"
    >
      Button
    </button>
  )),
}));

describe('ImageSlider', () => {
  const mockItems = [
    {
      id: 1,
      image: { src: '/image1.jpg', alt: 'Image 1' },
      link: '/link1',
    },
    {
      id: 2,
      image: { src: '/image2.jpg', alt: 'Image 2' },
      link: '/link2',
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  const renderSlider = (duration = 1, transitionDuration = 1) => (
    render(
      <MemoryRouter>
        <ImageSlider
          items={mockItems}
          duration={duration}
          transitionDuration={transitionDuration}
        />
      </MemoryRouter>,
    )
  );

  it('should render the images and paginator buttons', () => {
    renderSlider();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockItems.length);
    expect(images[0]).toHaveAttribute('src', mockItems[0].image.src);
    expect(images[0]).toHaveAttribute('alt', mockItems[0].image.alt);

    const buttons = screen.getAllByTestId('slider-button');
    expect(buttons).toHaveLength(mockItems.length);
  });

  it('should show the first image initially', () => {
    renderSlider();

    const activeImage = screen.getByRole('img', { name: 'Image 1' });
    expect(activeImage).toHaveClass('active');
  });

  it('should switch to the next image after the duration', () => {
    renderSlider(3000);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const activeImage = screen.getByRole('img', { name: 'Image 2' });
    expect(activeImage).toHaveClass('active');
  });

  it('should loop back to the first image after the last image', () => {
    renderSlider(3000);

    act(() => {
      vi.advanceTimersByTime(3000 * mockItems.length);
    });

    const activeImage = screen.getByRole('img', { name: 'Image 1' });
    expect(activeImage).toHaveClass('active');
  });

  it('should navigate to the correct link when the active image is clicked', () => {
    renderSlider();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockItems[0].link);
  });

  it('should activate the correct image when a paginator button is clicked', () => {
    renderSlider();

    const buttons = screen.getAllByTestId('slider-button');
    fireEvent.click(buttons[1]);

    const activeImage = screen.getByRole('img', { name: 'Image 2' });
    expect(activeImage).toHaveClass('active');
  });

  it('should use default duration and transitionDuration if not provided', () => {
    render(
      <MemoryRouter>
        <ImageSlider
          items={mockItems}
        />
      </MemoryRouter>,
    );

    const images = screen.getAllByRole('img');
    images.forEach((image) => {
      expect(image).toHaveStyle('transition-duration: 1000ms');
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const activeImage = screen.getByRole('img', { name: 'Image 2' });
    expect(activeImage).toHaveClass('active');
  });
});
