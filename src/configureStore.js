import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

export const middlewares = [ReduxThunk];

export default createStore(rootReducer, {}, applyMiddleware(...middlewares));

// const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
//
// export default createStoreWithMiddleware(rootReducer);