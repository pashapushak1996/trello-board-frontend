import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeCardPosition, getLists, getLoading } from '../../features/listSlice';

import { List } from '../list/index.js';

import './Board.scss';
import { Loader } from '../loader/index.js';

export const Board = ({
    onClickAddCard,
    onClickDeleteCard,
    onClickDeleteList
}) => {
    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const lists = useSelector(getLists);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        // It's ID of list from where you pull card
        const listIdStart = source.droppableId;

        // It's ID of list where you push card
        const listIdEnd = destination.droppableId;

        // It's position index from where you pull card
        const listCardIndexStart = source.index;

        // It's position index where you push card
        const listCardIndexEnd = destination.index;

        dispatch(changeCardPosition({
            listIdStart,
            listCardIndexStart,
            listIdEnd,
            listCardIndexEnd
        }));
    };

    const listsToRender = lists.map((list) => {
        const { _id: listId } = list;

        const handleOnClickDeleteList = () => {
            onClickDeleteList(listId);
        };

        const handleOnClickAddCard = () => {
            onClickAddCard(listId);
        };

        return (
            <Col key={ list._id } className="mb-4" xs={ 6 } sm={ 6 } md={ 4 } lg={ 3 }>
                <List
                    onClickDeleteCard={ onClickDeleteCard }
                    onClickAddCard={ handleOnClickAddCard }
                    onClickDeleteList={ handleOnClickDeleteList }
                    title={ list.title }
                    cards={ list.cards }
                    listId={ list._id }/>
            </Col>
        );
    });

    return (
        <div className="board">
            { loading
                ? <Loader/>
                : <DragDropContext onDragEnd={ onDragEnd }>
                    <Row>
                        { listsToRender }
                    </Row>
                </DragDropContext> }
        </div>);
};
