import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeCardPosition, getLoading } from '../../features/listSlice.js';

import { List } from '../list/index.js';

import './Board.scss';
import { Loader } from '../loader/index.js';

export const Board = ({
    lists,
    onClickAddCard,
    onClickDeleteCard,
    onClickDeleteList
}) => {
    const dispatch = useDispatch();
    const loading = useSelector(getLoading);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        const droppableIdStart = source.droppableId;
        const droppableIdEnd = destination.droppableId;
        const droppableIndexStart = source.index;
        const droppableIndexEnd = destination.index;

        dispatch(changeCardPosition({
            droppableIdStart,
            droppableIndexStart,
            droppableIdEnd,
            droppableIndexEnd
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
            <Col
                key={ list._id }
                className="mb-4"
                xs={ 6 }
                sm={ 6 }
                md={ 4 }
                lg={ 3 }
            >
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
