import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import Transition from '@components/shared/Transition/Transition';

vi.mock('react-transition-group', () => ({
  Transition: ({ children, in: inProp }) => children(inProp ? 'entered' : 'exited'),
}));

describe('Transition', () => {
  it('children', () => {
    const { getByText } = render(
      <Transition transitionType="opacity" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );
    expect(getByText('Transition Content')).toBeTruthy();
  });

  it('styles for opacity transition', () => {
    const { getByText } = render(
      <Transition transitionType="opacity" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );

    const element = getByText('Transition Content');
    expect(element.parentElement).toHaveStyle('transition: opacity 300ms ease-in-out');
    expect(element.parentElement).toHaveStyle('opacity: 1');
  });

  it('styles for transform transition', async () => {
    const { getByText } = render(
      <Transition transitionType="transform" duration={300} visible>
        <div>Transition Content</div>
      </Transition>,
    );

    const element = getByText('Transition Content');
    expect(element.parentElement).toHaveStyle('transition: transform 300ms ease-in-out');
    expect(element.parentElement).toHaveStyle('transform: translateX(0)');
  });

  it('styles for reverted transform transition', async () => {
    const { getByText } = render(
      <Transition transitionType="transform" duration={300} visible reverted>
        <div>Transition Content</div>
      </Transition>,
    );

    const element = getByText('Transition Content');
    expect(element.parentElement).toHaveStyle('transition: transform 300ms ease-in-out');
    expect(element.parentElement).toHaveStyle('transform: translateX(0)');
  });
});
