import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { List } from '../list/index.js';

import './Board.scss';

export const Board = ({ lists }) => {
    const listsToRender = lists.map((list) => {
        return <Col key={ list._id } xs={ 6 } sm={ 6 } md={ 4 } lg={ 3 } className="mb-4">
            <List title={ list.title } cards={ list.cards }/>
        </Col>;
    });

    return (
        <div className="board">
            <Row>
                { listsToRender }
            </Row>
        </div>);
};
