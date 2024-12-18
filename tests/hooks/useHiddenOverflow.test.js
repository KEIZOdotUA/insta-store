import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from 'vitest';
import { renderHook } from '@testing-library/react';
import useHiddenOverflow from '@hooks/useHiddenOverflow';

describe('useHiddenOverflow', () => {
  const originalInnerWidth = window.innerWidth;
  const originalOverflow = document.body.style.overflow;

  beforeEach(() => {
    window.innerWidth = originalInnerWidth;
    document.body.style.overflow = originalOverflow;
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    document.body.style.overflow = originalOverflow;
  });

  it('active & mobile', () => {
    window.innerWidth = 400;

    const { unmount } = renderHook(() => useHiddenOverflow({ active: true }));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('active & not mobile', () => {
    window.innerWidth = 500;

    const { unmount } = renderHook(() => useHiddenOverflow({ active: true }));

    expect(document.body.style.overflow).toBe('');

    unmount();

    expect(document.body.style.overflow).toBe('');
  });

  it('forceUsage', () => {
    window.innerWidth = 500;

    const { unmount } = renderHook(() => useHiddenOverflow({ forceUsage: true }));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('on unmount', () => {
    window.innerWidth = 400;

    const { unmount } = renderHook(() => useHiddenOverflow({ active: true }));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('not active & not forceUsage', () => {
    window.innerWidth = 400;

    const { unmount } = renderHook(() => useHiddenOverflow({ active: false, forceUsage: false }));

    expect(document.body.style.overflow).toBe('');

    unmount();

    expect(document.body.style.overflow).toBe('');
  });
});
