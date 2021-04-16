import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './App.css';

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import {getSecretWord} from "./actions";

function App() {
    const success = useSelector((state) => state.success);
    const guessedWords = useSelector((state) => state.guessedWords);
    const secretWord = useSelector((state) => state.secretWord);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSecretWord());
    }, []);

    return (
        <div data-test="component-app" className="container">
            <h1>Jotto</h1>
            <Congrats success={success} />
            <Input secretWord={secretWord} success={success}/>
            <GuessedWords guessedWords={guessedWords} />
        </div>
    );
}

export default App;
