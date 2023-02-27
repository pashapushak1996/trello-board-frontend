import {
    createCard,
    createList,
    deleteCard,
    deleteList,
    fetchLists
} from './thunks';

export const changeCardPositionReducer = (state, action) => {
    const {
        listIdStart,
        listCardIndexStart,
        listIdEnd,
        listCardIndexEnd
    } = action.payload;

    if (listIdStart === listIdEnd) {
        const list = state.lists.find((item) => item._id === listIdStart);

        const card = list.cards.splice(listCardIndexStart, 1);

        list.cards.splice(listCardIndexEnd, 0, ...card);

        return;
    }

    const listStart = state.lists.find((item) => item._id === listIdStart);

    const card = listStart.cards.splice(listCardIndexStart, 1);

    const listEnd = state.lists.find((item) => item._id === listIdEnd);

    listEnd.cards.splice(listCardIndexEnd, 0, ...card);
};

export const extraReducers = {
    /* Fetch list reducer */

    [fetchLists.fulfilled]: (state, action) => {
        state.loading = false;
        state.lists.push(...action.payload);
    },
    [fetchLists.pending]: (state) => {
        state.loading = true;
    },

    /* Create list reducer */

    [createList.fulfilled]: (state, action) => {
        state.loading = false;

        state.lists.push(action.payload);
    },

    [createList.pending]: (state) => {
        state.loading = true;
    },

    /* Delete list reducer */

    [deleteList.fulfilled]: (state, action) => {
        state.loading = false;

        const listId = action.payload;

        state.lists = state.lists.filter((list) => list._id !== listId);
    },
    [deleteList.pending]: (state) => {
        state.loading = true;
    },

    /* Create card reducer */

    [createCard.fulfilled]: (state, action) => {
        state.loading = false;

        const card = action.payload;

        const list = state.lists.find((item) => item._id === card.listId);

        list.cards.push(card);
    },

    /* Delete card reducer */

    [deleteCard.fulfilled]: (state, action) => {
        state.loading = false;

        const { cardId, listId } = action.payload;

        const list = state.lists.find((item) => item._id === listId);

        list.cards = list.cards.filter((card) => card._id !== cardId);
    },
    [deleteCard.pending]: (state) => {
        state.loading = true;
    }
};
