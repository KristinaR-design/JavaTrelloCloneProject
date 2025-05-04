import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/boardReducer'
import columnReducer from './reducers/columnReducer';
import cardReducer from './reducers/cardReducer';

export const store = configureStore({
    reducer: {
        board: boardReducer,
        column: columnReducer,
        card: cardReducer,
    },
});

export default store;