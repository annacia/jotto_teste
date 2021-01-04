import { correctGuess, actionTypes } from "./index";

describe('correctGuess', () => {
    test('returns an action with type `CORRECT_GUESS`', () => {
        const action = correctGuess();
        //expect(action).toBe({});
        //toBe can ONLY be used for IMMUTABLE objects like numbers and strings
        expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
    })
})