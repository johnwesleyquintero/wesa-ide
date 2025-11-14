
import { useState, useCallback, useEffect } from 'react';

export const useResizablePanel = (initialHeight: number, minHeight: number, maxHeightPercent: number) => {
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    const newHeight = window.innerHeight - e.clientY;
    const maxHeight = window.innerHeight * maxHeightPercent;
    
    if (newHeight > minHeight && newHeight < maxHeight) {
      setHeight(newHeight);
    }
  }, [isResizing, minHeight, maxHeightPercent]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return { height, handleMouseDown };
};
