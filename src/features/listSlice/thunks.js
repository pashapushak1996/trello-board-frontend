import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardApi, listApi } from '../../api/index.js';

/* List thunks */

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',
    async () => {
        try {
            const lists = await listApi.getAllLists();

            return lists;
        } catch (err) {
            console.log(err);
        }
    }
);

export const createList = createAsyncThunk(
    'lists/createList',
    async (listTitle) => {
        try {
            const createdList = await listApi.createList(listTitle);

            return createdList;
        } catch (err) {
            console.log(err);
        }
    }
);

export const deleteList = createAsyncThunk(
    'lists/deleteList',
    async (listId) => {
        try {
            await listApi.deleteList(listId);

            return listId;
        } catch (err) {
            console.log(err);
        }
    }
);

export const updateList = createAsyncThunk(
    'lists/updateList',
    async ({ listId, listTitle }) => {
        try {
            const updatedList = await listApi.updateList(listId, listTitle);

            return updatedList;
        } catch (err) {
            console.log(err);
        }
    }
);

/* Card thunks */

export const createCard = createAsyncThunk(
    'lists/createCard',
    async (newTask) => {
        try {
            const card = await cardApi.createCard(newTask.title, newTask.listId);

            return card;
        } catch (err) {
            console.log(err);
        }
    }
);

export const deleteCard = createAsyncThunk(
    'lists/deleteCard',
    async ({ cardId, listId }) => {
        try {
            await cardApi.deleteCard(cardId);

            return { cardId, listId };
        } catch (err) {
            console.log(err);
        }
    }
);
