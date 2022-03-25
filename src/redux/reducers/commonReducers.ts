import {CommonActionType} from '../action-types/common';
import {
  CommonAction,
} from '../actions/common';
import produce from 'immer';

interface CommonState {
  blockUI: number;
}

const initialState: CommonState = {
  blockUI: 0,
};

const reducer = (state: CommonState = initialState, action: CommonAction) => {
  switch (action.type) {
    case CommonActionType.START_BLOCK_UI:
      return produce(state, (draft) => {
        draft.blockUI = state.blockUI + 1;
      });
    case CommonActionType.END_BLOCK_UI:
      return produce(state, (draft) => {
        draft.blockUI = state.blockUI - 1 < 0 ? 0 : state.blockUI - 1;
      });
    case CommonActionType.RESET_BLOCK_UI:
      return produce(state, (draft) => {
        draft.blockUI = 0;
      });
    default:
      return state;
  }
};

export default reducer;
