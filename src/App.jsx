import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Board } from './components/board/Board.jsx';
import { Header } from './components/header/index.js';
import { CustomModal } from './components/modal/index.js';

import {
    createCard,
    createList,
    deleteCard,
    deleteList,
    fetchLists
} from './features/listSlice';

function App() {
    const dispatch = useDispatch();

    const [newCard, setNewCard] = useState({
        title: '',
        listId: null
    });

    const [newListTitle, setNewListTitle] = useState('');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchLists());
    }, [dispatch]);

    const onClickAddList = () => {
        const listTitle = newListTitle.trim();

        if (listTitle) {
            dispatch(createList(listTitle));
        }

        setNewListTitle('');
    };

    const onListTitleChange = (e) => {
        const { value } = e.target;

        setNewListTitle(value);
    };

    const toggleModalVisibility = () => {
        setShowModal((prevState) => !prevState);
    };

    const onClickAddCard = (listId) => {
        toggleModalVisibility();

        setNewCard({ ...newCard, listId });
    };

    const onClickDeleteCard = (cardId, listId) => {
        dispatch(deleteCard(cardId, listId));
    };

    const onCardTitleChange = (e) => {
        const { value } = e.target;

        setNewCard({ ...newCard, title: value });
    };

    const onClickCreate = () => {
        toggleModalVisibility();

        const cardTitle = newCard.title.trim();

        if (cardTitle) {
            dispatch(createCard(newCard));
        }

        setNewCard({ title: '', listId: null });
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
            <input
                type="text"
                className={'d-flex p-1 w-100 rounded-3 border-secondary border-opacity-50'}
                value={ newCard.title }
                onChange={ onCardTitleChange }/>
        </CustomModal>
        <Board
            onClickAddCard={ onClickAddCard }
            onClickDeleteCard={ onClickDeleteCard }
            onClickDeleteList={ onClickDeleteList }/>
    </div>;
}

export default App;
