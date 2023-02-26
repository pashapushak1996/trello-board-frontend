import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Board } from './components/board/Board.jsx';
import { Header } from './components/header/index.js';
import { CustomModal } from './components/modal/index.js';
import {
    createCard, createList, deleteCard, deleteList, fetchLists, getLists
} from './features/listSlice.js';

function App() {
    const dispatch = useDispatch();
    const lists = useSelector(getLists);

    const [newTask, setNewTask] = useState({
        title: '',
        listId: null
    });

    const [newListTitle, setNewListTitle] = useState('');

    const onListTitleChange = (e) => {
        const { value } = e.target;

        setNewListTitle(value);
    };

    const onClickAddList = () => {
        dispatch(createList(newListTitle));

        setNewListTitle('');
    };

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchLists());
    }, [dispatch]);

    const toggleModalVisibility = () => {
        setShowModal((prevState) => !prevState);
    };

    const onClickAddCard = (listId) => {
        toggleModalVisibility();

        setNewTask({ ...newTask, listId });
    };

    const onClickDeleteCard = (cardId, listId) => {
        dispatch(deleteCard(cardId, listId));
    };

    const onTaskTitleChange = (e) => {
        const { value } = e.target;

        setNewTask({ ...newTask, title: value });
    };

    const onClickCreate = () => {
        toggleModalVisibility();

        dispatch(createCard(newTask));

        setNewTask({ title: '', listId: null });
    };

    const onClickDeleteList = (listId) => {
        dispatch(deleteList(listId));
    };

    return <div className={ 'app' }>
        <Header
            onChangeListValue={ onListTitleChange }
            listValue={ newListTitle }
            onClickAddList={ onClickAddList }/>
        <CustomModal
            showModal={ showModal }
            handleShow={ toggleModalVisibility }
            onClickCreate={ onClickCreate }
            title={ 'What is the task?' }>
            <input type="text" value={ newTask.title } onChange={ onTaskTitleChange }/>
        </CustomModal>
        <Board
            onClickAddCard={ onClickAddCard }
            onClickDeleteCard={ onClickDeleteCard }
            onClickDeleteList={ onClickDeleteList }
            lists={ lists }/>
    </div>;
}

export default App;
