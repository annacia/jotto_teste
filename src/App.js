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


const reducer = (state, action) => {
    switch (action.type) {
        case 'setSecretWord':
            return {...state, secretWord: action.payload}
        case 'setLanguage':
            return {...state, language: action.payload}
        case "setGiveUp":
            return { ...state, giveUp: action.payload }
        default:
            throw new Error('Invalid action type: '+ action.type);
    }
}

function App() {
    const [state, dispatch] = React.useReducer(
        reducer,
        {secretWord: 'party', language: 'en', giveUp: false}
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

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, [])

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

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
        <languageContext.Provider value={state.language}>
            <LanguagePicker setLanguage={setLanguage} />
            <guessedWordsContext.GuessedWordsProvider>
                <successContext.SuccessProvider>
                    {state.giveUp && <p data-test="text-secret-word">The secret word was: {state.secretWord}</p>}
                    {!state.giveUp && <Congrats/>}
                    <GiveUpButton setGiveUp={setGiveUp} giveUp={state.giveUp}/>
                    <Input secretWord={state.secretWord} setGiveUp={setGiveUp}/>
                </successContext.SuccessProvider>
                <GuessedWords/>
            </guessedWordsContext.GuessedWordsProvider>
        </languageContext.Provider>
    </div>
  );
}

export default App;
