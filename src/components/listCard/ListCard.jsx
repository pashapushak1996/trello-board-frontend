import React from 'react';
import moment from 'moment';

import './ListCard.scss';

export const ListCard = ({
    title,
    updatedAt,
    onClickDelete
}) => {
    const date = moment()
        .startOf('minute')
        .from(updatedAt, true);

    return (
        <div className="list-card">
            <h3 className="list-card__title">{ title }</h3>
            <span className="list-card__date">
                { date } ago
            </span>
            <button className="list-card__button" onClick={ onClickDelete }>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};
