import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../rootReducer/rootReducer';
import userSaga from '../reduxSaga/userSaga';
import createSagaMiddleware from 'redux-saga';

// const store = createStore(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store  = configureStore({
    reducer:rootReducer,
    middleware:()=>[sagaMiddleware]
});

sagaMiddleware.run(userSaga);

export default store;