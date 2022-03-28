import React, { useState } from 'react';
import './CommonTextTooltip.styl';

interface TextTooltipProps {
  text: string;
  children?: React.ReactNode;
}

const TextTooltip = ({ text, children }: TextTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="tooltip-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div className="tooltip">
          <div className="triangle" />
          <div>{text}</div>
        </div>
      )}
    </div>
  );
};

export default TextTooltip;
