import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import Transition from '@components/Transition/Transition';

vi.mock('react-transition-group', () => ({
  Transition: ({ children, in: inProp }) => children(inProp ? 'entered' : 'exited'),
}));

describe('Transition', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Transition transitionType="opacity" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );
    expect(getByText('Transition Content')).toBeTruthy();
  });

  it('applies opacity transition styles', () => {
    const { getByText } = render(
      <Transition transitionType="opacity" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );

    const element = getByText('Transition Content');
    expect(element.parentElement).toHaveStyle('transition: opacity 300ms ease-in-out');
    expect(element.parentElement).toHaveStyle('opacity: 1');
  });

  it('applies transform transition with direction "right"', () => {
    const { getByText } = render(
      <Transition transitionType="transform" transitionDirection="right" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );

    const element = getByText('Transition Content');
    expect(element.parentElement).toHaveStyle('transition: transform 300ms ease-in-out');
    expect(element.parentElement).toHaveStyle('transform: translateX(0)');
  });

  it('applies transform transition with direction "left"', () => {
    const { getByText } = render(
      <Transition transitionType="transform" transitionDirection="left" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );

    const element = getByText('Transition Content');
    expect(element.parentElement).toHaveStyle('transition: transform 300ms ease-in-out');
    expect(element.parentElement).toHaveStyle('transform: translateX(0)');
  });

  it('applies transform transition with direction "bottom"', () => {
    const { getByText } = render(
      <Transition transitionType="transform" transitionDirection="bottom" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );

    const element = getByText('Transition Content');
    expect(element.parentElement).toHaveStyle('transition: transform 300ms ease-in-out');
    expect(element.parentElement).toHaveStyle('transform: translateY(0)');
  });
});
