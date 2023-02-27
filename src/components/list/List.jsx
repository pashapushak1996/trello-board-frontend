import React, { useState } from 'react';

import { sortByUpdatedAsc, sortByUpdatedDesc } from '../../helpers';
import { DraggableComponent } from '../draggable';
import { DroppableComponent } from '../droppable';
import { ListCard } from '../listCard/index.js';

import './List.scss';

export const List = ({
    title,
    cards,
    listId,
    onClickAddCard,
    onClickDeleteCard,
    onClickDeleteList,
}) => {
    const [orderBy, setOrderBy] = useState(null);

    const onClickSortCards = () => {
        setOrderBy((prevOrderBy) => (prevOrderBy === 'desc' ? 'asc' : 'desc'));
    };

    const sortedListCards = [...cards].sort(
        orderBy === 'asc'
            ? sortByUpdatedAsc
            : sortByUpdatedDesc
    );

    const listCards = orderBy !== null
        ? sortedListCards
        : cards;

    const cardsToRender = listCards.map((card, index) => {
        const handleOnClickCardDelete = () => {
            onClickDeleteCard({ cardId: card._id, listId: card.listId });
        };

        return (
            <DraggableComponent
                draggableId={ card._id }
                index={ index }
                key={ card._id + index }>
                <ListCard
                    onClickDelete={ handleOnClickCardDelete }
                    title={ card.title }
                    updatedAt={ card.updatedAt }/>
            </DraggableComponent>
        );
    });

    return (
        <div className="list">
            <div className="list__header">
                <h2 className="list__title">{ title }</h2>
                <button className="list__button" onClick={ onClickSortCards }>Sort</button>
                <button className="list__button" onClick={ onClickDeleteList }>
                    Delete list
                </button>
            </div>
            <div className="list__items">
                <DroppableComponent droppableId={ listId }>
                    { cardsToRender }
                </DroppableComponent>
                <button
                    className="list__button list__button--add"
                    onClick={ onClickAddCard }>
                    ADD
                </button>
            </div>
        </div>
    );
};
