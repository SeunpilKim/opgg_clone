import commonReducer from './commonReducers';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  common: commonReducer
});

const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
