import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

export const store = createStore(reducers);

export default { store  };
