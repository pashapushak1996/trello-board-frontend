import { createSlice } from '@reduxjs/toolkit';

import { changeCardPositionReducer, extraReducers } from './reducers';

const initialState = {
    lists: [],
    loading: false
};

const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        changeCardPosition: changeCardPositionReducer
    },
    extraReducers
});

export const { changeCardPosition } = listSlice.actions;

export default listSlice.reducer;
