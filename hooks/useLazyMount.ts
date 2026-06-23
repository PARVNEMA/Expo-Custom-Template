import { useState, useEffect } from 'react';
import { InteractionManager } from 'react-native';

export function useLazyMount() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      // Small timeout to guarantee we yield to the UI thread for ripple animation
      setTimeout(() => setIsReady(true), 0);
    });
    return () => task.cancel();
  }, []);

  return isReady;
}
