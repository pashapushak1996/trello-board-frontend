import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cardApi, listApi } from '../api/index.js';

const initialState = {
    lists: [],
    loading: false
};

export const createList = createAsyncThunk(
    'lists/createList',
    async (listTitle) => {
        const list = await listApi.createList(listTitle);

        return list;
    }
);

export const deleteList = createAsyncThunk(
    'lists/deleteList',
    async (listId) => {
        await listApi.deleteList(listId);

        return listId;
    }
);

export const createCard = createAsyncThunk(
    'lists/createCard',
    async (newTask) => {
        const card = await cardApi.createCard(newTask.title, newTask.listId);

        return card;
    }
);

export const deleteCard = createAsyncThunk(
    'lists/deleteCard',
    async ({ cardId, listId }) => {
        await cardApi.deleteCard(cardId);

        return { cardId, listId };
    }
);

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',
    async () => {
        const lists = await listApi.getAllLists();
        return lists;
    }
);

const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        changeCardPosition: (state, action) => {
            const {
                droppableIdStart,
                droppableIndexStart,
                droppableIdEnd,
                droppableIndexEnd,
            } = action.payload;

            if (droppableIdStart === droppableIdEnd) {
                const list = state.lists.find((item) => item._id === droppableIdStart);

                const card = list.cards.splice(droppableIndexStart, 1);

                list.cards.splice(droppableIndexEnd, 0, ...card);

                return;
            }

            const listStart = state.lists.find((item) => item._id === droppableIdStart);

            const card = listStart.cards.splice(droppableIndexStart, 1);

            const listEnd = state.lists.find((item) => item._id === droppableIdEnd);

            listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchLists.fulfilled,
            (state, action) => {
                state.loading = false;
                state.lists.push(...action.payload);
            }
        );

        builder.addCase(
            fetchLists.pending,
            (state) => {
                state.loading = true;
            }
        );

        builder.addCase(
            createList.fulfilled,
            (state, action) => {
                state.loading = false;
                state.lists.push(action.payload);
            }
        );

        builder.addCase(
            createList.pending,
            (state) => {
                state.loading = true;
            }
        );

        builder.addCase(
            createCard.pending,
            (state) => {
                state.loading = true;
            }
        );

        builder.addCase(
            createCard.fulfilled,
            (state, action) => {
                state.loading = false;

                const card = action.payload;

                const list = state.lists.find((item) => item._id === card.listId);

                list.cards.push(card);
            }
        );
        builder.addCase(
            deleteList.pending,
            (state) => {
                state.loading = true;
            }
        );

        builder.addCase(
            deleteList.fulfilled,
            (state, action) => {
                state.loading = false;

                const listId = action.payload;

                state.lists = state.lists.filter((list) => list._id !== listId);
            }
        );

        builder.addCase(
            deleteCard.pending,
            (state) => {
                state.loading = true;
            }
        );

        builder.addCase(
            deleteCard.fulfilled,
            (state, action) => {
                state.loading = false;

                const { cardId, listId } = action.payload;

                const list = state.lists.find((item) => item._id === listId);

                list.cards = list.cards.filter((card) => card._id !== cardId);
            }
        );
    }
});

// Selectors
export const getLists = (state) => state.lists.lists;
export const getLoading = (state) => state.lists.loading;

export const { changeCardPosition } = listSlice.actions;

export default listSlice.reducer;
