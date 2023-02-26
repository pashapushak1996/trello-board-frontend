import React from 'react';

import './Header.scss';

export const Header = ({
    listValue,
    onChangeListValue,
    onClickAddList
}) => {
    return (
        <div className="header">
            <h1>Kanban board</h1>
            <div>
                <button onClick={ onClickAddList }>
                    <i className="fas fa-plus"></i>
                </button>
                <input type="text"
                    className="header__input"
                    value={ listValue }
                    onChange={ onChangeListValue }/>
            </div>
        </div>
    );
};
