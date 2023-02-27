import {
    createCard,
    createList, deleteCard, deleteList,
    fetchLists

} from './thunks';

export const changeCardPositionReducer = (state, action) => {
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
};
