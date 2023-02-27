import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardApi, listApi } from '../../api/index.js';

/* List thunks */

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',
    async () => {
        const lists = await listApi.getAllLists();

        return lists;
    }
);

export const createList = createAsyncThunk(
    'lists/createList',
    async (listTitle) => {
        const createdList = await listApi.createList(listTitle);

        return createdList;
    }
);

export const deleteList = createAsyncThunk(
    'lists/deleteList',
    async (listId) => {
        await listApi.deleteList(listId);

        return listId;
    }
);

export const updateList = createAsyncThunk(
    'lists/updateList',
    async ({ listId, listTitle }) => {
        const updatedList = await listApi.updateList(listId, listTitle);

        return updatedList;
    }
);

/* Card thunks */

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
