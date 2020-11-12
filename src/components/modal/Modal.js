import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Styles.scss';

const Modal = (props) => {

    const handleClick = (e) => {
        let target = e.target;
        if(target.closest('svg')) {
            return props.setShowModal(false);
        } else if(target.closest('.modal--modalContent')) {
            return null
        } else {
            return props.setShowModal(false);
        }
    }

    return (
        <div className="modal" onClick={ handleClick }>
            <div className="modal--modalContent">
                <h3 className="modal--modalContent--title">Rules</h3>
                <p className="modal--modalContent--message">{ props.modalMessage }</p>
                <FontAwesomeIcon className="modal--modalContent--caret" icon={faCaretUp} />
                <FontAwesomeIcon className="modal--modalContent--closeModal" icon={faTimes} />
            </div>
        </div>
    ) 
}

export default Modal;