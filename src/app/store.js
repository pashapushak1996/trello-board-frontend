import { configureStore } from '@reduxjs/toolkit';

import listReducer from '../features/listSlice/listSlice';

export const store = configureStore({
    reducer: { lists: listReducer }
});
