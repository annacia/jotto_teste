import React, {useState} from 'react';
import successContext from "./contexts/successContext";
import PropTypes from 'prop-types';

const GiveUpButton = ({setGiveUp, giveUp}) => {
    const [success, setSuccess] = successContext.useSuccess();

    if (success && giveUp) {
        return(
            <div data-test="component-giveup-button">
                <p data-test="luck-text">
                    Better luck next time
                </p>
            </div>
        );
    }

    if (success && !giveUp) {
        return(
            <div data-test="component-giveup-button"/>
        );
    }

    return(
        <div data-test="component-giveup-button">
            <button
                data-test="giveup-btn"
                onClick={() => {
                    setSuccess(true);
                    setGiveUp(true);
                }}
            >
                Give Up
            </button>
        </div>
    );
};

GiveUpButton.propTypes = {
    setGiveUp: PropTypes.func.isRequired,
    giveUp: PropTypes.bool.isRequired
}

export default GiveUpButton;