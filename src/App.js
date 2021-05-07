import React, { useEffect } from 'react';
import './App.css';
import hookActions from './actions/hookActions';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions/hookActions';
import LanguagePicker from './LanguagePicker';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import GiveUpButton from "./GiveUpButton";
import ManualSecretWord from "./ManualSecretWord";


const reducer = (state, action) => {
    switch (action.type) {
        case 'setSecretWord':
            return {...state, secretWord: action.payload}
        case 'setLanguage':
            return {...state, language: action.payload}
        case "setGiveUp":
            return { ...state, giveUp: action.payload }
        case "setManualSecretWord":
            return { ...state, manualSecretWord: action.payload }
        case "setServerError":
            return { ...state, serverError: action.payload }
        default:
            throw new Error('Invalid action type: '+ action.type);
    }
}

function App() {
    const [state, dispatch] = React.useReducer(
        reducer,
        {
            secretWord: '',
            language: 'en',
            giveUp: false,
            manualSecretWord: true,
            serverError: false
        }
    );

    // TODO: get props from shared state
    // const success = false;
    // const guessedWords = [];

    const setSecretWord = (secretWord) => {
      dispatch({type: 'setSecretWord', payload: secretWord});
    }

    const setLanguage = (language) => {
      dispatch({type: 'setLanguage', payload: language })
    }

    const setGiveUp = (giveUp) => {
      dispatch({type: 'setGiveUp', payload: giveUp })
    }

    const setManualSecretWord = (manualSecretWord) => {
        dispatch({type: 'setManualSecretWord', payload: manualSecretWord })
    }

    const setServerError = (serverError) => {
        dispatch({type: 'setServerError', payload: serverError })
    }

    useEffect(() => {
        if(!state.manualSecretWord) {
            getSecretWord(setSecretWord, setServerError);
        }
    }, [state.manualSecretWord])

    if (state.secretWord === null) {
        return (
            <div className="container" data-test="spinner">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Loading secret word...</p>
            </div>
        )
    }

    const Game = () => {
        if (state.manualSecretWord && !state.secretWord) {
            return(
                <ManualSecretWord
                    setSecretWord={setSecretWord}
                    setManualSecretWord={setManualSecretWord}
                />
            );
        }

        return (
            <>
            {state.giveUp && <p data-test="text-secret-word">The secret word was: {state.secretWord}</p>}
            {!state.giveUp && <Congrats/>}
            <GiveUpButton setGiveUp={setGiveUp} giveUp={state.giveUp}/>
            <Input
                secretWord={state.secretWord}
                setGiveUp={setGiveUp}
                setSecretWord={setSecretWord}
                setManualSecretWord={setManualSecretWord}
            />
            </>
        );
    }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
        <languageContext.Provider value={state.language}>
            <LanguagePicker setLanguage={setLanguage} />
            <guessedWordsContext.GuessedWordsProvider>
                <successContext.SuccessProvider>
                    <Game/>
                </successContext.SuccessProvider>
                <GuessedWords/>
            </guessedWordsContext.GuessedWordsProvider>
        </languageContext.Provider>
    </div>
  );
}

export default App;
