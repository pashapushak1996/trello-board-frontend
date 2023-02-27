import {
    createCard,
    createList,
    deleteCard,
    deleteList,
    fetchLists
} from './thunks';

export const changeCardPositionReducer = (state, action) => {
    const {
        // It's ID of list from where you pull card
        listIdStart,

        // It's ID of list where you push card
        listIdEnd,

        // It's position index from where you pull card
        listCardIndexStart,

        // It's position index where you push card
        listCardIndexEnd
    } = action.payload;

    // If list the same
    if (listIdStart === listIdEnd) {
        const list = state.lists.find((item) => item._id === listIdStart);

        const card = list.cards.splice(listCardIndexStart, 1);

        list.cards.splice(listCardIndexEnd, 0, ...card);

        return;
    }

    // If list is another
    const listStart = state.lists.find((item) => item._id === listIdStart);

    const card = listStart.cards.splice(listCardIndexStart, 1);

    const listEnd = state.lists.find((item) => item._id === listIdEnd);

    listEnd.cards.splice(listCardIndexEnd, 0, ...card);
};

const setLoadingTrue = (state) => {
    state.loading = true;
};

export const extraReducers = {
    /* Fetch list reducer */

    [fetchLists.fulfilled]: (state, action) => {
        state.loading = false;
        state.lists.push(...action.payload);
    },

    [fetchLists.pending]: setLoadingTrue,

    /* Create list reducer */

    [createList.fulfilled]: (state, action) => {
        state.loading = false;

        state.lists.push(action.payload);
    },

    [createList.pending]: setLoadingTrue,

    /* Delete list reducer */

    [deleteList.fulfilled]: (state, action) => {
        state.loading = false;

        const listId = action.payload;

        state.lists = state.lists.filter((list) => list._id !== listId);
    },

    [deleteList.pending]: setLoadingTrue,

    /* Create card reducer */

    [createCard.fulfilled]: (state, action) => {
        state.loading = false;

        const card = action.payload;

        const list = state.lists.find((item) => item._id === card.listId);

        list.cards.push(card);
    },

    [createCard.pending]: setLoadingTrue,

    /* Delete card reducer */

    [deleteCard.fulfilled]: (state, action) => {
        state.loading = false;

        const { cardId, listId } = action.payload;

        const list = state.lists.find((item) => item._id === listId);

        list.cards = list.cards.filter((card) => card._id !== cardId);
    },

    [deleteCard.pending]: setLoadingTrue
};
