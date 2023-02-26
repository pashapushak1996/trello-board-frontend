import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const DraggableComponent = ({
    draggableId,
    index,
    children
}) => {
    return (
        <Draggable
            key={ draggableId + index }
            draggableId={ draggableId }
            index={ index }>
            { (provided) => (
                <div
                    ref={ provided.innerRef }
                    { ...provided.dragHandleProps }
                    { ...provided.draggableProps }>
                    { children }
                    { provided.placeholder }
                </div>
            ) }
        </Draggable>
    );
};
