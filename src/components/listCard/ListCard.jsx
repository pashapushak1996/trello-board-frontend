import React from 'react';
import moment from 'moment';

import './ListCard.scss';

export const ListCard = ({
    title,
    updatedAt
}) => {
    const date = moment()
        .startOf('hour')
        .from(updatedAt);

    return (
        <div className="list-card">
            <h3 className="list-card__title">{ title }</h3>
            <span className="list-card__date">
                { date }
            </span>
        </div>
    );
};
