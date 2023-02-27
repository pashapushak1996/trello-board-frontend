import React from 'react';

import './Header.scss';

export const Header = ({
    listValue,
    onChangeListValue,
    onClickAddList
}) => {
    return (
        <div className="header">
            <h1 className="header__title">Kanban board</h1>
            <div className="header__controls">
                <button className="btn btn-info" onClick={ onClickAddList }>
                    <i className="fas fa-plus"></i>
                </button>
                <input type="text"
                       className="rounded-2 border-0 p-2"
                       value={ listValue }
                       onChange={ onChangeListValue }/>
            </div>
        </div>
    );
};
