import React, { useEffect } from 'react';
import { CommonIndicator } from '../../components/common-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { resetBlockUI } from '../../redux/action-creators/common';
import './CommonLoadingPanel.styl';

const LoadingPanelContainer = () => {
  const dispatch = useDispatch();
  const blockUI = useSelector((state: RootState) => state.common?.blockUI) || 0;

  const doResetBlockUI = () => {
    dispatch(resetBlockUI());
  };

  useEffect(() => {
    window.addEventListener('beforeunload', doResetBlockUI);
    return () => {
      window.removeEventListener('beforeunload', doResetBlockUI);
    };
  }, []);

  return blockUI > 0 ? (
    <div className={'common-loading-panel'}>
      <div>
        <CommonIndicator/>
      </div>
    </div>
  ) : null;
};

export default LoadingPanelContainer;
