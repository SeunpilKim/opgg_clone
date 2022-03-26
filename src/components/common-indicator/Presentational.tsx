import React from 'react';
import './CommonIndicator.styl';
const icon = require('../../assets/icons/ic-progress-indicatior.png');

interface PresentationalIndicator {
  size: 'medium' | 'small';
}

const Presentational = ({ size }: PresentationalIndicator) => {
  return (
    <div className={'common-indicator'}>
      <div className={'common-indicator-img ' + size}>
        <img src={icon} alt="" />
      </div>
    </div>
  );
};

export default Presentational;
