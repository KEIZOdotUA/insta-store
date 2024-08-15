import { describe, it, expect } from 'vitest';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

describe('dispatchTrackingEvent', () => {
  it('should push data', () => {
    global.window = {
      dataLayer: [],
    };

    const mockData = { event: 'purchase', ecommerce: { value: 100 } };

    dispatchTrackingEvent(mockData);

    expect(global.window.dataLayer.length).toBe(2);
    expect(global.window.dataLayer[0]).toEqual({ ecommerce: null });
    expect(global.window.dataLayer[1]).toEqual(mockData);
  });

  it('should not push data if window is undefined', () => {
    delete global.window;

    const mockData = { event: 'purchase', ecommerce: { value: 100 } };

    expect(() => dispatchTrackingEvent(mockData)).not.toThrow();
  });

  it('should not push data if data is empty', () => {
    global.window = {
      dataLayer: [],
    };

    const mockData = {};

    dispatchTrackingEvent(mockData);

    expect(global.window.dataLayer.length).toBe(0);
  });
});
