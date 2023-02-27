import React, { useState } from 'react';

export const EditableText = ({ onBlur, as = 'p', initialValue = '' }) => {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    const Text = as;

    const handleClick = () => {
        setIsEditing(true);
    };

    function handleBlur() {
        setIsEditing(false);

        onBlur(value);
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        isEditing
            ? <input type="text" value={ value } onChange={ handleChange } onBlur={ handleBlur }/>
            : <Text onClick={ handleClick }>{ value }</Text>
    );
};
