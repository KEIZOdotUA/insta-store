import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageSliderButton from '@components/ImageSlider/Button/ImageSliderButton';

describe('ImageSliderButton', () => {
  const defaultProps = {
    active: false,
    onClick: vi.fn(),
    animationDuration: 5000,
    animationDelay: 1000,
  };

  const renderButton = ({
    id,
    active,
    onClick,
    animationDuration,
    animationDelay,
  }) => render(
    <ImageSliderButton
      id={id}
      active={active}
      onClick={onClick}
      animationDuration={animationDuration}
      animationDelay={animationDelay}
    />,
  );

  it('should render the button with the correct class and structure', () => {
    renderButton(defaultProps);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('image-slider__button');

    const background = button.querySelector('.progress-bar__background');
    expect(background).toBeInTheDocument();

    const progressBar = background.querySelector('.progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).not.toHaveClass('filling');
  });

  it('should apply the "filling" class when active is true', () => {
    renderButton({ ...defaultProps, active: true });

    const progressBar = screen.getByRole('button').querySelector('.progress-bar');
    expect(progressBar).toHaveClass('filling');
  });

  it('should apply animation styles when active is true', () => {
    renderButton({ ...defaultProps, active: true });

    const progressBar = screen.getByRole('button').querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({
      animationDuration: '4000ms', // 5000 - 1000
      animationName: 'fill',
      animationDelay: '1000ms',
    });
  });

  it('should not apply animation styles when active is false', () => {
    renderButton({ ...defaultProps, active: false });

    const progressBar = screen.getByRole('button').querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({
      animationDuration: '0s',
      animationName: 'none',
      animationDelay: '0s',
    });
  });

  it('should call onClick when the button is clicked', () => {
    renderButton(defaultProps);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
