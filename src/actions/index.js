import axios from 'axios';
import { getLetterMatchCount } from '../helpers';

export const actionTypes = {
    CORRECT_GUESS: 'CORRECT_GUESS',
    GUESS_WORD: 'GUESS_WORD',
    SET_SECRET_WORD: 'SET_SECRET_WORD'
};

export const guessWord = (guessedWord) => {
    return function(dispatch, getState) {
        const secretWord = getState().secretWord;
        const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

        dispatch({
            type: actionTypes.GUESS_WORD,
            payload: {guessedWord, letterMatchCount}
        });

        if (guessedWord === secretWord) {
            dispatch({ type: actionTypes.CORRECT_GUESS});
        }
    };
};

export function correctGuess() {
    return { type: actionTypes.CORRECT_GUESS};
}

//Tests removed
// import { correctGuess, actionTypes } from "./index";
//
// describe('correctGuess', () => {
//     test('returns an action with type `CORRECT_GUESS`', () => {
//         const action = correctGuess();
//         //expect(action).toBe({});
//         //toBe can ONLY be used for IMMUTABLE objects like numbers and strings
//         expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
//     })
// })

export const getSecretWord = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3030')
            .then(response => {
                dispatch({
                    type: actionTypes.SET_SECRET_WORD,
                    payload: response.data
                })
            })
    }
}