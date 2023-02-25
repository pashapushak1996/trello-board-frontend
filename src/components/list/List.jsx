import React from 'react';

import './List.scss';
import { ListCard } from '../listCard/index.js';

export const List = ({
    title,
    cards,
    onClick,
    children
}) => {
    const cardsToRender = cards.map((card) => <ListCard title={ card.title } updatedAt={ card.updatedAt }/>);

    return (
        <div className="list">
            <div className="list__header">
                <h2 className="list__title">{ title }</h2>
                <button className="list__button">
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <div className="list__items">
                { cardsToRender }
            </div>
        </div>
    );
};
