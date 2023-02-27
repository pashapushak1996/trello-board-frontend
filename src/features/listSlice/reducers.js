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

export const extraReducers = (builder) => {
    /* Fetch list  */

    builder.addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(...action.payload);
    },);

    builder.addCase(fetchLists.pending, setLoadingTrue);

    /* Create list  */

    builder.addCase(createList.fulfilled, (state, action) => {
        state.loading = false;

        state.lists.push(action.payload);
    });

    builder.addCase(createList.pending, setLoadingTrue);

    /* Delete list  */

    builder.addCase(deleteList.fulfilled, (state, action) => {
        state.loading = false;

        const listId = action.payload;

        state.lists = state.lists.filter((list) => list._id !== listId);
    });
    builder.addCase(deleteList.pending, setLoadingTrue);

    /* Create card  */

    builder.addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;

        const card = action.payload;

        const list = state.lists.find((item) => item._id === card.listId);

        list.cards.push(card);
    },);

    builder.addCase(createCard.pending, setLoadingTrue);

    /* Delete card  */

    builder.addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;

        const { cardId, listId } = action.payload;

        const list = state.lists.find((item) => item._id === listId);

        list.cards = list.cards.filter((card) => card._id !== cardId);
    });

    builder.addCase(deleteCard.pending, setLoadingTrue);
};
