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
        listCardIndexEnd,
    } = action.payload;

    if (listIdStart === listIdEnd) {
        const list = state.lists.find((item) => item._id === listIdStart);

        const card = list.cards.splice(listCardIndexStart, 1);

        list.cards.splice(listCardIndexEnd, 0, ...card);
    }

    const listStart = state.lists.find((item) => item._id === listIdStart);

    const card = listStart.cards.splice(listCardIndexStart, 1);

    const listEnd = state.lists.find((item) => item._id === listIdEnd);

    listEnd.cards.splice(listCardIndexEnd, 0, ...card);
};

export const extraReducers = (builder) => {
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
        deleteList.fulfilled,
        (state, action) => {
            state.loading = false;

            const listId = action.payload;

            state.lists = state.lists.filter((list) => list._id !== listId);
        }
    );

    builder.addCase(
        deleteList.pending,
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
        deleteCard.fulfilled,
        (state, action) => {
            state.loading = false;

            const { cardId, listId } = action.payload;

            const list = state.lists.find((item) => item._id === listId);

            list.cards = list.cards.filter((card) => card._id !== cardId);
        }
    );

    builder.addCase(
        deleteCard.pending,
        (state) => {
            state.loading = true;
        }
    );
};
