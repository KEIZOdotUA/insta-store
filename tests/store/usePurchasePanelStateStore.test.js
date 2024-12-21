import { describe, it, expect } from 'vitest';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';

describe('usePurchasePanelStateStore', () => {
  it('should initialize with visible set to false', () => {
    const { visible } = usePurchasePanelStateStore.getState();
    expect(visible).toBe(false);
  });

  it('should set visible to true when show is called', () => {
    const { show } = usePurchasePanelStateStore.getState();
    show();
    const { visible } = usePurchasePanelStateStore.getState();
    expect(visible).toBe(true);
  });

  it('should set visible to false when hide is called', () => {
    const { show, hide } = usePurchasePanelStateStore.getState();
    show();
    hide();
    const { visible } = usePurchasePanelStateStore.getState();
    expect(visible).toBe(false);
  });
});
