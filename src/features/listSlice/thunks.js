import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardApi, listApi } from '../../api/index.js';

/* List thunks */

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',
    async (thunkAPI) => {
        try {
            const lists = await listApi.getAllLists();

            return lists;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
);

export const createList = createAsyncThunk(
    'lists/createList',
    async (listTitle, thunkAPI) => {
        try {
            const createdList = await listApi.createList(listTitle);

            return createdList;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
);

export const deleteList = createAsyncThunk(
    'lists/deleteList',
    async (listId, thunkAPI) => {
        try {
            await listApi.deleteList(listId);

            return listId;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
);

export const updateList = createAsyncThunk(
    'lists/updateList',
    async ({ listId, listTitle }, thunkAPI) => {
        try {
            const updatedList = await listApi.updateList(listId, listTitle);

            return updatedList;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
);

/* Card thunks */

export const createCard = createAsyncThunk(
    'lists/createCard',
    async (newTask, thunkAPI) => {
        try {
            const card = await cardApi.createCard(newTask.title, newTask.listId);

            return card;
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
);

export const deleteCard = createAsyncThunk(
    'lists/deleteCard',
    async ({ cardId, listId }, thunkAPI) => {
        try {
            await cardApi.deleteCard(cardId);

            return { cardId, listId };
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
);
