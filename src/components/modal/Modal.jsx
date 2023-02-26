import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const CustomModal = ({
    title,
    showModal,
    handleShow,
    onClickCreate,
    children
}) => {
    return (
        <>
            <Modal show={ showModal } onHide={ handleShow }>
                <Modal.Header closeButton>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ children }</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleShow }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ onClickCreate }>
                        Create task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
