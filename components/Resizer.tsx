
import React from 'react';

interface ResizerProps {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Resizer: React.FC<ResizerProps> = ({ onMouseDown }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      className="h-1 bg-border-color cursor-row-resize hover:bg-accent transition-colors duration-150"
      aria-label="Resize panel"
      role="separator"
    />
  );
};
