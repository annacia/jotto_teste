import React from 'react';
import PropTypes from 'prop-types';
import Input from "./Input";

const ManualSecretWord = ({setSecretWord, setManualSecretWord}) => {
    const [manualWord, setManualWord] = React.useState('');
    return(
        <div data-test="component-manual-secret-word">
            <form className="form-inline">
                <button
                    data-test="button-random-secret-word"
                    onClick={(evt) => {
                        evt.preventDefault();
                        setManualSecretWord(false);
                    }}
                    className="btn btn-primary mb-2"
                >
                    Random Secret Word
                </button>
            </form>
            <form className="form-inline">
                <input
                    data-test="input-secret-word"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder="Manual Secret Word"
                    value={manualWord}
                    onChange={(event) => setManualWord(event.target.value)}
                />
                <button
                    data-test="button-manual-secret-word"
                    onClick={(evt) => {
                        evt.preventDefault();
                        setSecretWord(manualWord);
                        setManualSecretWord(true);
                    }}
                    className="btn btn-primary mb-2"
                >
                    Input New Secret Word
                </button>
            </form>
        </div>
    )
}

ManualSecretWord.propTypes = {
    setSecretWord: PropTypes.func.isRequired,
    setManualSecretWord: PropTypes.func.isRequired,
};

export default ManualSecretWord;