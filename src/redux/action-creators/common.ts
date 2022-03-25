import { CommonActionType } from '../action-types/common';

export const startBlockUI = () => {
  return {
    type: CommonActionType.START_BLOCK_UI,
  };
};

export const endBlockUI = () => {
  return {
    type: CommonActionType.END_BLOCK_UI,
  };
};

export const resetBlockUI = () => {
  return {
    type: CommonActionType.RESET_BLOCK_UI,
  };
};