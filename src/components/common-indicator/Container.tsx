import React from 'react';
import Presentational from './Presentational';

export interface IndicatorProps {
  size?: 'medium' | 'small';
}

const IndicatorContainer = ({ size }: IndicatorProps) => {
  const indicatorSize = size ? size : 'medium';
  return <Presentational size={indicatorSize} />;
};

export default IndicatorContainer;
