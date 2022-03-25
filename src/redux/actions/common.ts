import { CommonActionType } from '../action-types/common';

export interface StartBlockUI {
  type: CommonActionType.START_BLOCK_UI;
}

export interface EndBlockUI {
  type: CommonActionType.END_BLOCK_UI;
}

export interface ResetBlockUI {
  type: CommonActionType.RESET_BLOCK_UI;
}

export type CommonAction =
  StartBlockUI
  | EndBlockUI
  | ResetBlockUI
