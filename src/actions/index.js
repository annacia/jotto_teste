export const actionTypes = {
    CORRECT_GUESS: 'CORRECT_GUESS',
    GUESS_WORD: 'GUESS_WORD'
};

export const guessWord = (guessedWord) => {
    return function(dispatch, getState) {

    };
};

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